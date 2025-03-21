const puppeteer = require('puppeteer');

describe('Phaser Game Tests', () => {
    let browser;
    let page;

    // テスト全体のタイムアウトを30秒に設定
    jest.setTimeout(30000);

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: "new"
        });
        page = await browser.newPage();
    });

    afterAll(async () => {
        await browser.close();
    });

    test('Server is running and Phaser game loads', async () => {
        try {
            // ページにアクセス
            await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });

            // Phaserのキャンバスが存在することを確認
            const canvas = await page.$('canvas');
            expect(canvas).not.toBeNull();

            // エラーがコンソールに出力されていないことを確認
            const logs = [];
            page.on('console', msg => {
                if (msg.type() === 'error') {
                    logs.push(msg.text());
                }
            });

            // 少し待ってエラーログを確認
            await new Promise(resolve => setTimeout(resolve, 1000));
            expect(logs.length).toBe(0);

            // Phaserのグローバルオブジェクトが存在することを確認
            const phaserExists = await page.evaluate(() => {
                return typeof Phaser !== 'undefined';
            });
            expect(phaserExists).toBe(true);

            // ゲームが実際に動作していることを確認（キャンバスのサイズをチェック）
            const canvasSize = await page.evaluate(() => {
                const canvas = document.querySelector('canvas');
                return {
                    width: canvas.width,
                    height: canvas.height
                };
            });
            expect(canvasSize.width).toBe(800);  // 設定した幅
            expect(canvasSize.height).toBe(600); // 設定した高さ
        } catch (error) {
            throw new Error(`Failed to connect to http://localhost:8080. Make sure the development server is running.\n${error}`);
        }
    });

    test('Tilemap is properly loaded and rendered', async () => {
        try {
            await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });

            // ゲームの初期化とシーンのロードを待つ
            await page.evaluate(() => {
                return new Promise((resolve, reject) => {
                    let attempts = 0;
                    const maxAttempts = 100; // 最大10秒間試行

                    const checkGameScene = () => {
                        attempts++;
                        try {
                            const game = window.game;
                            if (!game) {
                                console.log('Game not initialized yet');
                                if (attempts >= maxAttempts) {
                                    reject(new Error('Game not initialized'));
                                } else {
                                    setTimeout(checkGameScene, 100);
                                }
                                return;
                            }

                            const scene = game.scene.scenes.find(s => s.scene.key === 'GameScene');
                            if (!scene) {
                                console.log('GameScene not found');
                                if (attempts >= maxAttempts) {
                                    reject(new Error('GameScene not found'));
                                } else {
                                    setTimeout(checkGameScene, 100);
                                }
                                return;
                            }

                            // アセットのロードを待つ
                            const checkAssets = () => {
                                const hasTexture = (key) => {
                                    const exists = scene.textures.exists(key);
                                    console.log(`Checking texture ${key}: ${exists}`);
                                    return exists;
                                };
                                const hasTilemap = (key) => {
                                    const exists = scene.cache.tilemap.exists(key);
                                    console.log(`Checking tilemap ${key}: ${exists}`);
                                    return exists;
                                };

                                // アセットの存在を確認
                                const assets = {
                                    tiles: hasTexture('tiles'),
                                    player: hasTexture('player'),
                                    map: hasTilemap('map')
                                };

                                console.log('Asset status:', assets);

                                if (assets.tiles && assets.player && assets.map) {
                                    console.log('All assets loaded successfully');
                                    resolve();
                                } else {
                                    console.log('Some assets not loaded yet');
                                    if (attempts >= maxAttempts) {
                                        reject(new Error(`Assets not loaded: ${JSON.stringify(assets)}`));
                                    } else {
                                        setTimeout(checkGameScene, 100);
                                    }
                                }
                            };

                            // シーンの状態を確認
                            console.log('Scene state:', {
                                key: scene.scene.key,
                                active: scene.scene.isActive(),
                                visible: scene.scene.isVisible(),
                                assetsLoaded: scene.assetsLoaded
                            });

                            // アセットのロードを開始
                            if (scene.load.isLoading()) {
                                console.log('Assets are still loading');
                                scene.load.once('complete', () => {
                                    console.log('Load complete event fired');
                                    checkAssets();
                                });
                            } else {
                                console.log('Load queue is empty, checking assets');
                                checkAssets();
                            }

                        } catch (error) {
                            console.error('Error in checkGameScene:', error);
                            if (attempts >= maxAttempts) {
                                reject(new Error(`Scene check failed: ${error.message}`));
                            } else {
                                setTimeout(checkGameScene, 100);
                            }
                        }
                    };

                    checkGameScene();
                });
            });

            // シーンの初期化を待つ
            await new Promise(resolve => setTimeout(resolve, 2000));

            // アセットが正しく読み込まれていることを確認
            const assetsLoaded = await page.evaluate(() => {
                const game = window.game;
                const scene = game.scene.scenes.find(s => s.scene.key === 'GameScene');
                
                // デバッグ情報を収集
                const debug = {
                    sceneKey: scene.scene.key,
                    textureKeys: Object.keys(scene.textures.list),
                    tilemapKeys: Object.keys(scene.cache.tilemap.entries),
                    texturesCount: scene.textures.list.length,
                    tilemapsCount: scene.cache.tilemap.entries.length,
                    loadState: scene.load.state
                };
                console.log('Debug info:', debug);

                // アセットの存在を確認
                const checkAsset = (key, type) => {
                    try {
                        switch (type) {
                            case 'texture':
                                return scene.textures.list[key] !== undefined;
                            case 'tilemap':
                                return scene.cache.tilemap.entries[key] !== undefined;
                            default:
                                return false;
                        }
                    } catch (e) {
                        console.error(`Error checking asset ${key} of type ${type}:`, e);
                        return false;
                    }
                };

                return {
                    tilesLoaded: checkAsset('tiles', 'texture'),
                    mapLoaded: checkAsset('map', 'tilemap'),
                    playerLoaded: checkAsset('player', 'texture'),
                    debug: debug
                };
            });

            console.log('Assets loaded state:', assetsLoaded);

            // 各アセットの読み込み状態を確認
            if (!assetsLoaded.tilesLoaded) {
                throw new Error('Tileset image not loaded');
            }
            if (!assetsLoaded.mapLoaded) {
                throw new Error('Tilemap JSON not loaded');
            }
            if (!assetsLoaded.playerLoaded) {
                throw new Error('Player image not loaded');
            }

            // タイルマップのレイヤーが正しく作成されているか確認
            const layersCreated = await page.evaluate(() => {
                const game = window.game;
                const scene = game.scene.scenes[0];
                
                const layers = scene.children.list.filter(child => 
                    child instanceof Phaser.Tilemaps.TilemapLayer
                );

                return {
                    layerCount: layers.length,
                    groundLayerExists: layers.some(layer => layer.layer.name === 'Ground'),
                    objectsLayerExists: layers.some(layer => layer.layer.name === 'Objects')
                };
            });

            expect(layersCreated.layerCount).toBe(2); // Ground層とObjects層の2つ
            expect(layersCreated.groundLayerExists).toBe(true);
            expect(layersCreated.objectsLayerExists).toBe(true);

            // タイルマップの寸法が正しいか確認
            const mapDimensions = await page.evaluate(() => {
                const game = window.game;
                const scene = game.scene.scenes[0];
                const map = scene.children.list.find(child => 
                    child instanceof Phaser.Tilemaps.TilemapLayer
                ).tilemap;

                return {
                    width: map.width,
                    height: map.height,
                    tileWidth: map.tileWidth,
                    tileHeight: map.tileHeight
                };
            });

            expect(mapDimensions.width).toBe(10);
            expect(mapDimensions.height).toBe(10);
            expect(mapDimensions.tileWidth).toBe(32);
            expect(mapDimensions.tileHeight).toBe(32);

            // プレイヤーが正しく配置されているか確認
            const playerState = await page.evaluate(() => {
                const game = window.game;
                const scene = game.scene.scenes[0];
                const player = scene.children.list.find(child => 
                    child instanceof Phaser.GameObjects.Sprite && 
                    child.texture.key === 'player'
                );

                return {
                    exists: !!player,
                    x: player ? player.x : null,
                    y: player ? player.y : null,
                    visible: player ? player.visible : false,
                    hasPhysics: player ? !!player.body : false
                };
            });

            expect(playerState.exists).toBe(true);
            expect(playerState.x).toBe(100); // 初期位置x
            expect(playerState.y).toBe(100); // 初期位置y
            expect(playerState.visible).toBe(true);
            expect(playerState.hasPhysics).toBe(true);

        } catch (error) {
            throw new Error(`Tilemap test failed: ${error}`);
        }
    });

    test('Phaser is properly initialized and running', async () => {
        try {
            await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });

            // Phaserのゲームインスタンスが正しく初期化されているか確認
            const gameStatus = await page.evaluate(() => {
                if (typeof window.game === 'undefined') {
                    return { success: false, error: 'Game instance not found' };
                }

                const game = window.game;
                return {
                    success: true,
                    isRunning: game.isRunning,
                    width: game.config.width,
                    height: game.config.height,
                    renderer: game.config.type === Phaser.AUTO ? 'AUTO' : 
                             game.config.type === Phaser.CANVAS ? 'CANVAS' : 'WEBGL',
                    activeScenes: game.scene.scenes.map(scene => scene.scene.key)
                };
            });

            // 各種アサーション
            expect(gameStatus.success).toBe(true);
            expect(gameStatus.isRunning).toBe(true);
            expect(gameStatus.width).toBe(800);
            expect(gameStatus.height).toBe(600);
            expect(gameStatus.activeScenes).toContain('MapScene');

            // レンダリングコンテキストが存在することを確認
            const hasRenderingContext = await page.evaluate(() => {
                const canvas = document.querySelector('canvas');
                return !!(canvas.getContext('2d') || canvas.getContext('webgl') || canvas.getContext('webgl2'));
            });
            expect(hasRenderingContext).toBe(true);

            // フレームレートが正常か確認
            const fps = await page.evaluate(() => {
                return window.game.loop.actualFps;
            });
            expect(fps).toBeGreaterThan(0);

        } catch (error) {
            throw error;
        }
    });
}); 
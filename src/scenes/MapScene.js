import Phaser from 'phaser';

export default class MapScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MapScene' });
        this.assetsLoaded = false;
    }

    init() {
        console.log('MapScene init');
    }

    preload() {
        console.log('MapScene preload start');

        // アセットのベースURLを設定
        this.load.setBaseURL('');

        // ロードの進行状況をコンソールに出力
        this.load.on('progress', (value) => {
            console.log(`Loading progress: ${Math.round(value * 100)}%`);
        });

        this.load.on('filecomplete', (key, type, data) => {
            console.log(`File loaded: ${key} (${type})`);
            // ファイルが読み込まれたことを確認
            if (type === 'image') {
                console.log(`Texture exists (${key}):`, this.textures.exists(key));
            } else if (type === 'tilemapJSON') {
                console.log(`Tilemap exists (${key}):`, this.cache.tilemap.exists(key));
            }
        });

        this.load.on('loaderror', (file) => {
            console.error('Load error:', file.key, file.url);
        });

        this.load.on('complete', () => {
            console.log('All assets loaded');
            // 読み込まれたアセットを確認
            console.log('Loaded textures:', Array.from(this.textures.keys()));
            console.log('Loaded tilemaps:', Array.from(this.cache.tilemap.entries.keys()));
            this.assetsLoaded = true;
        });

        // タイルセットの画像を読み込み
        this.load.image({
            key: 'tiles',
            url: '/assets/tilesets/tileset.png',
            normalMap: false
        });

        // タイルマップのJSONを読み込み
        this.load.tilemapTiledJSON({
            key: 'map',
            url: '/assets/tilemaps/map.json'
        });

        // プレイヤーキャラクターの画像を読み込み
        this.load.image({
            key: 'player',
            url: '/assets/characters/player.png',
            normalMap: false
        });

        console.log('MapScene preload end');
    }

    create() {
        console.log('MapScene create start');

        if (!this.assetsLoaded) {
            console.error('Assets not loaded yet');
            return;
        }

        // アセットの存在を確認
        const assets = {
            tiles: this.textures.exists('tiles'),
            player: this.textures.exists('player'),
            map: this.cache.tilemap.exists('map')
        };
        console.log('Asset status:', assets);

        if (!assets.tiles) {
            console.error('Tileset texture not found');
            return;
        }
        if (!assets.player) {
            console.error('Player texture not found');
            return;
        }
        if (!assets.map) {
            console.error('Tilemap not found');
            return;
        }

        // タイルマップの作成
        const map = this.make.tilemap({ key: 'map' });
        
        // タイルセットの追加
        const tileset = map.addTilesetImage('tileset', 'tiles');
        
        // レイヤーの作成
        const groundLayer = map.createLayer('Ground', tileset, 0, 0);
        const objectLayer = map.createLayer('Objects', tileset, 0, 0);

        // プレイヤーの作成
        this.player = this.physics.add.sprite(100, 100, 'player');
        this.player.setCollideWorldBounds(true);

        // カメラの設定
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBackgroundColor('#87CEEB'); // 空色の背景

        // キーボード入力の設定
        this.cursors = this.input.keyboard.createCursorKeys();

        console.log('MapScene create end');
    }

    update() {
        if (!this.player) return;

        // プレイヤーの移動処理
        const speed = 160;

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-speed);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(speed);
        } else {
            this.player.setVelocityY(0);
        }
    }
} 
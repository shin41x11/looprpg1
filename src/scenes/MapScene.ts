import { WorldMap } from '../types/worldMap.js';
import { PlayerState } from '../types/player.js';

export class MapScene extends Phaser.Scene {
    private worldMap: WorldMap;
    private player: PlayerState;
    private playerSprite!: Phaser.GameObjects.Rectangle;
    private mapSprites: Phaser.GameObjects.Rectangle[][] = [];
    private tileSize: number = 32;

    constructor(worldMap: WorldMap, player: PlayerState) {
        super({ key: 'MapScene' });
        this.worldMap = worldMap;
        this.player = player;
    }

    create(): void {
        this.initializeMap();
        this.initializePlayer();
        this.setupInput();
    }

    update(): void {
        // 更新処理
    }

    private initializeMap(): void {
        for (let y = 0; y < this.worldMap.height; y++) {
            this.mapSprites[y] = [];
            for (let x = 0; x < this.worldMap.width; x++) {
                const tile = this.worldMap.tiles[y][x];
                const sprite = this.add.rectangle(
                    x * this.tileSize + this.tileSize / 2,
                    y * this.tileSize + this.tileSize / 2,
                    this.tileSize,
                    this.tileSize,
                    this.getTileColor(tile)
                ).setOrigin(0.5);
                this.mapSprites[y][x] = sprite as Phaser.GameObjects.Rectangle;
            }
        }
    }

    private initializePlayer(): void {
        this.playerSprite = this.add.rectangle(
            this.player.position.x * this.tileSize + this.tileSize / 2,
            this.player.position.y * this.tileSize + this.tileSize / 2,
            this.tileSize,
            this.tileSize,
            0xff0000
        );
    }

    private setupInput(): void {
        this.input.keyboard.on('keydown-W', () => this.movePlayer(0, -1));
        this.input.keyboard.on('keydown-S', () => this.movePlayer(0, 1));
        this.input.keyboard.on('keydown-A', () => this.movePlayer(-1, 0));
        this.input.keyboard.on('keydown-D', () => this.movePlayer(1, 0));
    }

    public movePlayer(dx: number, dy: number): void {
        const newX = this.player.position.x + dx;
        const newY = this.player.position.y + dy;

        if (newX < 0 || newX >= this.worldMap.width ||
            newY < 0 || newY >= this.worldMap.height) {
            return;
        }

        const targetTile = this.worldMap.tiles[newY][newX];
        if (!this.isWalkable(targetTile)) {
            return;
        }

        this.player.position.x = newX;
        this.player.position.y = newY;
        this.playerSprite.setPosition(
            newX * this.tileSize + this.tileSize / 2,
            newY * this.tileSize + this.tileSize / 2
        );

        this.events.emit('playerMoved', {
            x: newX,
            y: newY,
            tile: targetTile
        });
    }

    public getVisibleMap(): string[][] {
        const visibleMap: string[][] = [];
        const viewRange = 2;

        for (let y = -viewRange; y <= viewRange; y++) {
            const row: string[] = [];
            for (let x = -viewRange; x <= viewRange; x++) {
                const mapX = this.player.position.x + x;
                const mapY = this.player.position.y + y;

                if (mapX < 0 || mapX >= this.worldMap.width ||
                    mapY < 0 || mapY >= this.worldMap.height) {
                    row.push('?');
                } else {
                    row.push(this.worldMap.tiles[mapY][mapX]);
                }
            }
            visibleMap.push(row);
        }

        return visibleMap;
    }

    private getTileColor(tile: string): number {
        switch (tile) {
            case '平地':
                return 0x00ff00;
            case '森':
                return 0x006400;
            case '山':
                return 0x808080;
            case '海':
                return 0x0000ff;
            case '砂漠':
                return 0xffff00;
            default:
                return 0xffffff;
        }
    }

    private isWalkable(tile: string): boolean {
        return tile !== '山' && tile !== '海';
    }
} 
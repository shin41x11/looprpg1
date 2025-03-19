import { MapScene } from './scenes/MapScene.js';
import Phaser from 'phaser';
export class Game {
    constructor(worldMap, player) {
        this.worldMap = worldMap;
        this.player = player;
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            backgroundColor: '#000000',
            scene: [() => new MapScene(worldMap, player)]
        };
        this.game = new Phaser.Game(config);
        this.mapScene = this.game.scene.getScene('MapScene');
    }
    start() {
        this.game.scene.start('MapScene');
    }
    stop() {
        this.game.destroy(true);
    }
    handleInput(input) {
        switch (input.toLowerCase()) {
            case 'w':
                this.mapScene.movePlayer(0, -1);
                break;
            case 's':
                this.mapScene.movePlayer(0, 1);
                break;
            case 'a':
                this.mapScene.movePlayer(-1, 0);
                break;
            case 'd':
                this.mapScene.movePlayer(1, 0);
                break;
            case 'map':
                this.displayMap();
                break;
            case 'status':
                this.displayStatus();
                break;
            case 'help':
                this.displayHelp();
                break;
            default:
                console.log('無効なコマンドです。"help"で使用可能なコマンドを確認できます。');
        }
    }
    displayMap() {
        const visibleMap = this.mapScene.getVisibleMap();
        console.log('現在地の周辺マップ:');
        visibleMap.forEach(row => {
            console.log(row.map(tile => tile === '平地' ? '・' : '■').join(''));
        });
    }
    displayStatus() {
        console.log('===== ステータス =====');
        console.log(`HP: ${this.player.stats.hp}/${this.player.stats.maxHp}`);
        console.log(`MP: ${this.player.stats.mp}/${this.player.stats.maxMp}`);
        console.log(`レベル: ${this.player.stats.level}`);
        console.log(`攻撃力: ${this.player.stats.attack}`);
        console.log(`防御力: ${this.player.stats.defense}`);
        console.log(`素早さ: ${this.player.stats.speed}`);
        console.log('=====================');
    }
    displayHelp() {
        console.log('===== コマンド一覧 =====');
        console.log('w: 上に移動');
        console.log('s: 下に移動');
        console.log('a: 左に移動');
        console.log('d: 右に移動');
        console.log('map: マップを表示');
        console.log('status: ステータスを表示');
        console.log('help: このヘルプを表示');
        console.log('quit: ゲームを終了');
        console.log('=====================');
    }
}

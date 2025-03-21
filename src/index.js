import Phaser from 'phaser';
import MapScene from './scenes/MapScene';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: MapScene
};

// ゲームインスタンスをグローバルに公開
window.game = new Phaser.Game(config);

function preload() {
  // アセットの読み込み
}

function create() {
  // ゲームオブジェクトの作成
  this.add.text(10, 10, 'Hello Phaser!', { color: '#ffffff' });
}

function update() {
  // ゲームループ
} 
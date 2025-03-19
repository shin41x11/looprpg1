import { Game } from './Game.js';
// テスト用のワールドマップデータ
const testWorldMap = {
    width: 20,
    height: 20,
    tiles: Array(20).fill(null).map(() => Array(20).fill('平地')),
    areas: {
        'starting_town': {
            name: 'スタートの町',
            description: '冒険の始まりの町',
            npcs: [],
            shops: [],
            quests: []
        }
    }
};
// プレイヤーの初期状態
const playerState = {
    stats: {
        hp: 100,
        maxHp: 100,
        mp: 50,
        maxMp: 50,
        level: 1,
        attack: 10,
        defense: 5,
        speed: 5
    },
    inventory: [],
    position: { x: 10, y: 10, areaId: 'starting_town' },
    completedQuests: [],
    visitedLocations: ['starting_town']
};
// ゲームの開始
const game = new Game(testWorldMap, playerState);
game.start();

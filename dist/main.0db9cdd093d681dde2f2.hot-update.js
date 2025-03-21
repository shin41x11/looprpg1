"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatelooprpg1"]("main",{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _scenes_MapScene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scenes/MapScene */ \"./src/scenes/MapScene.js\");\n\r\n\r\n\r\nconst config = {\r\n  type: (phaser__WEBPACK_IMPORTED_MODULE_0___default().AUTO),\r\n  width: 800,\r\n  height: 600,\r\n  physics: {\r\n    default: 'arcade',\r\n    arcade: {\r\n      gravity: { y: 300 },\r\n      debug: false\r\n    }\r\n  },\r\n  scene: _scenes_MapScene__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\r\n};\r\n\r\n// ゲームインスタンスをグローバルに公開\r\nwindow.game = new (phaser__WEBPACK_IMPORTED_MODULE_0___default().Game)(config);\r\n\r\nfunction preload() {\r\n  // アセットの読み込み\r\n}\r\n\r\nfunction create() {\r\n  // ゲームオブジェクトの作成\r\n  this.add.text(10, 10, 'Hello Phaser!', { color: '#ffffff' });\r\n}\r\n\r\nfunction update() {\r\n  // ゲームループ\r\n} \n\n//# sourceURL=webpack://looprpg1/./src/index.js?");

/***/ }),

/***/ "./src/scenes/MapScene.js":
/*!********************************!*\
  !*** ./src/scenes/MapScene.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MapScene)\n/* harmony export */ });\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nclass MapScene extends (phaser__WEBPACK_IMPORTED_MODULE_0___default().Scene) {\r\n    constructor() {\r\n        super({ key: 'MapScene' });\r\n        this.assetsLoaded = false;\r\n    }\r\n\r\n    init() {\r\n        console.log('MapScene init');\r\n    }\r\n\r\n    preload() {\r\n        console.log('MapScene preload start');\r\n\r\n        // アセットのベースURLを設定\r\n        this.load.setBaseURL('');\r\n\r\n        // ロードの進行状況をコンソールに出力\r\n        this.load.on('progress', (value) => {\r\n            console.log(`Loading progress: ${Math.round(value * 100)}%`);\r\n        });\r\n\r\n        this.load.on('filecomplete', (key, type, data) => {\r\n            console.log(`File loaded: ${key} (${type})`);\r\n            // ファイルが読み込まれたことを確認\r\n            if (type === 'image') {\r\n                console.log(`Texture exists (${key}):`, this.textures.exists(key));\r\n            } else if (type === 'tilemapJSON') {\r\n                console.log(`Tilemap exists (${key}):`, this.cache.tilemap.exists(key));\r\n            }\r\n        });\r\n\r\n        this.load.on('loaderror', (file) => {\r\n            console.error('Load error:', file.key, file.url);\r\n        });\r\n\r\n        this.load.on('complete', () => {\r\n            console.log('All assets loaded');\r\n            // 読み込まれたアセットを確認\r\n            console.log('Loaded textures:', Array.from(this.textures.keys()));\r\n            console.log('Loaded tilemaps:', Array.from(this.cache.tilemap.entries.keys()));\r\n            this.assetsLoaded = true;\r\n        });\r\n\r\n        // タイルセットの画像を読み込み\r\n        this.load.image({\r\n            key: 'tiles',\r\n            url: '/assets/tilesets/tileset.png',\r\n            normalMap: false\r\n        });\r\n\r\n        // タイルマップのJSONを読み込み\r\n        this.load.tilemapTiledJSON({\r\n            key: 'map',\r\n            url: '/assets/tilemaps/map.json'\r\n        });\r\n\r\n        // プレイヤーキャラクターの画像を読み込み\r\n        this.load.image({\r\n            key: 'player',\r\n            url: '/assets/characters/player.png',\r\n            normalMap: false\r\n        });\r\n\r\n        console.log('MapScene preload end');\r\n    }\r\n\r\n    create() {\r\n        console.log('MapScene create start');\r\n\r\n        if (!this.assetsLoaded) {\r\n            console.error('Assets not loaded yet');\r\n            return;\r\n        }\r\n\r\n        // アセットの存在を確認\r\n        const assets = {\r\n            tiles: this.textures.exists('tiles'),\r\n            player: this.textures.exists('player'),\r\n            map: this.cache.tilemap.exists('map')\r\n        };\r\n        console.log('Asset status:', assets);\r\n\r\n        if (!assets.tiles) {\r\n            console.error('Tileset texture not found');\r\n            return;\r\n        }\r\n        if (!assets.player) {\r\n            console.error('Player texture not found');\r\n            return;\r\n        }\r\n        if (!assets.map) {\r\n            console.error('Tilemap not found');\r\n            return;\r\n        }\r\n\r\n        // タイルマップの作成\r\n        const map = this.make.tilemap({ key: 'map' });\r\n        \r\n        // タイルセットの追加\r\n        const tileset = map.addTilesetImage('tileset', 'tiles');\r\n        \r\n        // レイヤーの作成\r\n        const groundLayer = map.createLayer('Ground', tileset, 0, 0);\r\n        const objectLayer = map.createLayer('Objects', tileset, 0, 0);\r\n\r\n        // プレイヤーの作成\r\n        this.player = this.physics.add.sprite(100, 100, 'player');\r\n        this.player.setCollideWorldBounds(true);\r\n\r\n        // カメラの設定\r\n        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);\r\n        this.cameras.main.startFollow(this.player);\r\n        this.cameras.main.setBackgroundColor('#87CEEB'); // 空色の背景\r\n\r\n        // キーボード入力の設定\r\n        this.cursors = this.input.keyboard.createCursorKeys();\r\n\r\n        console.log('MapScene create end');\r\n    }\r\n\r\n    update() {\r\n        if (!this.player) return;\r\n\r\n        // プレイヤーの移動処理\r\n        const speed = 160;\r\n\r\n        if (this.cursors.left.isDown) {\r\n            this.player.setVelocityX(-speed);\r\n        } else if (this.cursors.right.isDown) {\r\n            this.player.setVelocityX(speed);\r\n        } else {\r\n            this.player.setVelocityX(0);\r\n        }\r\n\r\n        if (this.cursors.up.isDown) {\r\n            this.player.setVelocityY(-speed);\r\n        } else if (this.cursors.down.isDown) {\r\n            this.player.setVelocityY(speed);\r\n        } else {\r\n            this.player.setVelocityY(0);\r\n        }\r\n    }\r\n} \n\n//# sourceURL=webpack://looprpg1/./src/scenes/MapScene.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("5d5dbf8d45ccb8f5d5c9")
/******/ })();
/******/ 
/******/ }
);
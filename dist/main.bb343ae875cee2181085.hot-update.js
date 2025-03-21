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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nconst config = {\r\n  type: (phaser__WEBPACK_IMPORTED_MODULE_0___default().AUTO),\r\n  width: 800,\r\n  height: 600,\r\n  physics: {\r\n    default: 'arcade',\r\n    arcade: {\r\n      gravity: { y: 300 },\r\n      debug: false\r\n    }\r\n  },\r\n  scene: {\r\n    preload: preload,\r\n    create: create,\r\n    update: update\r\n  }\r\n};\r\n\r\nconst game = new (phaser__WEBPACK_IMPORTED_MODULE_0___default().Game)(config);\r\n\r\nfunction preload() {\r\n  // アセットの読み込み\r\n}\r\n\r\nfunction create() {\r\n  // ゲームオブジェクトの作成\r\n  this.add.text(10, 10, 'Hello Phaser!', { color: '#ffffff' });\r\n}\r\n\r\nfunction update() {\r\n  // ゲームループ\r\n} \n\n//# sourceURL=webpack://looprpg1/./src/index.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("9b1a809723f3029a39a4")
/******/ })();
/******/ 
/******/ }
);
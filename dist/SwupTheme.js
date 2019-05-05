(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SwupTheme"] = factory();
	else
		root["SwupTheme"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Theme = function () {
	function Theme() {
		_classCallCheck(this, Theme);

		this._addedStyleElements = [];
		this._addedHTMLContent = [];
		this._classNameAddedToElements = [];
		this.isSwupPlugin = true;
	}

	_createClass(Theme, [{
		key: '_beforeMount',
		value: function _beforeMount() {
			// save original and replace animationSelector option
			this._originalAnimationSelectorOption = String(this.swup.options.animationSelector);
			this.swup.options.animationSelector = '[class*="swup-transition-"]';
		}
	}, {
		key: '_afterUnmount',
		value: function _afterUnmount() {
			// reset animationSelector option
			this.swup.options.animationSelector = this._originalAnimationSelectorOption;

			// remove added styles
			this._addedStyleElements.forEach(function (element) {
				element.outerHTML = '';
				element = null;
			});

			// remove added HTML
			this._addedHTMLContent.forEach(function (element) {
				element.outerHTML = '';
				element = null;
			});

			// remove added classnames
			this._classNameAddedToElements.forEach(function (element) {
				element.className.split(' ').forEach(function (classItem) {
					if (new RegExp('^swup-transition-').test(classItem)) {
						document.documentElement.classList.remove(classItem);
					}
				});
			});
		}
	}, {
		key: 'mount',
		value: function mount() {
			// this is mount method rewritten by class extending
			// and is executed when swup is enabled with theme
		}
	}, {
		key: 'unmount',
		value: function unmount() {
			// this is unmount method rewritten by class extending
			// and is executed when swup with theme is disabled
		}
	}, {
		key: 'applyStyles',
		value: function applyStyles(styles) {
			var head = document.head;
			var style = document.createElement('style');

			style.appendChild(document.createTextNode(styles));

			this._addedStyleElements.push(style);
			head.prepend(style);
		}
	}, {
		key: 'applyHTML',
		value: function applyHTML(content) {
			var element = document.createElement('div');
			element.innerHTML = content;
			this._addedHTMLContent.push(element);
			document.body.appendChild(element);
		}
	}, {
		key: 'addClassName',
		value: function addClassName(selector, name) {
			var _this = this;

			var elements = void 0;
			if (typeof selector !== 'string') {
				elements = selector;
			} else {
				elements = Array.prototype.slice.call(document.querySelectorAll(selector));
			}

			// save so it can be later removed
			elements.forEach(function (element) {
				_this._classNameAddedToElements.push(element);
				element.classList.add('swup-transition-' + name);
			});
		}

		// this is here so we can tell if plugin was created by extending this class

	}]);

	return Theme;
}();

exports.default = Theme;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(0);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _index2.default; // this is here for webpack to expose SwupPlugin as window.SwupPlugin

/***/ })
/******/ ]);
});
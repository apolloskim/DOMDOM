/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/domdom_node_collection.js":
/*!***************************************!*\
  !*** ./src/domdom_node_collection.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return DOMDOMNodeCollection; });\nclass DOMDOMNodeCollection {\n\n  constructor(htmlElements) {\n    this.htmlElements = Object.assign([], htmlElements);\n  }\n\n  html(arg) {\n    if (arg !== undefined) {\n      this.htmlElements.map(e => e.innerHTML = arg);\n    } else {\n      return this.htmlElements[0].innerHTML;\n    }\n  }\n\n  empty() {\n    this.html('');\n    return this.htmlElements;\n  }\n\n  append(arg) {\n    if (arg instanceof DOMDOMNodeCollection) {\n      this.htmlElements.forEach(t => {\n        arg.htmlElements.forEach(e => t.innerHTML += e.outerHTML);\n      });\n    } else if (typeof arg === 'string') {\n      this.htmlElements.forEach(t => t.innerHTML += arg);\n    } else if (typeof arg === 'object' && arg instanceof HTMLElement) {\n      this.htmlElements.forEach(t => t.innerHTML += arg.outerHTML);\n    }\n    return this.htmlElements;\n  }\n\n  attr(arg, str) {\n    if (str && typeof str === 'string') {\n      this.htmlElements.forEach(e => e.setAttribute(arg, str));\n      return this.htmlElements;\n    } else {\n      return this.htmlElements[0].getAttribute(arg);\n    }\n  }\n\n  addClass(arg) {\n    let newArg = arg.split(' ');\n    this.htmlElements.forEach(h => h.classList.add(...newArg));\n    return this.htmlElements;\n  }\n\n  removeClass(arg) {\n    if (arg === undefined) {\n      this.htmlElements.forEach(h => h.className= \"\");\n    } else if (typeof arg === 'string') {\n      let newArg = arg.split(' ');\n      this.htmlElements.forEach(h => h.classList.remove(...newArg));\n    }\n    return this.htmlElements;\n  }\n\n  children() {\n    let childNodes = [];\n    this.htmlElements.forEach(h => {\n      const nodeChild = Object.assign([], h.children);\n      childNodes = childNodes.concat(nodeChild);\n    });\n    return new DOMDOMNodeCollection(childNodes);\n  }\n\n  parent() {\n    let parentNodes = [];\n    this.htmlElements.forEach(h => {\n      if (!h.parentNode.visited) {\n        parentNodes.push(h.parentNode);\n        h.parentNode.visited = true;\n      }\n    });\n\n    parentNodes.forEach(n => n.visited = false);\n    return new DOMDOMNodeCollection(parentNodes);\n  }\n\n  find(arg) {\n    let foundNodes = [];\n\n    this.htmlElements.forEach(h => {\n      const selectedNodes = h.querySelectorAll(arg);\n      foundNodes = foundNodes.concat(Object.assign([], selectedNodes));\n    });\n    return new DOMDOMNodeCollection(foundNodes);\n  }\n\n  remove() {\n    this.htmlElements.forEach(node => node.parentNode.removeChild(node));\n  }\n\n}\n\n\n//# sourceURL=webpack:///./src/domdom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _domdom_node_collection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domdom_node_collection */ \"./src/domdom_node_collection.js\");\n\n\nwindow.$l = arg => {\n  if (typeof arg === \"string\") {\n    let nodeListArr = document.querySelectorAll(arg);\n    nodeListArr = Object.assign([], nodeListArr);\n    return new _domdom_node_collection__WEBPACK_IMPORTED_MODULE_0__[\"default\"](nodeListArr);\n  } else if (typeof arg === 'object' && arg instanceof HTMLElement) {\n    const htmlArr = [arg];\n    return new _domdom_node_collection__WEBPACK_IMPORTED_MODULE_0__[\"default\"](htmlArr);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });
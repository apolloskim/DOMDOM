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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return DOMDOMNodeCollection; });\nclass DOMDOMNodeCollection {\n\n  constructor(htmlElements) {\n    this.htmlElements = Object.assign([], htmlElements);\n  }\n\n  html(arg) {\n    if (arg !== undefined) {\n      this.htmlElements.map(e => e.innerHTML = arg);\n    } else {\n      return this.htmlElements[0].innerHTML;\n    }\n  }\n\n  empty() {\n    this.html('');\n    return this.htmlElements;\n  }\n\n  append(arg) {\n    if (arg instanceof DOMDOMNodeCollection) {\n      this.htmlElements.forEach(t => {\n        arg.htmlElements.forEach(e => t.innerHTML += e.outerHTML);\n      });\n    } else if (typeof arg === 'string') {\n      this.htmlElements.forEach(t => t.innerHTML += arg);\n    } else if (typeof arg === 'object' && arg instanceof HTMLElement) {\n      this.htmlElements.forEach(t => t.innerHTML += arg.outerHTML);\n    }\n    return this.htmlElements;\n  }\n\n\n\n\n\n  attr(arg, str) {\n    if (str && typeof str === 'string') {\n      this.htmlElements.forEach(e => e.setAttribute(arg, str));\n      return this.htmlElements;\n    } else {\n      return this.htmlElements[0].getAttribute(arg);\n    }\n  }\n\n  addClass(arg) {\n    let newArg = arg.split(' ');\n    this.htmlElements.forEach(h => h.classList.add(...newArg));\n    return this.htmlElements;\n  }\n\n  removeClass(arg) {\n    if (arg === undefined) {\n      this.htmlElements.forEach(h => h.className= \"\");\n    } else if (typeof arg === 'string') {\n      let newArg = arg.split(' ');\n      this.htmlElements.forEach(h => h.classList.remove(...newArg));\n    }\n    return this.htmlElements;\n  }\n\n  children() {\n    let childNodes = [];\n    this.htmlElements.forEach(h => {\n      const nodeChild = Object.assign([], h.children);\n      childNodes = childNodes.concat(nodeChild);\n    });\n    return new DOMDOMNodeCollection(childNodes);\n  }\n\n  parent() {\n    let parentNodes = [];\n    this.htmlElements.forEach(h => {\n      if (!h.parentNode.visited) {\n        parentNodes.push(h.parentNode);\n        h.parentNode.visited = true;\n      }\n    });\n\n    parentNodes.forEach(n => n.visited = false);\n    return new DOMDOMNodeCollection(parentNodes);\n  }\n\n  find(arg) {\n    let foundNodes = [];\n\n    this.htmlElements.forEach(h => {\n      const selectedNodes = h.querySelectorAll(arg);\n      foundNodes = foundNodes.concat(Object.assign([], selectedNodes));\n    });\n    return new DOMDOMNodeCollection(foundNodes);\n  }\n\n  remove() {\n    this.htmlElements.forEach(h => h.parentNode.removeChild(h));\n  }\n\n  on(eventName, cb) {\n    this.htmlElements.forEach(h => {\n      h.addEventListener(eventName, cb);\n      const eventKey = `events-${eventName}`;\n      if (h[eventKey] === undefined) {\n        h[eventKey] = [];\n      }\n      h[eventKey].push(cb);\n    });\n  }\n\n  off(eventName) {\n    const eventKey = `events-${eventName}`;\n    this.htmlElements.forEach(h => {\n      h[eventKey].forEach(cb => h.removeEventListener(eventName, cb));\n      h[eventKey] = [];\n    });\n  }\n\n\n}\n\n\n//# sourceURL=webpack:///./src/domdom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _domdom_node_collection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domdom_node_collection */ \"./src/domdom_node_collection.js\");\n\n\nlet documentReady = false;\nlet cbArray = [];\nlet results;\nlet answers = [];\nlet count = 0;\nlet answerStatus = new Array(12);\nanswerStatus.fill(false, 0, 12);\n\n\nwindow.$l = arg => {\n  if (typeof arg === \"string\") {\n    let nodeListArr = document.querySelectorAll(arg);\n    nodeListArr = Object.assign([], nodeListArr);\n    return new _domdom_node_collection__WEBPACK_IMPORTED_MODULE_0__[\"default\"](nodeListArr);\n  } else if (typeof arg === 'object' && arg instanceof HTMLElement) {\n      const htmlArr = [arg];\n      return new _domdom_node_collection__WEBPACK_IMPORTED_MODULE_0__[\"default\"](htmlArr);\n  } else if (typeof arg === 'function') {\n      if (!documentReady) {\n        cbArray.push(arg);\n      } else {\n        arg();\n      }\n  }\n};\n\nwindow.$l.extend = (...obj) => {\n  return Object.assign({}, ...obj);\n};\n\nwindow.$l.ajax = option => {\n  let defaultOption = {\n    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',\n    method: \"GET\",\n    url: \"\",\n    success: () => {},\n    error: () => {},\n    data: {}\n  };\n\n  let request = new XMLHttpRequest();\n\n  option = $l.extend(defaultOption, option);\n\n  if (option.method === 'GET') {\n    let query = \"\";\n    for (const elem in option.data) {\n      query += `${elem}=${option.data[elem]}&`;\n    }\n    if (Object.values(option.data).length !== 0) {\n      option.url += `?${query.substring(0, query.length - 1)}`;\n    }\n  }\n\n  request.open(option.method, option.url, true);\n  request.send(JSON.stringify(option.data));\n\n  return new Promise ((resolve, reject) => {\n    request.onload = () => {\n      if (request.status === 200) {\n        resolve(JSON.parse(request.response));\n      } else {\n        reject(JSON.parse(request.response));\n      }\n    };\n  });\n}\n\nconst shuffleArray = array => {\n    for (var i = array.length - 1; i > 0; i--) {\n        var j = Math.floor(Math.random() * (i + 1));\n        var temp = array[i];\n        array[i] = array[j];\n        array[j] = temp;\n    }\n    return array;\n};\n\nconst appendQuestions = (rObj, count) => {\n  let str = '';\n  rObj.forEach(q => {\n    let c = -1;\n    let sm = q.choices.map(ans => {\n      c++;\n      return `<li class=\"lists-${count}-${c} ${typeof answerStatus[count] === 'string' && answerStatus[count] === ans && answerStatus[count] === answers[count] ? 'correct-answer' : (typeof answerStatus[count] === 'string' && answerStatus[count] === ans && answerStatus[count] !== answers[count] ? 'incorrect-answer' : 'default-color')}\">${ans}</li>`\n    })\n    sm = sm.join('');\n    str += `<div class=\"main-container\"><li><h3>${count + 1}) ${q.question}</h3><ol class=\"choices\">${sm}</ol></li></div>`;\n    count++;\n  });\n  return [str, count];\n};\n\nconst separateQuestions = quesArr => {\n  let resultsPiece = quesArr.slice(count, count + 4);\n  let elemArr = appendQuestions(resultsPiece, count);\n  let elemStr = elemArr[0];\n  count = elemArr[1];\n  $l('ul').html(elemStr);\n};\n\nconst renderNextPage = (results) => {\n  return e => {\n    separateQuestions(results);\n    $l(\"li[class^='lists-']\").on(\"click\", checkAnswer);\n    // console.log(count);\n    if (count === 0) {\n      $l(\"#prev-button\").attr('style', 'pointer-events: none; opacity: 0;');\n    } else {\n      // debugger\n      $l(\"#prev-button\").attr('style', 'pointer-events: auto');\n    }\n    if (count === 12) {\n      $l(\"#next-button\").html(\"COMPLETE?\");\n      $l(\"#next-button\").off(\"click\", renderNextPage(results));\n      // $l(\"#prev-button\").off(\"click\", renderPrevPage(results));\n      $l(\"#next-button\").on(\"click\", renderResultsPage);\n    }\n  }\n};\n\nconst renderResultsPage = e => {\n  let numCorrectAns = 0;\n  for (let i = 0; i < 12; i++) {\n    if (answerStatus[i] === answers[i]) {\n      numCorrectAns++;\n    }\n  }\n  $l('#result').removeClass('main-container');\n  $l('.main-container').remove();\n  $l('#result').addClass('main-container score');\n  $l('#result').html(`<span id=\"first-line\">Your Score is: </span><span>${numCorrectAns}/12</span>`);\n  $l('.result-container').attr('style', 'display: flex');\n  $l('#prev-button').html(\"GO BACK?\");\n  $l('#prev-button').on('click', () => {\n    count = 0;\n    separateQuestions(results);\n    $l(\"#prev-button\").attr('style', 'pointer-events: none; opacity: 0;');\n    $l('#next-button').html(\"NEXT\");\n    $l('#next-button').off(\"click\", rerenderPage);\n    $l('#next-button').on('click', renderNextPage(results));\n    $l('.result-container').attr('style', 'display: none');\n    $l(\"li[class^='lists-']\").on(\"click\", checkAnswer);\n  });\n  $l(\"#next-button\").html(\"NEW GAME?\");\n  $l(\"#next-button\").on(\"click\", rerenderPage);\n}\n\nconst rerenderPage = e => {\n  // location.reload();\n\n  return $l.ajax({\n    url: `https://opentdb.com/api.php`,\n    data: {\"amount\": 12, \"category\": 12, \"difficulty\": \"easy\", \"type\": \"multiple\"}\n  }).then(response => {\n    count = 0;\n    results = Object.assign([], response.results);\n\n    answers = [];\n    let answerStatus = new Array(12);\n    answerStatus.fill(false, 0, 12);\n\n    results.forEach(r => {\n      answers.push(r.correct_answer);\n    });\n    results = results.map(r => {\n      let arr = r.incorrect_answers.concat(r.correct_answer);\n      for (var i = arr.length - 1; i > 0; i--) {\n          var j = Math.floor(Math.random() * (i + 1));\n          var temp = arr[i];\n          arr[i] = arr[j];\n          arr[j] = temp;\n      }\n      let resultsObj = {'question': r.question, 'choices': arr};\n      return resultsObj;\n    });\n\n    separateQuestions(results);\n    $l(\"#next-button\").html(\"NEXT\");\n    $l(\"#prev-button\").html(\"PREVIOUS\");\n    $l(\"#result\").html(\"\");\n    $l(\"#result\").removeClass(\"main-container\");\n    $l(\"prev-button\").attr(\"style\", \"pointer-events: none; opacity: 0;\");\n    $l(\"#prev-button\").off(\"click\", rerenderPage);\n    $l(\"#next-button\").off(\"click\", renderResultsPage);\n    $l(\"#next-button\").on(\"click\", renderNextPage(results));\n    $l(\"#prev-button\").on(\"click\", renderPrevPage(results));\n    $l(\"li[class^='lists-']\").on(\"click\", checkAnswer);\n    $l(\"#prev-button\").attr('style', 'pointer-events: none; opacity: 0;');\n  });\n};\n\nconst renderPrevPage = (results) => {\n  return e => {\n    if (count > 0) {\n      count -= 8;\n      separateQuestions(results);\n      $l(\"li[class^='lists-']\").on(\"click\", checkAnswer);\n    }\n    if (count === 4) {\n      // console.log($l(\"#prev-button\"));\n      $l(\"#prev-button\").attr('style', 'pointer-events: none; opacity: 0;');\n    } else {\n      // debugger\n      $l(\"#prev-button\").attr('style', 'pointer-events: auto');\n    }\n    if (count < 12) {\n      $l(\"#next-button\").attr('style', 'pointer-events: auto');\n      $l(\"#next-button\").html(\"NEXT\");\n      $l(\"#next-button\").off(\"click\", renderResultsPage);\n      $l(\"#next-button\").on(\"click\", renderNextPage(results));\n    }\n  }\n};\n\nconst checkAnswer = e => {\n    if (answers.includes(e.target.innerHTML)) {\n    let idx = answers.indexOf(e.target.innerHTML);\n    answerStatus[idx] = e.target.innerHTML;\n    let classId = e.target.className.split(\" \")[0];\n    checkIfCorrect(idx, classId);\n  } else {\n    let reg = /[0-9]+/;\n    let classId = e.target.className.split(\" \")[0];\n    let idx = classId.match(reg)[0];\n    answerStatus[idx] = e.target.innerHTML;\n    // console.log(classId, idx);\n    checkIfCorrect(idx, classId);\n  }\n}\n\nconst checkIfCorrect = (index, listClass) => {\n  if (answerStatus[index] === answers[index]) {\n    $l(`li[class^='lists-${index}']`).removeClass('incorrect-answer');\n    $l(`li[class^='lists-${index}']`).removeClass('correct-answer');\n    $l(`li[class^='lists-${index}']`).addClass('default-color');\n    $l(`.${listClass}`).addClass('correct-answer');\n  } else {\n    $l(`li[class^='lists-${index}']`).removeClass('incorrect-answer');\n    $l(`li[class^='lists-${index}']`).removeClass('correct-answer');\n    $l(`li[class^='lists-${index}']`).addClass('default-color');\n    $l(`.${listClass}`).addClass('incorrect-answer');\n  }\n}\n\n$l($l.ajax({\n  url: `https://opentdb.com/api.php`,\n  data: {\"amount\": 12, \"category\": 12, \"difficulty\": \"easy\", \"type\": \"multiple\"}\n}).then (response => {\n  results = Object.assign([], response.results);\n  results.forEach(r => {\n    answers.push(r.correct_answer);\n  });\n  results = results.map(r => {\n    let arr = r.incorrect_answers.concat(r.correct_answer);\n    for (var i = arr.length - 1; i > 0; i--) {\n        var j = Math.floor(Math.random() * (i + 1));\n        var temp = arr[i];\n        arr[i] = arr[j];\n        arr[j] = temp;\n    }\n    let resultsObj = {'question': r.question, 'choices': arr};\n    return resultsObj;\n  });\n  separateQuestions(results);\n  $l(\"#next-button\").on(\"click\", renderNextPage(results));\n  $l(\"#prev-button\").on(\"click\", renderPrevPage(results));\n  $l(\"li[class^='lists-']\").on(\"click\", checkAnswer);\n}));\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  documentReady = true;\n  cbArray.forEach(cb => cb());\n  $l(\"#prev-button\").attr('style', 'pointer-events: none; opacity: 0;');\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });
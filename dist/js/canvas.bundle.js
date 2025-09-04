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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const grid = 20;
const scaleFactor = .5;
canvas.width = innerWidth + grid * 2;
canvas.height = innerHeight + grid;
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};
const colors = ['#24292eff'];

// Event Listeners
addEventListener('mousemove', event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

// Planes
function Plane(x, y, color, scaleFactor) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.scaleFactor = scaleFactor;
}
Plane.prototype.draw = function () {
  c.save(); // Save the current transformation matrix

  // Calculate angle to mouse
  const dx = mouse.x - this.x;
  const dy = mouse.y - this.y;
  const angle = Math.atan2(dy, dx);

  // === Rotate about the plane's CENTER, not the nose ===
  // The nose is at local (0,0). Tail is around (-30,0).
  // Center ≈ halfway: (-15, 0) in local coords (scaled).
  const pivotX = -15 * this.scaleFactor;

  // Translate to plane position and rotate
  c.translate(this.x + pivotX, this.y);
  c.rotate(angle);
  c.translate(-pivotX, 0);
  c.beginPath();

  // Draw a proper arrow shape with nose pointing right (0 degrees)
  // Nose at origin (0, 0)
  c.moveTo(0, 0);

  // Top right point
  c.lineTo(-30 * this.scaleFactor, -11 * this.scaleFactor);

  // Inner right point (arrow notch)
  c.lineTo(-26 * this.scaleFactor, 0);

  // Bottom right point
  c.lineTo(-30 * this.scaleFactor, 11 * this.scaleFactor);

  // Close back to nose
  c.lineTo(0, 0);

  // Line from inner right to nose
  c.moveTo(-26 * this.scaleFactor, 0);
  c.lineTo(1, 0);
  c.strokeStyle = this.color;
  c.lineWidth = 1 * this.scaleFactor;
  c.stroke();
  c.closePath();
  c.restore(); // Restore the original transformation matrix
};
Plane.prototype.update = function () {
  this.draw();
};

// Implementation
let planes;
function init() {
  planes = [];
  // Create planes in grid
  for (let x = 1; x < canvas.width / grid; x++) {
    for (let y = 1; y < canvas.height / grid; y++) {
      console.log(`Next Plane at: ${x * grid}/${y * grid}`);
      planes.push(new Plane(x * grid - grid / 2, y * grid - grid / 2, Object(_utils__WEBPACK_IMPORTED_MODULE_0__["randomColor"])(colors), scaleFactor));
    }
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  planes.forEach(plane => {
    plane.update();
  });
}
init();
animate();

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}
function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}
module.exports = {
  randomIntFromRange,
  randomColor,
  distance
};

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map
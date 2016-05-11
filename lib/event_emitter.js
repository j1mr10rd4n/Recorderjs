'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//from http://stackoverflow.com/questions/22186467/how-to-use-javascript-eventtarget

var EventEmitter = function EventEmitter() {
  var _this = this;

  _classCallCheck(this, EventEmitter);

  this.eventTarget = document.createDocumentFragment();

  ['addEventListener', 'dispatchEvent', 'removeEventListener'].forEach(function (method) {
    return _this[method] = _this.eventTarget[method].bind(_this.eventTarget);
  });
};

exports.default = EventEmitter;
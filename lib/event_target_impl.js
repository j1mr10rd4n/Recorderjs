"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// adapted from http://upshots.org/javascript/javascript-simple-implementation-of-eventtarget

var EventTargetImpl = function () {
  function EventTargetImpl() {
    _classCallCheck(this, EventTargetImpl);

    this.listeners = {};
  }

  _createClass(EventTargetImpl, [{
    key: "addEventListener",
    value: function addEventListener(type, callback) {
      if (!(type in this.listeners)) {
        this.listeners[type] = [];
      }
      this.listeners[type].push(callback);
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(type, callback) {
      if (!(type in this.listeners)) {
        return;
      }
      var stack = this.listeners[type];
      for (var i = 0, l = stack.length; i < l; i++) {
        if (stack[i] === callback) {
          stack.splice(i, 1);
          return this.removeEventListener(type, callback);
        }
      }
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(event) {
      if (!(event.type in this.listeners)) {
        return;
      }
      var stack = this.listeners[event.type];
      for (var i = 0, l = stack.length; i < l; i++) {
        stack[i].call(this, event);
      }
    }
  }]);

  return EventTargetImpl;
}();

exports.default = EventTargetImpl;
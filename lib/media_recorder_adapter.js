'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediaRecorderAdapter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _recorder = require('./recorder');

var _recorder2 = _interopRequireDefault(_recorder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MediaRecorderAdapter = exports.MediaRecorderAdapter = function () {
  function MediaRecorderAdapter(stream, options) {
    _classCallCheck(this, MediaRecorderAdapter);

    this.recorder = new _recorder2.default(stream);
  }

  _createClass(MediaRecorderAdapter, [{
    key: 'record',
    value: function record() {
      this.recorder.record();
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.recorder.stop();
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.recorder.clear();
    }
  }, {
    key: 'getBuffer',
    value: function getBuffer(cb) {
      this.recorder.getBuffer(cb);
    }
  }, {
    key: 'exportWAV',
    value: function exportWAV(cb, mimeType) {
      this.recorder.exportWAV(cb, mimeType);
    }
  }], [{
    key: 'forceDownload',
    value: function forceDownload(blob, filename) {
      this.recorder.forceDownload(blob, filename);
    }
  }]);

  return MediaRecorderAdapter;
}();
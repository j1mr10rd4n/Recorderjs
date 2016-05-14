'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediaRecorderAdapter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _recorder = require('./recorder');

var _recorder2 = _interopRequireDefault(_recorder);

var _event_target_impl = require('./event_target_impl');

var _event_target_impl2 = _interopRequireDefault(_event_target_impl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MediaRecorderAdapter = exports.MediaRecorderAdapter = function (_EventTargetImpl) {
  _inherits(MediaRecorderAdapter, _EventTargetImpl);

  function MediaRecorderAdapter(stream, options) {
    _classCallCheck(this, MediaRecorderAdapter);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MediaRecorderAdapter).call(this));
    // RecorderJs took an input constructed from the context whereas MediaRecorder
    // simply takes the stream - maybe can record directly from the stream?
    // for now adapt with our own context


    _this.state = "inactive";

    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext = new AudioContext();
    var source = audioContext.createMediaStreamSource(stream);
    _this.recorder = new _recorder2.default(source);
    return _this;
  }

  _createClass(MediaRecorderAdapter, [{
    key: 'start',
    value: function start() {
      this.state = "recording";
      this.recorder.record();
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.recorder.stop();
      this.state = "inactive";
      var mra = this;
      new Promise(function (resolve, reject) {
        mra.recorder.exportWAV(function (blob) {
          mra.recorder.clear();
          resolve(blob);
        });
      }).then(function (blob) {
        dispatchDataAvailableEvent(blob);
      }).catch(function (err) {
        console.log(err);
      });
      dispatchStopEvent();

      function dispatchStopEvent() {
        var stopEvent = new Event('stop');
        mra.dispatchEvent(stopEvent);
        if (mra._isFunction(mra.onstop)) {
          mra.onstop(stopEvent);
        }
      }

      function dispatchDataAvailableEvent(blob) {
        var dataAvailableEvent = new BlobEvent('dataavailable', { data: blob });
        mra.dispatchEvent(dataAvailableEvent);
        if (mra._isFunction(mra.ondataavailable)) {
          mra.ondataavailable(dataAvailableEvent);
        }
      }
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
  }, {
    key: '_isFunction',
    value: function _isFunction(fn) {
      return !!(fn && fn instanceof Function);
    }
  }], [{
    key: 'forceDownload',
    value: function forceDownload(blob, filename) {
      this.recorder.forceDownload(blob, filename);
    }
  }]);

  return MediaRecorderAdapter;
}(_event_target_impl2.default);
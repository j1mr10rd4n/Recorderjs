import Recorder from './recorder';
import EventTargetImpl from './event_target_impl';

export class MediaRecorderAdapter extends EventTargetImpl {

  state = "inactive";

  constructor(stream, options) {
    // RecorderJs took an input constructed from the context whereas MediaRecorder
    // simply takes the stream - maybe can record directly from the stream?
    // for now adapt with our own context
    super();
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext = new AudioContext();
    var source = audioContext.createMediaStreamSource(stream);
    this.recorder = new Recorder(source);
  }

  start() {
    this.state = "recording";
    this.recorder.record();
  }

  stop() {
    this.recorder.stop();
    this.state = "inactive";
    var stopEvent = new Event('stop');
    this.dispatchEvent(stopEvent);
    if(this._isFunction(this.onstop)) {
      this.onstop(stopEvent);
    }
  }

  clear() {
    this.recorder.clear();
  }

  getBuffer(cb) {
    this.recorder.getBuffer(cb);
  }

  exportWAV(cb, mimeType) {
    this.recorder.exportWAV(cb, mimeType);
  }

  _isFunction(fn) {
    return !!(fn && (fn instanceof Function));
  }

  static
  forceDownload(blob, filename) {
    this.recorder.forceDownload(blob, filename);
  }


}

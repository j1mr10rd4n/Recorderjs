import Recorder from './recorder';

export class MediaRecorderAdapter {

  constructor(stream, options) {
    this.recorder = new Recorder(stream);
  }

  record() {
    this.recorder.record();
  }

  stop() {
    this.recorder.stop();
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

  static
  forceDownload(blob, filename) {
    this.recorder.forceDownload(blob, filename);
  }


}

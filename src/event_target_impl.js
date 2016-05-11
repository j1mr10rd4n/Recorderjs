// adapted from http://upshots.org/javascript/javascript-simple-implementation-of-eventtarget

export default class EventTargetImpl {
  listeners = {};

  addEventListener(type, callback) {
    if(!(type in this.listeners)) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(callback);
  }

  removeEventListener(type, callback) {
    if(!(type in this.listeners)) {
      return;
    }
    var stack = this.listeners[type];
    for(var i = 0, l = stack.length; i < l; i++){
      if(stack[i] === callback){
        stack.splice(i, 1);
        return this.removeEventListener(type, callback);
      }
    }
  }

  dispatchEvent(event) {
    if(!(event.type in this.listeners)) {
      return;
    }
    var stack = this.listeners[event.type];
    for(var i = 0, l = stack.length; i < l; i++) {
      stack[i].call(this, event);
    }
  }
}



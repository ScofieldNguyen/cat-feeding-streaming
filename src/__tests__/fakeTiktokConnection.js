export default class FakeTiktokConnection {
  constructor() {
    this.eventCallbacks = {};
  }

  connect() {
  }

  disconnect() {
  }

  on(event, callback) {
    this.eventCallbacks[event] = callback;
  }

  triggerEvent(event, data) {
    if (this.eventCallbacks[event]) {
      this.eventCallbacks[event](data);
    }
  }
}
export default class StreamingHandler {
  constructor(streamListener, recordWriter) {
    this.streamListener = streamListener;
    this.recordWriter = recordWriter;
  }

  start() {
    this.streamListener.connect();
    this.streamListener.onGift(this._handleGift.bind(this));
    this.streamListener.onChat(this._handleChat.bind(this));
  }

  _handleGift(gift) {
    this.recordWriter.write(gift);
  }

  _handleChat(chat) {
    // console.log(chat);
  }

  stop() {
    this.streamListener.stop();
  }
}

export default class StreamingHandler {
  constructor(streamListener, recordWriter, mappingStrategy) {
    this.streamListener = streamListener;
    this.recordWriter = recordWriter;
    this.mappingStrategy = mappingStrategy;
  }

  start() {
    this.streamListener.connect();
    this.streamListener.onGift(this._handleGift.bind(this));
    this.streamListener.onChat(this._handleChat.bind(this));
  }

  _handleGift(gift) {
    this.recordWriter.write(this.mappingStrategy.map(gift));
  }

  _handleChat(chat) {
    // console.log(chat);
  }

  stop() {
    this.streamListener.stop();
  }
}

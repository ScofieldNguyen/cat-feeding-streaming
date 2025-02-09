export default class FakeStreamingListener {
  connect() {}
  stop() {}

  onGift(callback) {
    this.onGiftCallback = callback;
  }

  onChat(callback) {
    this.onChatCallback = callback;
  }

  triggerGift(gift) {
    this.onGiftCallback(gift);
  }

  triggerChat(chat) {
    this.onChatCallback(chat);
  }
}

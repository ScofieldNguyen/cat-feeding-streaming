export default class TiktokStreamingListener {
  constructor(connection) {
    this.connection = connection;
  }

  async connect() {
    try {
      await this.connection.connect();
      this._setupOnError();
      this._setupOnDisconnection();
    } catch (error) {
      console.error(`Failed to connect to TikTok stream: `, error);
      throw error;
    }
  }

  async stop() {
    try {
      await this.connection.disconnect();
    } catch (error) {
      console.error(`Failed to disconnect from TikTok stream:`, error);
      throw error;
    }
  }

  onGift(callback) {
    this.connection.on('gift', (gift) => this._handleGift(gift, callback));
  }

  onChat(callback) {
    this.connection.on('chat', (chat) => this._handleChat(chat, callback));
  }

  _handleChat(chat, callback) {
    callback(this._formatChatMessage(chat));
  }

  _handleGift(gift, callback) {
    // Only track gifts that cost diamonds (exclude free gifts)
    if (gift.diamondCount > 0) {
      const message = this._formatGiftMessage(gift);
      callback(message); 
    }
  }

  _formatGiftMessage(data) {
    return {
      id: data.giftId,
      userId: data.userId,
      value: data.diamondCount,
      name: data.giftName,
      created: data.timestamp,
    };
  }

  _formatChatMessage(data) {
    return {
      id: data.msgId,
      userId: data.userId,
      comment: data.comment,
      created: parseInt(data.createTime),
    };
  }

  _handleError(error) {
    console.error(`Error on ${this.username} stream: `, error);
    throw error;
  }

  _handleDisconnection() {
    console.log(`Disconnected from ${this.username} stream`);
    
    // Attempt to reconnect after 5 seconds
    setTimeout(() => {
        console.log('Attempting to reconnect...');
        this.connect();
    }, 5000);
  }

  _setupOnError() {
    this.connection.on('error', this._handleError.bind(this));
  }

  _setupOnDisconnection() {
    this.connection.on('disconnected', this._handleDisconnection.bind(this));
  }
}


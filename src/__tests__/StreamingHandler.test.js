import FakeStreamingListener from "./fakeStraemingListener";
import StreamingHandler from "../StreamingHandler";

describe("StreamingHandler", () => {
  let streamHandler;
  let mockStreamListener;
  let mockRecordWriter;

  beforeEach(() => {
    mockStreamListener = {
      connect: jest.fn(),
      stop: jest.fn(),
      onGift: jest.fn(),
      onChat: jest.fn(),
    };

    mockRecordWriter = {
      write: jest.fn(),
    };

    streamHandler = new StreamingHandler(mockStreamListener, mockRecordWriter);
  });

  it("should call connect on stream listener when start is called", async () => {
    await streamHandler.start();
    expect(mockStreamListener.connect).toBeCalled();
  });

  it("should call stop on stream listener when stop is called", () => {
    streamHandler.stop();
    expect(mockStreamListener.stop).toBeCalled();
  });

  it("should handle start failure gracefully", () => {
    mockStreamListener.connect.mockImplementationOnce(() => {
      throw new Error("Connection failed");
    });

    expect(() => streamHandler.start()).toThrow("Connection failed");
  });

  it("should write data to record writer when onGift is called", () => {
    const giftData = {
      id: "gift123",
      userId: "user456",
      value: 100,
      name: "Gift Name",
      created: new Date().toISOString(),
      amount: 100,
      sender: "John Doe",
    };

    const fakeStreamListener = new FakeStreamingListener();
    streamHandler = new StreamingHandler(fakeStreamListener, mockRecordWriter);
    streamHandler.start();
    fakeStreamListener.triggerGift(giftData);
    expect(mockRecordWriter.write).toBeCalledWith(giftData);
  });
});

import TiktokStreamingListener from "../streamingServices/tiktokStreamingListener";
import { fakeChatData, fakeGiftData } from "./fakeData";
import FakeTiktokConnection from "./fakeTiktokConnection";

describe("TiktokStreamingListener", () => {
  let mockConnection;
  let listener;

  beforeEach(() => {
    mockConnection = {
      connect: jest.fn().mockResolvedValue(),
      disconnect: jest.fn().mockResolvedValue(),
      on: jest.fn(),
    };
    listener = new TiktokStreamingListener(mockConnection);
  });

  test("should connect and setup event listeners", async () => {
    await listener.connect();
    expect(mockConnection.connect).toHaveBeenCalled();
    expect(mockConnection.on).toHaveBeenCalledWith(
      "error",
      expect.any(Function)
    );
    expect(mockConnection.on).toHaveBeenCalledWith(
      "disconnected",
      expect.any(Function)
    );
  });

  test("should handle connection errors", async () => {
    const error = new Error("Connection failed");
    mockConnection.connect.mockRejectedValueOnce(error);

    await expect(listener.connect()).rejects.toThrow("Connection failed");
  });

  test("should disconnect successfully", async () => {
    await listener.stop();
    expect(mockConnection.disconnect).toHaveBeenCalled();
  });

  test("should handle disconnection errors", async () => {
    const error = new Error("Disconnection failed");
    mockConnection.disconnect.mockRejectedValueOnce(error);

    await expect(listener.stop()).rejects.toThrow("Disconnection failed");
  });

  test("should handle gifts", () => {
    const fakeConnection = new FakeTiktokConnection();
    const listener = new TiktokStreamingListener(fakeConnection);

    const callback = jest.fn();
    listener.onGift(callback);

    fakeConnection.triggerEvent("gift", fakeGiftData);

    expect(callback).toHaveBeenCalledWith({
      id: 5953,
      userId: "6813181309701719620",
      value: 25,
      name: "Nevalyashka doll",
      created: 1661887134397,
    });
  });

  test("should handle chats", () => {
    const fakeConnection = new FakeTiktokConnection();
    const listener = new TiktokStreamingListener(fakeConnection);

    const callback = jest.fn();
    listener.onChat(callback);

    fakeConnection.triggerEvent("chat", fakeChatData);

    expect(callback).toHaveBeenCalledWith({
      id: "7137750790064065286",
      userId: "6813181309701719620",
      comment: "How are you?",
      created: 1661887134718,
    });
  });
});

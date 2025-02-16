import { WebcastPushConnection } from "tiktok-live-connector";
import config from "./src/config.js";
import TiktokStreamingListener from "./src/streamingServices/tiktokStreamingListener.js";
import StreamingHandler from "./src/StreamingHandler.js";
import GoogleSheetWriter from "./src/writers/GoogleSheetWriter.js";
import MappingStrategy from "./src/mappingStrategy.js";

const googleSheetWriter = new GoogleSheetWriter();
const connection = new WebcastPushConnection(config.username);
const listener = new TiktokStreamingListener(connection);
const mappingStrategy = new MappingStrategy(config.giftMappingTable);
const handler = new StreamingHandler(
  listener,
  googleSheetWriter,
  mappingStrategy
);
handler.start();

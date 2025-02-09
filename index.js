import { WebcastPushConnection } from "tiktok-live-connector"
import config from './src/config.js'
import TiktokStreamingListener from "./src/streamingServices/tiktokStreamingListener.js"
import StreamingHandler from "./src/StreamingHandler.js"

const writer = {
  write: (data) => {
    console.log(data)
  }
}

const connection = new WebcastPushConnection(config.username)
const listener = new TiktokStreamingListener(connection)
const handler = new StreamingHandler(listener, writer)

handler.start()
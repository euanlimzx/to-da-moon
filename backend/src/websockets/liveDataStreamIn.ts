import { Server } from "socket.io";
import { LiveDataStreamSocket } from "./types";

export function registerLiveDataStreamIn(
  io: Server,
  socket: LiveDataStreamSocket
): void {
  socket.on("live/receive-data-stream-from-mqtt", (mqttData) => {
    console.log(mqttData);
  });
}

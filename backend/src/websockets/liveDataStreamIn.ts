import { LiveDataStreamServer, LiveDataStreamSocket } from "./types";

export function registerLiveDataStream(
  io: LiveDataStreamServer,
  socket: LiveDataStreamSocket
): void {
  socket.on("live/receive-data-stream-from-mqtt", (mqttData) => {
    console.log(mqttData);

    // you have to use io instead of socket here, since you need to broadcast this message, rather than return it to the socket that requested it
    io.emit("live/broadcast-data-stream", mqttData);
  });
}

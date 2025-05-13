import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { registerStaticDataStreamOut } from "./staticDataStreamOut";
import { StaticDataStreamServer, StaticDataStreamSocket } from "./types";
import { registerLiveDataStream } from "./liveDataStreamIn";

export function initializeWebSockets(httpServer: HttpServer): Server {
  const io: StaticDataStreamServer = new Server(httpServer, {
    cors: {
      origin: "*", //todo @Euan, configure this to allow from our frontend only
      methods: ["GET", "POST"],
    },
    maxHttpBufferSize: 5e6,
  });

  io.on("connection", (socket: StaticDataStreamSocket) => {
    console.log("connected");
    // register the relevant event handlers
    registerStaticDataStreamOut(io, socket);
    registerLiveDataStream(io, socket);

    socket.on("disconnect", (reason) => {
      console.log(`WebSocket disconnected: ${socket.id}, Reason: ${reason}`);
    });
  });

  return io;
}

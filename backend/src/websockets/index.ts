import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { registerStaticDataStreamOut } from "./staticDataStreamOut";
import { StaticDataStreamServer, StaticDataStreamSocket } from "./types";
import { registerLiveDataStreamIn } from "./liveDataStreamIn";

export function initializeWebSockets(httpServer: HttpServer): Server {
  const io: StaticDataStreamServer = new Server(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN || "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: StaticDataStreamSocket) => {
    console.log("connected");
    // register the relevant event handlers
    registerStaticDataStreamOut(io, socket);
    registerLiveDataStreamIn(io, socket);

    socket.on("disconnect", (reason) => {
      console.log(`WebSocket disconnected: ${socket.id}, Reason: ${reason}`);
    });
  });

  return io;
}

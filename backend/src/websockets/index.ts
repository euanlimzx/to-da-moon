import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { registerStaticDataStreamOut } from "./staticDataStreamOut";

export function initializeWebSockets(httpServer: HttpServer): Server {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN || "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("connected");
    // register the relevant event handlers
    registerStaticDataStreamOut(io, socket);

    socket.on("disconnect", (reason) => {
      console.log(`WebSocket disconnected: ${socket.id}, Reason: ${reason}`);
    });
  });

  return io;
}

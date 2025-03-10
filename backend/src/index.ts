import express, { Request, Response } from "express";
import { createServer } from "http";
import cors from "cors";
import { initializeWebSockets } from "./websockets";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/test", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const server = createServer(app);
const io = initializeWebSockets(server);

// make the websocket a global variable that is available to all
app.set("io", io);

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});

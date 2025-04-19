import express, { Request, Response } from "express";
import { createServer } from "http";
import cors from "cors";
import { initializeWebSockets } from "./websockets";
import fs from "fs";
import path from "path";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

const server = createServer(app);
const io = initializeWebSockets(server);
const configFilePath = path.join(__dirname, "live-config.json");

// make the websocket a global variable that is available to all
app.set("io", io);

io.on("connection", (socket)=> {
  console.log(`Client connected: ${socket.id}`);

  socket.on("joinRoom", (roomCode: string) => {
    socket.join(roomCode)
    console.log(`Client joined room: ${roomCode}`);
  })

  socket.on("countDown", (roomCode: string) =>{
    startCountdown(roomCode)
  })
})

//countdown helper
function startCountdown(roomCode: string) {
  let count = 5;
  const interval = setInterval(() => {
    if (count >= -1) {
      io.to(roomCode).emit("countDown", count);
      count--;
    } else {
      clearInterval(interval);
      io.to(roomCode).emit("start");
    }
  }, 1000);
}


// POST route to update config
app.post("/live/config", (req, res) => {
  // Read the current config.json file
  fs.readFile(configFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read config file" });
    }
    try {
      // Parse the current config JSON
      const config = JSON.parse(data);

      for (const key in req.body) {
        if (config.hasOwnProperty(key)) {
          // Update the value in the config object
          config[key] = req.body[key];
        }
      }

      // Write the updated config back to the file
      fs.writeFile(configFilePath, JSON.stringify(config, null, 2), (err) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Failed to write updated config" });
        }

        // Send the updated config as the response
        res.json(config);
      });
      io.emit("live/config", config);
    } catch (parseError) {
      res.status(500).json({ error: "Failed to parse config file" });
    }
  });
});

app.get("/live/config", (req, res) => {
  // Read the current config.json file
  fs.readFile(configFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read config file" });
    }
    try {
      // Parse the current config JSON
      const config = JSON.parse(data);
      res.json(config);
    } catch (parseError) {
      res.status(500).json({ error: "Failed to parse config file" });
    }
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});

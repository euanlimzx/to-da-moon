"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const websockets_1 = require("./websockets");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // Replace with your frontend's origin
    methods: ["GET", "POST"],
    credentials: true,
}));
app.get("/test", (req, res) => {
    res.send("Express + TypeScript Server");
});
const server = (0, http_1.createServer)(app);
const io = (0, websockets_1.initializeWebSockets)(server);
// Initialize Socket.IO with the server
// make the websocket a global variable that is available to all
app.set("io", io);
server.listen(3000, () => {
    console.log("Server listening on port 3000");
});

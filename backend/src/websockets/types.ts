import { Socket, Server } from "socket.io";
import {
  DataStreamClientToServerEvents,
  DataStreamServerToClientEvents,
} from "../../../types/socketRequestTypes";

export type DataStreamSocket = Socket<
  DataStreamClientToServerEvents,
  DataStreamServerToClientEvents
>;

export type DataStreamServer = Server<
  DataStreamClientToServerEvents,
  DataStreamServerToClientEvents
>;

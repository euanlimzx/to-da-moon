import { Socket, Server } from "socket.io";
import {
  StaticDataStreamClientToServerEvents,
  StaticDataStreamServerToClientEvents,
} from "../../../types/socketRequestTypes";

export type StaticDataStreamSocket = Socket<
  StaticDataStreamClientToServerEvents,
  StaticDataStreamServerToClientEvents
>;

export type StaticDataStreamServer = Server<
  StaticDataStreamClientToServerEvents,
  StaticDataStreamServerToClientEvents
>;

import { Socket, Server } from "socket.io";
import {
  StaticDataStreamClientToServerEvents,
  StaticDataStreamServerToClientEvents,
  LiveDataStreamMQTTClientToServer,
  LiveDataStreamServerToClient,
} from "../../../types/socketRequestTypes";

export type StaticDataStreamSocket = Socket<
  StaticDataStreamClientToServerEvents,
  StaticDataStreamServerToClientEvents
>;

export type StaticDataStreamServer = Server<
  StaticDataStreamClientToServerEvents,
  StaticDataStreamServerToClientEvents
>;

export type LiveDataStreamSocket = Socket<
  LiveDataStreamMQTTClientToServer,
  LiveDataStreamServerToClient
>;

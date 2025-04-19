import { Socket, Server } from "socket.io";
import {
  StaticDataStreamClientToServerEvents,
  StaticDataStreamServerToClientEvents,
  LiveDataStreamMQTTClientToServer,
  LiveDataStreamServerToClient,
  LiveDataStreamMQTTClientToServerLatLng,
  LiveDataStreamServerToClientLatLng,
} from "../../../types/socketRequestTypes";

export type StaticDataStreamSocket = Socket<
  StaticDataStreamClientToServerEvents,
  StaticDataStreamServerToClientEvents
>;

export type StaticDataStreamServer = Server<
  StaticDataStreamClientToServerEvents,
  StaticDataStreamServerToClientEvents
>;

type LiveDataStreamClientToServerEvents = LiveDataStreamMQTTClientToServer &
  LiveDataStreamMQTTClientToServerLatLng;

type LiveDataStreamServerToClientEvents = LiveDataStreamServerToClient &
  LiveDataStreamServerToClientLatLng;

export type LiveDataStreamSocket = Socket<
  LiveDataStreamClientToServerEvents,
  LiveDataStreamServerToClientEvents
>;

export type LiveDataStreamServer = Server<
  LiveDataStreamClientToServerEvents,
  LiveDataStreamServerToClientEvents
>;

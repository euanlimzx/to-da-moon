// https://socket.io/docs/v4/typescript/

import { MqttData } from "./mqttData";

export interface StaticDataStreamServerToClientEvents {
  "static/receive-data-stream": (chunk: number[]) => void;
  "static/receive-data-stream-end": (errorMessage?: string) => void;
}

export interface StaticDataStreamClientToServerEvents {
  "static/get-data-stream": (file_path: string) => void;
}

// client in this case refers to the python script that is going to send data over
// ESP32 -> MQTT broker -> python script -> websocket backend
export interface LiveDataStreamMQTTClientToServer {
  "live/receive-data-stream-from-mqtt": (mqttData: MqttData) => void;
}

export interface LiveDataStreamServerToClient {
  "live/broadcast-data-stream": (mqttData: MqttData) => void;
}

export interface LiveDataStreamMQTTClientToServerLatLng {
  "live/receive-data-stream-from-mqtt-latlng": (mqttData: MqttData) => void;
}

export interface LiveDataStreamServerToClientLatLng {
  "live/broadcast-data-stream-latlng": (mqttData: MqttData) => void;
}

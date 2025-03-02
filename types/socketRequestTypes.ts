// https://socket.io/docs/v4/typescript/

export interface DataStreamServerToClientEvents {
  "static/receive-data-stream": (chunk: number[]) => void;
  "static/receive-data-stream-end": (errorMessage?: string) => void;
}

export interface DataStreamClientToServerEvents {
  "static/get-data-stream": (file_path: string) => void;
}

// https://socket.io/docs/v4/typescript/

export interface StaticDataStreamServerToClientEvents {
  "static/receive-data-stream": (chunk: number[]) => void;
  "static/receive-data-stream-end": (errorMessage?: string) => void;
}

export interface StaticDataStreamClientToServerEvents {
  "static/get-data-stream": (file_path: string) => void;
}

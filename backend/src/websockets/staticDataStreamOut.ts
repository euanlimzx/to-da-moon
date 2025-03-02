import { Server, Socket } from "socket.io";
import { Transform } from "stream";
import fs from "fs";
import { parse } from "csv-parse";
import { StaticDataStreamServer, StaticDataStreamSocket } from "./types";

export function registerStaticDataStreamOut(
  io: StaticDataStreamServer,
  socket: StaticDataStreamSocket
): void {
  socket.on("static/get-data-stream", (file_path) => {
    // will use message to tell us which file path to read the CSV from
    console.log(file_path);

    // Create a transform stream to introduce a delay
    const delayStream = new Transform({
      objectMode: true, // put it into object mode so that the server knows to read it as an array
      transform(chunk, encoding, callback) {
        setTimeout(() => {
          socket.emit("static/receive-data-stream", chunk);
          callback(); // this function is used to signal to the stream that the current chunk is done, and that it should move on to the next
        }, 50);
      },
    });

    // Read and parse the CSV file, then pipe through the delay stream
    fs.createReadStream(
      "/Users/shawnwei/Developer/Personal/to-da-moon/backend/src/data/pt_values.csv"
    )
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .pipe(delayStream)
      .on("finish", () => {
        console.log("Finished streaming data");
        socket.emit("static/receive-data-stream-end");
      })
      .on("error", (error) => {
        console.error("Error while streaming data:", error.message);
        socket.emit("static/receive-data-stream-end", error.message);
      });
  });
}

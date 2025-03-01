import { Server, Socket } from "socket.io";
import { Transform } from "stream";
import fs from "fs";
import { parse } from "csv-parse";

export function registerStaticDataStreamOut(io: Server, socket: Socket): void {
  socket.on("static/get-data-stream", (msg) => {
    // will use message to tell us which file path to read the CSV from
    console.log(msg);

    // Create a transform stream to introduce a delay
    const delayStream = new Transform({
      objectMode: true,
      transform(chunk, encoding, callback) {
        setTimeout(() => {
          socket.emit("static/receive-data-stream", chunk);
          callback();
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

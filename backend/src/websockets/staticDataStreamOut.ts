import { Server, Socket } from "socket.io";
import { Transform } from "stream";
import fs from "fs";
import path from "path"; // Import path module
import { parse } from "csv-parse";
import { StaticDataStreamServer, StaticDataStreamSocket } from "./types";

//todo @euan this file definitely needs error handling
export function registerStaticDataStreamOut(
  io: StaticDataStreamServer,
  socket: StaticDataStreamSocket
): void {
  try {
    socket.on("static/get-data-stream", (file_path) => {
      const relativeFilePath = path.join(__dirname, `../data/${file_path}.csv`);

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
      fs.createReadStream(relativeFilePath)
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
  } catch (e) {
    console.log(e);
  }
}

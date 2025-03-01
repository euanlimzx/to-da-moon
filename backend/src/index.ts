import express, { Request, Response } from "express";

const app = express();

app.get("/test", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app: express.Application = express();

app.use(bodyParser.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello, world!");
});

export default app;
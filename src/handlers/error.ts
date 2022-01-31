import { IncomingMessage, ServerResponse } from "http";

export default (req: IncomingMessage, res: ServerResponse, err: string) => {
  console.log(err);
}
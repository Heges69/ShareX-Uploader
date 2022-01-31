import { IncomingMessage, ServerResponse } from "http";

export default (req: IncomingMessage, res: ServerResponse, err: string) => {
  console.error(err);
  res.writeHead(500, {
    'Content-Type': 'text/html'
  }).end(`
    <h1>500 Internal Server Error<h1>
  `)
}
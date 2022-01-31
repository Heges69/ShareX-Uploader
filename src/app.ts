import { createServer, IncomingMessage, ServerResponse } from "http";
import { port } from "../config.json";

import get from "./handlers/get";
import post from "./handlers/post";
import error from "./handlers/error";

const server = createServer();

server.on('request', (req: IncomingMessage, res: ServerResponse) => {
  switch(req.method){
    case 'GET':
      get(req, res).catch(err => error(req, res, err))
      break;
    case 'POST':
      post(req, res).catch(err => error(req, res, err))
      break;
    default:
      res.writeHead(405, {
        'Content-Type': 'text/html'
      }).end(`
        <h1>405 Method Not Allowed<h1>
      `)
  }
})

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

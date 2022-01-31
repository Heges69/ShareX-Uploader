import { IncomingMessage, ServerResponse } from "http";
import fs from "fs";
import { join } from 'path';
import * as mimeTypes from "../util/mimeTypes.json";

export default async (req: IncomingMessage, res: ServerResponse) => {
  if(req.url?.includes('..')){
    res.writeHead(400, {
      'Content-Type': 'text/html'
    }).end(`
      <h1>400 Bad Request<h1>
    `)
    return;
  }
  const code = req.url?.slice(1);
  const path = join(__dirname, `../../../files/${code}`)
  if(!fs.existsSync(path)){
    res.writeHead(404, {
      'Content-Type': 'text/html'
    }).end(`
      <h1>404 Not Found<h1>
    `)
    return;
  }
  const contentType: string[] | undefined = mimeTypes?[code?.split('.')[1]!] : null;
  const length = fs.statSync(path).size;
  fs.createReadStream(path)
    .on('open', () => {
      if(contentType){
        res.setHeader("Content-Type", contentType);
        res.setHeader("Content-Size", length);
      }
    }).pipe(res);
}
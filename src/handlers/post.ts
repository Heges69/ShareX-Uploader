import { IncomingMessage, ServerResponse } from "http";
import * as fs from "fs";
import { join } from 'path';
import { auth, length } from "../../config.json";
import * as mimeTypes from "../util/mimeTypes.json";
import base64 from "../util/base64";

export default async (req: IncomingMessage, res: ServerResponse) => {
  if(req.headers.authorization != auth) {
    res.writeHead(401, {
      'Content-Type': 'text/html'
    }).end(`
      <h1>401 Unauthorized<h1>
    `)
    return;
  }
  if(req.url?.includes('..')){
    res.writeHead(400, {
      'Content-Type': 'text/html'
    }).end(`
      <h1>400 Bad Request<h1>
    `)
    return;
  }
  const ext = (mimeTypes?[Object.keys(mimeTypes).find(f => f.includes(req.headers["content-type"].split('/')[1]))]:null)[0];
  var name = base64(length);
  const path = join(__dirname, `../../../files/${name}.${ext}`);
  req.pipe(
    fs.createWriteStream(path)
  );
  req.on('end', () => {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify({
      filename: `${name}.${ext}`,
      ext,
      path
    }));
  })
}
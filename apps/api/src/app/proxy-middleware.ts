import { Logger, NestMiddleware } from "@nestjs/common";
import { IncomingMessage, Server, ServerResponse } from "http";
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Request } from 'express';
import { Socket } from "net";

// export class ProxyMiddleware implements NestMiddleware {
//     private proxy = createProxyMiddleware({
//         target: 'http://192.168.20.57',
//         changeOrigin: false,
//         logger: console,
//         // router: this.customRouter,
//         secure: false,
//         followRedirects: true,
//         on: {
//             proxyRes: (proxyRes, req, res) => {
//                 console.log('req cookie: ', req.headers.cookie);
//                 console.log('res cookie: ', res.getHeaders().cookie);
//                 proxyRes.on("data", (chunk: Buffer) => {
                    
//                     // res.write(Buffer.from('{"moin": "world"}'));
//                 })
//             },
//         }
//     })

//     use(req: IncomingMessage, res: ServerResponse, next: (error?: any) => void) {
//         this.proxy(req, res, next);
//     }

//     customRouter(req: Request) {
//         let target = req.query.target;
//         console.log(req.ip);
//         console.log('target: ', target);
//         if (target) {
//             req.headers.cookie = target as string;
//             console.log('cookies req: ', req.headers.cookie);
//             return `http://${target}`;
//         }
//     }
// }
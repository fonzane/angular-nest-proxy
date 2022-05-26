/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { createProxyMiddleware } from 'http-proxy-middleware';
import * as cookieParser from 'cookie-parser';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3333;
  app.enableCors();
  app.use(cookieParser());

  app.use('/', createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true,
    router: customRouter,
    logger: console,
    pathRewrite: onRewritePath,
  }))

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
}

function customRouter(req: Request) {
  let target = req.query.target;
  console.log('target: ', target);
  console.log('cookies: ', req.headers.cookie);
  let cookieTarget
  if (req.headers.cookie) {
    cookieTarget = req.headers.cookie.split("=")[1];
    cookieTarget = cookieTarget.slice(0,10);
  }
  console.log('cookieTarget: ', cookieTarget);
  if (target) {
    return `http://${target}`;
  } else if (cookieTarget) {
    return `http://${cookieTarget}`;
  } else {
    return 'http://localhost:3000';
  }
}

function onRewritePath(string: string):string {
  if (string.includes("?target")) return string.split("?")[0];
  else return string;
}

bootstrap();

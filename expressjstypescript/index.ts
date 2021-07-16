import dotenv from 'dotenv';
// initialize configuration
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
  throw dotenvResult.error;
}

import express from 'express';
import * as http from 'http';

import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import debug from 'debug';
import helmet from 'helmet';
import swaggerUi from "swagger-ui-express";

import {CommonRoutesConfig} from './src/common/common.routes.config';
import {UsersRoutes} from './src/users/users.routes.config';
import { AuthRoutes } from './src/auth/auth.routes.config';
import { TimezonesRoutes } from './src/timezones/timezones.routes.config';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.PORT || 3000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

// Body parsing Middleware
app.use(logger('dev'));

// here we are adding middleware to parse all incoming requests as JSON
app.use(express.json());

// here we are adding middleware to allow cross-origin requests
app.use(cors());
app.use(helmet());

// app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false; // when not debugging, log requests as one-liners
  if (typeof global.it === 'function') {
    loggerOptions.level = 'http'; // for non-debug test runs, squelch entirely
  }
}

// initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));

// here we are adding the UserRoutes to our array,
// after sending the Express.js application object to have the routes added to our app!
routes.push(new UsersRoutes(app));
routes.push(new AuthRoutes(app));
routes.push(new TimezonesRoutes(app));


// this is a simple route to make sure everything is working properly
const runningMessage = `Server running at http://localhost:${port}`;
app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send(runningMessage)
});


// start the express server
// export default server.listen(port, () => {
server.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Connected successfully on port ${port}`);

  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
  // our only exception to avoiding console.log(), because we
  // always want to know when the server is done starting up
  // tslint:disable-next-line:no-console
  console.log(runningMessage);
});



export default server;

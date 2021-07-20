import express from "express";
import {expressWinstonlogger, logger, weblogger} from './lib/logger';
import {Express} from "express";
import * as http from "http";
import cors from "cors";
import methodOverride from "method-override";
import morgan from "morgan";
import helmet from "helmet";
import {env} from "./env";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc, {Information, OAS3Definition, SwaggerDefinition} from "swagger-jsdoc";

import {options} from "./lib/swagger/swagger";
import {CommonRoutesConfig} from "./common/common.routes.config";
import debug from "debug";
import {
  UsersRoutes,
  TimezonesRoutes,
  AuthRoutes
} from "./modules/allRoutes.config"
import expressJSDocSwagger from "express-jsdoc-swagger";

const debugLog: debug.IDebugger = debug('app');

class App {

  // private static connectDB(): Promise<any> {
  //   return Connection;
  // }

  private readonly app: express.Application;
  private readonly server: http.Server;

  public constructor() {
    logger.info("Starting App");
    debugLog("Starting App");

    this.app = express();

    this.server = http.createServer(this.app);

  }

  public async start(): Promise<http.Server> {
    debugLog("Starting App async");
    // 1) DB connectie
    // await Server.connectDB();

    //2) configuratie setup
    this.expressConfiguration();

    //3) routes
    this.configurationRouter();

    //4) swagger setup
    this.expressSwaggerSetup();

    /**
     * GET /api/v1
     * @summary This is the summary of the endpoint
     * @return {object} 200 - success response
     */
    this.app.get('/api/v1', (req, res) => res.json({
      success: true,
    }));

    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction): void => {
      res.status(404);
      res.json({
        error: "Not found",
      });
      next();
    });
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
      if (err.name === "UnauthorizedError") {
        res.status(401).json({
          error: "Please send a valid Token...",
        });
      }
      next();
    });
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
      res.status(err.status || 500);
      res.json({
        error: err.message,
      });
      next();
    });

    //5) start

    return this.server;
  }

  public App(): express.Application {
    return this.app;
  }

  private expressConfiguration(): void {
    logger.info("Express configuration executing!");

    // Body parsing Middleware
    // this.app.use(morgan("dev"));
    this.app.use(morgan("combined"));

    this.app.use(express.urlencoded({extended: true}));

    // here we are adding middleware to parse all incoming requests as JSON
    this.app.use(express.json()); // the new modern body-parser way

    this.app.use(methodOverride());

    this.app.use(weblogger);
    this.app.use(expressWinstonlogger);

    // here we are adding middleware to allow cross-origin requests
    this.app.use(cors());
    this.app.use(helmet());
    //
    // this.app.use((req, res, next): void => {
    //   res.header("Access-Control-Allow-Origin", "*");
    //   res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");
    //   res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE,OPTIONS");
    //   next();
    // });
    //
    // this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
    //   err.status = 404;
    //   next(err);
    // });

  }

  /*
   private configurationRouter(): void {
        for (const route of ROUTER) {
            this.app.use(route.path, route.middleware, route.handler);
        }
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction): void => {
            res.status(404);
            res.json({
                error: "Not found",
            });
            next();
        });
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
            if (err.name === "UnauthorizedError") {
                res.status(401).json({
                    error: "Please send a valid Token...",
                });
            }
            next();
        });
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
            res.status(err.status || 500);
            res.json({
                error: err.message,
            });
            next();
        });
    }
   */

  private configurationRouter(): void {
    const routes: Array<CommonRoutesConfig> = [];

    // here we are adding the UserRoutes to our array,
// after sending the Express.js application object to have the routes added to our app!
    routes.push(new UsersRoutes(this.app));
    routes.push(new AuthRoutes(this.app));
    routes.push(new TimezonesRoutes(this.app));

    routes.forEach((route: CommonRoutesConfig) => {
      debugLog(`Routes configured for ${route.getName()}`);
      logger.debug(`Routes configured for ${route.getName()}`);
    });

    // this.app.use((req: express.Request, res: express.Response, next: express.NextFunction): void => {
    //   res.status(404);
    //   res.json({
    //     error: "Not found",
    //   });
    //   next();
    // });
    // this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
    //   if (err.name === "UnauthorizedError") {
    //     res.status(401).json({
    //       error: "Please send a valid Token...",
    //     });
    //   }
    //   next();
    // });
    // this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
    //   res.status(err.status || 500);
    //   res.json({
    //     error: err.message,
    //   });
    //   next();
    // });
  }
  private expressSwaggerSetup(): void {

    this.app.use(
      "/api-docs2",
      swaggerUi.serve,
      swaggerUi.setup(
        swaggerJSDoc(options), {
          explorer: true
        }
      )
    );

    // https://github.com/BRIKEV/express-jsdoc-swagger/blob/master/examples/ts-example/simple.ts
    const options2 = {
      info: {
        version: '1.0.0',
        title: 'Albums store',
        license: {
          name: 'MIT',
        },
      },
      security: {
        BasicAuth: {
          type: 'http',
          scheme: 'basic',
        },
      },
      baseDir: __dirname,
      // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
      // filesPattern: './**/*.js',
      filesPattern: ['./**/*.{ts,js}'],
      // URL where SwaggerUI will be rendered
      swaggerUIPath: '/api-docs',
      // Expose OpenAPI UI
      exposeSwaggerUI: true,
      // Expose Open API JSON Docs documentation in `apiDocsPath` path.
      // exposeApiDocs: false,
      exposeApiDocs: true,
      // Open API JSON Docs endpoint.
      apiDocsPath: '/v3/api-docs',
      // Set non-required fields as nullable by default
      notRequiredAsNullable: false,
      // You can customize your UI options.
      // you can extend swagger-ui-express config. You can checkout an example of this
      // in the `example/configuration/swaggerOptions.js`
      swaggerUiOptions: {},
    };

    expressJSDocSwagger(this.app)(options2);

  }
}

export default App;

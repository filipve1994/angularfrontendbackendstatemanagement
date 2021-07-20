import express from 'express';

import {CommonRoutesConfig} from "../../common/common.routes.config";

import TimezonesController from "./controllers/timezones.controller";

export class TimezonesRoutes extends CommonRoutesConfig {

  constructor(app: express.Application) {
    super(app, "TimezonesRoutes");
  }

  configureRoutes(): express.Application {

    /**
     * @openapi
     * paths:
     *  /:
     *    get:
     *      description: Welcome to swagger-jsdoc!
     *      responses:
     *        200:
     *          description: Returns a mysterious string.
     */
    this.app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    /**
     * @openapi
     * paths:
     *  /2:
     *    get:
     *      description: Welcome to swagger-jsdoc!
     *      responses:
     *        200:
     *          description: Returns a mysterious string.
     */
    this.app.get('/2', (req, res) => {
      res.send('Hello World!');
    });

    /**
     * @swagger
     * paths:
     *  /4:
     *    get:
     *      description: Welcome to swagger-jsdoc!
     *      responses:
     *        200:
     *          description: Returns a mysterious string.
     */
    this.app.get('/4', (req, res) => {
      res.send('Hello World!');
    });

    /**
     * @swagger
     * /5:
     *   get:
     *    description: Welcome to swagger-jsdoc!
     *    responses:
     *      200:
     *        description: Returns a mysterious string.
     */
    this.app.get('/5', (req, res) => {
      res.send('Hello World!');
    });

    /**
     * @openapi
     * paths:
     *  /timezones:
     *    get:
     *      description: Welcome to swagger-jsdoc!
     *      responses:
     *        200:
     *          description: Returns a mysterious string.
     */
    this.app
      .route(`/timezones`)
      .get(
        TimezonesController.listTimezones
        // TimezonesController.listTimezones2
      )
    ;

    /**
     * @swagger
     * /timezones2:
     *   get:
     *    description: Welcome to swagger-jsdoc!
     *    responses:
     *      200:
     *        description: Returns a mysterious string.
     */
    this.app
      .route(`/timezones2`)
      .get(
        // TimezonesController.listTimezones
        TimezonesController.listTimezones2
      )
    ;

    return this.app;
  }

}

import express from 'express';

import {CommonRoutesConfig} from "../common/common.routes.config";

import TimezonesController from "./controllers/timezones.controller";

export class TimezonesRoutes extends CommonRoutesConfig {

  constructor(app: express.Application) {
    super(app, "TimezonesRoutes");
  }

  configureRoutes(): express.Application {

    this.app
      .route(`/timezones`)
      .get(
        TimezonesController.listTimezones
      )
    ;

    return this.app;
  }

}

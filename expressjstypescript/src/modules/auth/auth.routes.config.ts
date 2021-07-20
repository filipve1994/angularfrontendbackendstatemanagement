import {CommonRoutesConfig} from "../../common/common.routes.config";
import authController from './controllers/auth.controller';
import jwtMiddleware from './middleware/jwt.middleware';
import authMiddleware from './middleware/auth.middleware';
import express from 'express';
import BodyValidationMiddleware from "../../common/middleware/body.validation.middleware";
import {body} from 'express-validator';

export class AuthRoutes extends CommonRoutesConfig {

  constructor(app: express.Application) {
    super(app, 'AuthRoutes');
  }

  configureRoutes(): express.Application {

    /**
     * @swagger
     * /auth:
     *   post:
     *     summary: Retrieve a list of JSONPlaceholder users
     *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
     */
    this.app.post(`/auth`, [
      body('email').isEmail(),
      body('password').isString(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      authMiddleware.verifyUserPassword,
      authController.createJWT,
    ]);

    /**
     * @swagger
     * /auth/refresh-token:
     *   post:
     *     summary: Retrieve a list of JSONPlaceholder users
     *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
     */
    this.app.post(`/auth/refresh-token`, [
      jwtMiddleware.validJWTNeeded,
      jwtMiddleware.verifyRefreshBodyField,
      jwtMiddleware.validRefreshNeeded,
      authController.createJWT,
    ]);
    return this.app;
  }
}

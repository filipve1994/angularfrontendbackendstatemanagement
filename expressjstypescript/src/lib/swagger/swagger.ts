import swaggerUi from "swagger-ui-express";
import swaggerJSDoc, {Information, OAS3Definition, SwaggerDefinition} from "swagger-jsdoc";
import {env} from "../../env";

export const options = {
  // Import swaggerDefinitions

  definition: {
    openapi: "3.0.3",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    host: `localhost:${env.server.port}`, // Host (optional)
    basePath: '/', // Base path (optional)
    servers: [
      {
        url: `http://localhost:${env.server.port}`,
        description: 'Development server',
      },
    ],
  },
  apis: [
    "./index.ts",
    "./src/**/*.ts",
    "./src/**/*.routes.config.ts",

  ],

};

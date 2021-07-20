import {env} from "./src/env";

import App from "./src/App";

// new App().start().then((server) => {
export default new App().start().then((server) => {
  server.listen(env.server.port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Connected successfully on port ${env.server.port}`);

    // routes.forEach((route: CommonRoutesConfig) => {
    //   debugLog(`Routes configured for ${route.getName()}`);
    // });

  });
  server.on("error", (error: any) => {
    if (error.syscall !== "listen") {
      throw error;
    }
    switch (error.code) {
      case "EACCES":
        console.error("Port requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error("Port is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  });
  server.on("listening", () => {
    console.log("Server is running in process " + process.pid + " listening on PORT " + env.server.port + "\n");
  });
});


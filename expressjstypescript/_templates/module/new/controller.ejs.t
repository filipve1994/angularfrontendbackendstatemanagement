---
to: src/modules/<%= name %>/controllers/<%= name %>.controller.ts
---

// we import express to add types to the request/response objects from our controller functions
import express from 'express';
// we import our newly created user services
import <%= name %>Service from '../services/<%= name %>.service';
// we use debug with a custom context as described in Part 1
import debug from 'debug';

const log: debug.IDebugger = debug('app:<%= name %>-controller');

class <%= name %>Controller {
  async list<%= name %>(req: express.Request, res: express.Response) {
    const <%= name %> = await <%= name %>Service.list(100, 0);
    res.status(200).send(<%= name %>);
  }

}

export default new <%= name %>Controller();

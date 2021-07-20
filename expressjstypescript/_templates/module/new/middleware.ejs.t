---
to: src/modules/<%= name %>/middleware/<%= name %>.middleware.ts
---

import express from 'express';
import userService from '../services/users.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:users-controller');

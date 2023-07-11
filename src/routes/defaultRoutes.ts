import express from 'express';

import { Router } from 'express';

export const defaultRoute = Router();

defaultRoute.get('/', (req: express.Request, res: express.Response) => {
  res.send('hello there');
});

defaultRoute.get('/users', (req: express.Request, res: express.Response) => {
  res.send('getting all users');
});

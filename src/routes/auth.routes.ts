import express from 'express';

import { Router } from 'express';

export const usersRoute = Router();

usersRoute.post(
  '/auth/signup',
  (req: express.Request, res: express.Response) => {
    res.send('hello there');
  },
);

usersRoute.post(
  '/auth/login',
  (req: express.Request, res: express.Response) => {
    res.send('hello there');
  },
);

import express from 'express';

import { Router } from 'express';

export const authRoute = Router();

authRoute.post(
  '/auth/signup',
  (req: express.Request, res: express.Response) => {
    res.send('sign up');
  },
);

authRoute.post('/auth/login', (req: express.Request, res: express.Response) => {
  res.send('login');
});

import express from 'express';

import { Router } from 'express';

export const usersRoute = Router();

usersRoute.get('/users/all', (req: express.Request, res: express.Response) => {
  res.send('get all users');
});

usersRoute.get('/users/:id', (req: express.Request, res: express.Response) => {
  res.send('get single user');
});

usersRoute.put('/users/:id', (req: express.Request, res: express.Response) => {
  res.send('edit single user');
});

usersRoute.delete(
  '/users/:id',
  (req: express.Request, res: express.Response) => {
    res.send('delete single user');
  },
);

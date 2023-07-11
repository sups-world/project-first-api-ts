import express from 'express';

import { Router } from 'express';

export const postsRoute = Router();

postsRoute.get('/posts', (req: express.Request, res: express.Response) => {
  res.send('hello there posts');
});

postsRoute.post('/posts', (req: express.Request, res: express.Response) => {
  res.send('hello there');
});

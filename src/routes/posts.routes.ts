import express from 'express';

import { Router } from 'express';

export const postsRoute = Router();

postsRoute.get('/posts', (req: express.Request, res: express.Response) => {
  res.send('view all posts');
});

postsRoute.get('/posts/:id', (req: express.Request, res: express.Response) => {
  res.send('view single post');
});

postsRoute.post('/posts', (req: express.Request, res: express.Response) => {
  res.send('create a post');
});

// put or patch
postsRoute.put('/posts/:id', (req: express.Request, res: express.Response) => {
  res.send('edit a post');
});

postsRoute.delete(
  '/posts/:id',
  (req: express.Request, res: express.Response) => {
    res.send('delette a post');
  },
);

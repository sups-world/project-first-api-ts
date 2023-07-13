import express from 'express';

export const viewAllPosts = (req: express.Request, res: express.Response) => {
  res.send('view all posts');
};

export const viewSinglePost = (req: express.Request, res: express.Response) => {
  res.send('view single post');
};

export const createPost = (req: express.Request, res: express.Response) => {
  res.send('create a post');
};

export const editPost = (req: express.Request, res: express.Response) => {
  res.send('edit a post');
};

export const deletePost = (req: express.Request, res: express.Response) => {
  res.send('delete a post');
};

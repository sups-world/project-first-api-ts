import express, { NextFunction } from 'express';
import { Post } from '../models/post.model';

import { Iposts } from '../interface/posts.interface';

export const createPost = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { title, posts, creator } = req.body as {
    title: string;
    posts: string;
    creator: string;
  };
  const createdDate = new Date();

  //creator name how?
  //  const creator =
  const post = Post.add({ title, posts, createdDate, creator });
  res.status(201).send(post);
};

export const viewAllPosts = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const allPosts = Post.view();
  if (allPosts) {
    res.send(allPosts);
  } else {
    res.send('no records found');
  }
};

export const viewSinglePost = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;
  const onePost = Post.viewOne(parseInt(id));
  if (onePost) {
    res.send(onePost);
  } else {
    res.send('no records found');
  }
};

export const editPost = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;
  const { title, post } = req.body as { title: string; post: string };

  const onePost = Post.edit(parseInt(id), { title, post });
  if (onePost) {
    res.send(onePost);
  } else {
    res.status(400).send('no such record found');
  }
};
export const deletePost = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.body;
  const onePost = Post.delete(parseInt(id));
  if (onePost) {
    res.send(onePost);
  } else {
    res.status(400).send('no record found');
  }
};

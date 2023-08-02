import express, { request, NextFunction } from 'express';
import { Post } from '../models/post.model';

export const createPost = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { title, body } = req.body as {
    title: string;
    body: string;
  };
  const createdDate = new Date();
  //after authentication change this
  //creator name how?
  //  const creator =

  // console.log('::::authorization header', req.currentID);
  //req.currentID from authToken lai creator ma assign garne..creator is creatorID

  const creator = req.crntUser.id;

  const post = Post.add({ title, body, creator, createdDate });
  res.status(201).send(post);
};

//viewAllPosts
export const viewAllPosts = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const allPosts = Post.view();
  res.send(allPosts);
};
//view post by id
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
    res.status(404).send('no records found');
  }
};

//edit post title and body
export const editPost = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;
  const { title, body } = req.body as { title: string; body: string };

  const onePost = Post.edit(parseInt(id), { title, body });
  if (onePost) {
    res.send(onePost);
  } else {
    res.status(404).send('no such record found');
  }
};

//delete post by id
export const deletePost = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;
  const onePost = Post.delete(parseInt(id));
  if (onePost) {
    res.send(onePost);
  } else {
    res.status(404).send('no record found');
  }
};

// //view only own posts
// export const ownPost = async (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction,
// ) => {
//   const allPosts = Post.view();
//   const ownPosts = allPosts.filter();
// };

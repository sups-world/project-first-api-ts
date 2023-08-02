import express, { request, NextFunction } from 'express';
import { Post } from '../models/post.model';

//function to handle authorization of post actions::only the logged in user can edit just their own post..creator(ID) must match req.crntUser ko id
const authorizeUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id: cid } = req.crntUser as { id: number }; //req.crntUser is an object only after compilation therefore we extract like this
  const { id: paramsID } = req.params as unknown as { id: number };
};

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
  //  const creator =

  // console.log('::::authorization header', req.currentID);
  //req.currentID from authToken lai creator ma assign garne..creator is creatorID
  //using declaration merging I added req.crntUser which is an object that holds userInfo..which has id

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

  // const { creator: crID } = req.crntUser as { creator: number };

  const temp = Post.viewOne(parseInt(id));
  if (temp) {
    //check if creator(id) of temp is same as the crntUser from req
    const { id: cid } = req.crntUser;
    if (cid === temp.creator) {
      //flow to edit post
      const onePost = Post.edit(parseInt(id), { title, body });
      if (onePost) {
        return res.send(onePost);
      } else {
        return res.status(404).send('no such record found');
      }
    } else {
      return res.status(401).send("sorry! you cannot edit other's post");
    }
  } else {
    return res.status(404).send('no such record exists');
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

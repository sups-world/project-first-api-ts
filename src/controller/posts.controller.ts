import express, { request, NextFunction } from 'express';
import { Post } from '../models/post.model';
import {
  createNewPost,
  getAllPosts,
  getSinglePost,
  updatePost,
} from '../services/posts.services';

//function to handle authorization of post actions::only the logged in user can edit just their own post..creator(ID) must match req.crntUser ko id
//function receives req,id as parameter
const authorizeUser = async (req: express.Request, id: string) => {
  const temp = Post.viewOne(parseInt(id));
  if (temp) {
    const { id: cid } = req.crntUser;
    // console.log('this is cid::', cid, 'this is creator::', temp.creator);
    if (cid === temp.creator) {
      return true;
    }
  } else {
    return false;
  }
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
  // const createdDate = new Date();
  //  const creator =

  // console.log('::::authorization header', req.currentID);
  //req.currentID from authToken lai creator ma assign garne..creator is creatorID
  //using declaration merging I added req.crntUser which is an object that holds userInfo..which has id

  // const creator = req.crntUser.id;

  // const post = Post.add({ title, body, creator, createdDate });
  const { id } = req.crntUser;
  const post = createNewPost(id, title, body);

  return res.status(201).send(post);
};

//viewAllPosts
export const viewAllPosts = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  // const allPosts = Post.view();
  const allPosts = await getAllPosts();
  return res.send(allPosts);
};
//view post by id
export const viewSinglePost = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;
  // const onePost = Post.viewOne(parseInt(id));
  const onePost = await getSinglePost(id);
  if (onePost !== null) {
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

  // const temp = Post.viewOne(parseInt(id));
  // if (temp) {
  //   //check if creator(id) of temp is same as the crntUser from req
  //   const { id: cid } = req.crntUser;
  //   if (cid === temp.creator) {
  //     //flow to edit post
  //     const onePost = Post.edit(parseInt(id), { title, body });
  //     if (onePost) {
  //       return res.send(onePost);
  //     } else {
  //       return res.status(404).send('no such record found');
  //     }
  //   } else {
  //     return res.status(401).send("sorry! you cannot edit other's post");
  //   }
  // } else {
  //   return res.status(404).send('no such record exists');
  // }

  const flag = await authorizeUser(req, id);
  if (flag) {
    // const onePost = Post.edit(parseInt(id), { title, body });
    const onePost = updatePost(title, body);
    //   if (onePost) {
    //     return res.send(onePost);
    //   } else {
    //     return res.status(404).send('no such record found');
    //   }
    // } else {
    //   return res.status(403).send('You can edit only your post');
  }
};

//delete post by id
export const deletePost = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;

  //using function to make sure user can only delete own post, not others

  const flag = await authorizeUser(req, id);
  if (flag) {
    const onePost = Post.delete(parseInt(id));
    if (onePost) {
      return res.send(onePost);
    } else {
      return res.status(404).send('no record found');
    }
  } else {
    return res.status(401).send('you can delete only your posts');
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

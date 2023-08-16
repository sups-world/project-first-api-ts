import express, { request, NextFunction } from 'express';
import {
  createNewPost,
  delPost,
  getAllPosts,
  getSinglePost,
  updatePost,
} from '../services/posts.services';
import { Prisma } from '@prisma/client';

//function to handle authorization of post actions::only the logged in user can edit just their own post..creator(ID) must match req.crntUser ko id
//function receives req,id as parameter
// const authorizeUser = async (req: express.Request, id: string) => {
//   const temp = Post.viewOne(parseInt(id));
//   if (temp) {
//     const { id: cid } = req.crntUser;
//     // console.log('this is cid::', cid, 'this is creator::', temp.creator);
//     if (cid === temp.creator) {
//       return true;
//     }
//   } else {
//     return false;
//   }
// };

const userAllowed = async (req: express.Request, id: string) => {
  //this is to see if the authorid and req.crntuser.id matches
  try {
    const oldPost = await getSinglePost(id);
    if (oldPost === null) return false;
    if (req.crntUser.id === oldPost.authorId) return true;
    return false;
  } catch (error) {
    console.log(error);
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
  const post = await createNewPost(id, title, body);

  return res.status(201).send(post);
};

//viewAllPosts
export const viewAllPosts = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { authorId } = req.query as unknown as { authorId: string };
  const allPosts = await getAllPosts(authorId);
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
  try {
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
    // const check = await allowUser(req, id);
    // if (!check) return res.status(401).send('your access is invalid');

    const flag = await userAllowed(req, id);
    // if (flag === undefined)
    //   return res.status(403).send('you can only edit your post');
    if (flag !== false) {
      // const onePost = Post.edit(parseInt(id), { title, body });
      const onePost = await updatePost(id, title, body);
      if (onePost) {
        return res.send(onePost);
      } else {
        return res.status(404).send('no such record found');
      }
    } else {
      return res.status(403).send('You can edit only your post');
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.code, error.message);
      //code:'P2025', 'record to update not found'
      return res.status(404).send(`The post you are looking for doesn't exist`);
    }
  }
};

//delete post by id
export const deletePost = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const { id } = req.params;
    // now to see if req.params.id matches post.authorid
    const flag = await userAllowed(req, id);

    if (flag) {
      const onePost = await delPost(id);
      if (onePost !== null) {
        return res.send(onePost);
      } else {
        return res.status(404).send('no record found');
      }
    } else {
      return res.status(401).send('you can delete only your posts');
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.code, error.message);
      //code:'P2025', 'record to update not found'
      return res.status(404).send(`The post you are looking for doesn't exist`);
    }
  }

  //using function to make sure user can only delete own post, not others
};

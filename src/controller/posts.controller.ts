import express, { NextFunction } from 'express';

// interface for posts
interface postInfo {
  id: number;
  title?: string;
  post?: string;
  createdBy?: string;
}

// dummy posts db
const dummyPostsdb: postInfo[] = [
  {
    id: 1,
    title: 'title1',
    post: 'post1',
    createdBy: 'admin',
  },
  {
    id: 2,
    title: 'title2',
    post: 'post2',
    createdBy: 'ram',
  },
  {
    id: 3,
    title: 'title3',
    post: 'post3',
    createdBy: 'shyam',
  },
];

// view all posts
export const viewAllPosts = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  // const allPosts: postInfo[] = dummyPostsdb.map(a => a);
  // :postifo[] means allPosts definitely returns postInfo[] i.e cannot be null or undefined..so TS is telling us to handle that
  const allPosts = dummyPostsdb.map(a => a);
  if (!allPosts) {
    return res.status(404).send('no posts found');
  }
  res.status(200).send(allPosts);
};

// view single post
export const viewSinglePost = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;

  const postById = dummyPostsdb.find(a => a.id.toString() === id);
  if (!postById) {
    return res.status(404).send('no such id found');
  }
  res.status(200).send(postById);
};

// TODO:::createdBy should be the logged in user
export const createPost = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id, title, post, createdBy } = req.body;
  let newPost: postInfo = {
    id: id as number,
    title: title as string,
    post: post as string,
    createdBy: createdBy as string,
  };

  dummyPostsdb.push(newPost);
  res.status(201).send(dummyPostsdb);
};

// edit post
export const editPost = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  // check db for the req.body.id
  // if post exists, then replace the existing data with new data

  const { id } = req.params;
  const { title, post } = req.body;

  let editedPost: postInfo | unknown = {
    id: id as unknown as string,
    title: title as string,
    post: post as string,
  };

  const postId = dummyPostsdb.findIndex(a => a.id.toString() === id);

  // as postInfo means postById returns postInfo always..but if .find() is undefined i.e id doesn't exist then program doesn't know what to do
  // for that we need to define what to do in that case
  // no need for :postInfo in postById because it can be undefined as well

  if (postId === -1) {
    return res.status(404).send('no such id exists');
  }
  console.log(':::::::::');
  console.log(postId);
  dummyPostsdb[postId].title = title;
  dummyPostsdb[postId].post = post;

  // replace the data in the index with id-1
  // dummyPostsdb[id - 1] = editedPost;
  console.log(dummyPostsdb);
  res.status(200).send('edited successfully');
};

//delete post by id
export const deletePost = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  //  destruct id from req.body
  // if id = dummyPostsdb.find( () => {if id ==a.id then dummyPostsdb.splice(dummydb.indexOf(a),1)})
  // params to access url data
  const { id } = req.params;
  // const postById: postInfo = dummyPostsdb.find(
  //   a => a.id.toString() === id,
  // ) as postInfo;
  // above code gives error..postbyId cannot be undefined acc to above code..but if id doesn't match it becomes undefined
  // ts is telling us to handle that condition

  const postById = dummyPostsdb.find(a => a.id.toString() === id);

  // console.log(postById, 'to be deleted');

  if (postById) {
    dummyPostsdb.splice(dummyPostsdb.indexOf(postById), 1);
    res.status(200).send(`post deleted successfully`);
  } else {
    res.status(404).send('id not found');
  }
};

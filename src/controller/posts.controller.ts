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
  try {
    const allPosts: postInfo[] = dummyPostsdb.map(a => a);
    // console.log(allPosts);
    res.send(allPosts);
  } catch (error) {
    res.send(error);
  }
};

export const viewSinglePost = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const { id } = req.params;

    // var onePost: postInfo[] = dummyPostsdb.map(a => {
    //   if (id === a.id.toString()) {
    //     findById = a;
    //     return findById;
    //   }
    //   // console.log(onePost);
    // }) as postInfo[];
    // res.send(findById);

    // console.log(dummyPostsdb.find(a => a.id.toString() === id));

    const postById: postInfo = dummyPostsdb.find(
      a => a.id.toString() === id,
    ) as postInfo;
    res.send(postById);
  } catch (error) {
    console.log(error);
    res.send(ReferenceError);
  }
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

  try {
    dummyPostsdb.push(newPost);
    res.send(dummyPostsdb);
  } catch (error) {
    console.log(error);
    res.send('some problems occured');
  }
};

// edit post
export const editPost = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  try {
    // check db for the req.body.id
    // if post exists, then replace the existing data with new data

    const { id, title, post, createdBy } = req.body;
    let editedPost: postInfo = {
      id: id as number,
      title: title as string,
      post: post as string,
      createdBy: createdBy as string,
    };

    const postById: postInfo = dummyPostsdb.find(
      a => a.id.toString() === id,
    ) as postInfo;
    if (postById) {
      postById.id = id;
      postById.title = title;
      postById.post = post;
      postById.createdBy = createdBy;
    } else {
      res.send('no such id found');
    }

    // replace the data in the index with id-1
    dummyPostsdb[id - 1] = editedPost;
    console.log(dummyPostsdb);
    res.send(dummyPostsdb);
  } catch (error) {
    console.log(error);
    res.send('some problems occured');
  }
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
  try {
    // dummyPostsdb.find(data => {
    //   if (data.id.toString() === id) {
    //     dummyPostsdb.splice(dummyPostsdb.indexOf(data), 1);
    //     console.log('post deleted successfully');
    //     res.send(dummyPostsdb);
    //   } else {
    //     console.log('post id did not match');
    //   }
    // });

    const postById: postInfo = dummyPostsdb.find(
      a => a.id.toString() === id,
    ) as postInfo;

    // console.log(postById, 'to be deleted');

    if (postById) {
      dummyPostsdb.splice(dummyPostsdb.indexOf(postById), 1);
      console.log('post deleted successfully');
      res.send(`post deleted successfully`);
    } else {
      console.log('id does not exist');
      res.end();
    }
  } catch (error) {
    console.log(error);
    res.send('error occured in delete');
  }
};

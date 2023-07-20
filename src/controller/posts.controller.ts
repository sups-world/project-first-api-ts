import express from 'express';

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
  let findById: postInfo;

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

    console.log(dummyPostsdb.find(a => a.id.toString() === id));

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

  // console.log(newPost);
  // res.send(newPost);

  dummyPostsdb.push(newPost);
  console.log(dummyPostsdb);
  res.send(dummyPostsdb);
};

export const editPost = (req: express.Request, res: express.Response) => {
  res.send('edit a post');
};

export const deletePost = (req: express.Request, res: express.Response) => {
  res.send('delete a post');
};

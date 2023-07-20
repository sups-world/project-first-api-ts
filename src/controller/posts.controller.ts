import express from 'express';

// interface for posts
interface postInfo {
  id: number;
  title?: string;
  post?: string;
}

// dummy posts db
const dummyPostsdb: postInfo[] = [
  {
    id: 1,
    title: 'title1',
    post: 'post1',
  },
  {
    id: 2,
    title: 'title2',
    post: 'post2',
  },
];

export const viewAllPosts = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const allPosts: postInfo[] = dummyPostsdb.map(a => a);
    console.log(allPosts);
    res.end();
  } catch (error) {
    res.send(error);
  }
};

export const viewSinglePost = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  // get id from params
  // compare id to dummy database
  // show related post
  try {
    const { id } = req.params;

    var onePost: postInfo[] = dummyPostsdb.map(a => {
      if (id === a.id.toString()) {
        console.log(a);
        return a;
      }
      console.log(onePost);
      // res.send('okay');
    }) as postInfo[];

    res.send(onePost[0]);
  } catch (error) {
    console.log(error);
    res.send(ReferenceError);
  }
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

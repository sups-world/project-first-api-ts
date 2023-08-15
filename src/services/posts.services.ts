import prisma from '../database/index.database';

// create a post
export const createNewPost = (title: string, body: string) => {
  console.log('createPost');
};
// getAllPosts
export const getAllPosts = async () => {
  const posts = await prisma.post.findMany();
  return posts;
};

// getSinglePost
export const getSinglePost = async (id: string) => {
  const sPost = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });

  return sPost;
};

// updatePost
export const updatePost = (title?: string, body?: string) => {
  console.log('updatePost');
};

// deletePost
export const delPost = () => {
  console.log('deletePost');
};

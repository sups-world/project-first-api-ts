import prisma from '../database/index.database';

// create a post
export const createNewPost = async (
  id: string,
  title: string,
  body: string,
) => {
  console.log('createPost');
  const newPost = await prisma.post.create({
    data: {
      title,
      body,
      authorId: id,
    },
  });
  return newPost;
};
// getAllPosts
export const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return posts;
};

// getSinglePost by id
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

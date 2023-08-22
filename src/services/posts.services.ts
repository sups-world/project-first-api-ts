import prisma from '../database/index.database';

// create a post
export const createNewPost = async (
  id: string,
  title: string,
  body: string,
) => {
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
export const getAllPosts = async (authorId?: string) => {
  const posts = await prisma.post.findMany({
    where: {
      authorId,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
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
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return sPost;
};

//get posts by some content in the body..querying by body content
export const getPostsWith = async (word: string) => {
  const result = await prisma.post.findMany({
    where: {
      body: {
        contains: word,
        mode: 'insensitive',
      },
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { authorId: 'asc' },
  });
  return result;
};

// getallPostsbyauthorid
// export const getPostsAuthor = async (id: string) => {
//   const allPosts = await prisma.post.findMany({
//     where: {
//       authorId: id,
//     },
//     orderBy: {
//       createdAt: 'desc',
//     },
//   });
//   return allPosts;
// };

// updatePost
export const updatePost = async (id: string, title?: string, body?: string) => {
  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title,
        body,
      },
    });
    return updatedPost;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// deletePost
export const delPost = async (id: string) => {
  const deletedUser = await prisma.post.delete({
    where: {
      id,
      // above is same as id:id,
    },
  });
  if (deletedUser === null || typeof deletedUser === 'undefined') return null;
  return deletedUser;
};

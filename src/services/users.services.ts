import prisma from '../database/index.database';
// import type { User } from '../../node_modules/.prisma/client';

//creating users/signup
export const userCreate = async (
  email1: string,
  password1: string,
  name1: string,
) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        email: email1,
        password: password1,
        name: name1,
      },
    });
    return newUser;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};
//show all users
export const getAllUsers = async () => {
  try {
    // TODO::::.findMany doesn't get errors so no need of try-catch
    const allUsers = await prisma.user.findMany({
      // select: {
      //   email: true,
      //   name: true,
      //   id: true,
      //   password: true,
      // },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return allUsers;
  } catch (error) {
    console.log(error);
  }
  // if (!allUsers) return res.send('No records found');
};

//show single user by id
export const getSingleUser = async (id?: string, email?: string) => {
  try {
    const oneUser = await prisma.user.findUnique({
      where: {
        id,
        email,
      },
      // select: {
      //   email: true,
      //   name: true,
      //   id: true,
      //   password: true,
      // },
    });
    return oneUser;
  } catch (error) {
    console.log(error);
  }
};

//get user by name..findMany
export const getUsersByName = async (name: string) => {
  try {
    const matchResults = await prisma.user.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      orderBy: { name: 'asc' },
    });
    return matchResults;
  } catch (error) {
    console.log(error);
  }
};
// find user by email
export const showByEmail = async (email: string) => {
  try {
    const found = await prisma.user.findUnique({
      where: {
        // email: email,
        email,
      },
    });
    return found;
  } catch (error) {
    console.log(error);
  }
};

// editing user
export const edtUser = async (idd: string, namee: string) => {
  try {
    // const { name1 } = req.body as { name1: string };

    const updatedUser = await prisma.user.update({
      where: {
        id: idd,
      },
      data: {
        name: namee,
      },
    });
    return updatedUser;
  } catch (error) {
    // console.log(error);
    // if (error instanceof Prisma.PrismaClientKnownRequestError) {
    //   // The .code property can be accessed in a type-safe manner
    //   if (error.code === 'P2025') {
    //     console.log(
    //       'There is a unique constraint violation, a new user cannot be created with this email',
    //     );
    //   }
    // }
    throw error;
  }
};

// deleting user
export const delUser = (idd: string) =>
  prisma.user.delete({
    where: {
      id: idd,
    },
  });

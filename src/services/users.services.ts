import prisma from '../database/index.database';
import type { User } from '../../node_modules/.prisma/client';
import express from 'express';

//show all users
export const showAllUsers = async () => {
  try {
    const allUsers = await prisma.user.findMany({
      // select: {
      //   email: true,
      //   name: true,
      //   id: true,
      //   password: true,
      // },
    });
    return allUsers;
  } catch (error) {
    console.log(error);
  }
  // if (!allUsers) return res.send('No records found');
};

//show single user by id
export const showSingleUser = async (idd: string) => {
  try {
    const oneUser = await prisma.user.findUnique({
      where: {
        id: idd,
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

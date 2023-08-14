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
export const edtUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const { id1 } = req.params;
    const { name1 } = req.body as { name1: string };

    const updatedUser = await prisma.user.update({
      where: {
        id: id1,
      },
      data: {
        name: name1,
      },
    });
    return res.status(200).send(updatedUser);
  } catch (error) {
    console.log(error);
    return res.end();
  }
};

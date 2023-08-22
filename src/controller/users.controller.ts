import express, { NextFunction } from 'express';
import { Prisma } from '@prisma/client';

// import { UserInfo } from '../interface/user.interface';
// import { User } from '../models/user.model';
import {
  delUser,
  edtUser,
  getAllUsers,
  getSingleUser,
  getUsersByName,
} from '../services/users.services';
import { getSinglePost } from '../services/posts.services';
import prisma from '../database/index.database';

//function to check if the current logged in user is editing/deleting their own records only
// to check req.crntuserid matches the id in params
export const allowUser = async (req: express.Request, id: string) => {
  const { id: cid } = req.crntUser as { id: string }; //req.crntUser is an object only after compilation therefore we extract like this
  const { id: paramsID } = req.params as unknown as { id: string };
  // const post = await getSinglePost(id);
  // if (post === null || typeof post === 'undefined') return false;
  if (cid === paramsID) {
    return true;
  } else {
    return false;
  }
};

// // interface
// interface userInfo {
//   id: number;
//   name: string;
//   email: string;
// }

// // dummy database
// const dummyDb3: userInfo[] = [
//   {
//     id: 1,
//     name: 'ram',
//     email: 'ram@gmail.com',
//   },
//   {
//     id: 2,
//     name: 'shyam',
//     email: 'shyam@gmail.com',
//   },
//   {
//     id: 3,
//     name: 'hari',
//     email: 'hari@gmail.com',
//   },
// ];

// // view all users
// export const viewAllUsers = async (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction,
// ) => {
//   // access db, get list of all users
//   const people = User.viewAll();
//   res.send(people);
// };

// // view single user by id
// export const viewSingleUser = async (
//   req: express.Request,
//   res: express.Response,
//   next: NextFunction,
// ) => {
//   const { id } = req.params;

//   const userIndex = dummyDb3.findIndex(a => a.id.toString() === id);

//   console.log(userIndex);
//   if (userIndex !== -1) {
//     res.status(200).send(dummyDb3[userIndex]);
//   } else {
//     res.status(404).send('user id does not exist');
//   }
// };

// // using patch to edit partially..changing name only from req.body
// // edit username
// export const editUser = async (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction,
// ) => {
//   const { id } = req.params;
//   const { name } = req.body;

//   const userIndex = dummyDb3.findIndex(a => a.id.toString() === id);
//   console.log(userIndex);

//   if (userIndex !== -1) {
//     dummyDb3[userIndex].name = name;
//     return res.status(200).send(dummyDb3[userIndex]);
//   } else {
//     return res.status(404).send('no such record found');
//   }
// };

// // deleting a user
// export const deleteUser = async (
//   req: express.Request,
//   res: express.Response,
//   next: NextFunction,
// ) => {
//   // accessdb,get id from params,compare to db,find index of that id, splice in that index
//   const { id } = req.params;
//   // console.log(id);
//   // const userById: userInfo = dummyDb3.find(
//   //   a => a.id.toString() === id,
//   // ) as userInfo;
//   // above code will always return userInfo.That means if it cannot find the user, it won't return undefined.

//   // console.log(dummyDb3.indexOf(userById));
//   const userIndex = dummyDb3.findIndex(a => a.id.toString() === id);

//   if (userIndex !== -1) {
//     // dummyDb3.splice(dummyDb3.indexOf(userIndex), 1);
//     const delItem = dummyDb3[userIndex];
//     dummyDb3.splice(userIndex, 1);
//     res.status(200).send(delItem);
//   } else {
//     res.status(404).send('user not found');
//   }
// };

//viewAllUsers
export const viewAllUsers = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  let { name } = req.query as unknown as { name: string };
  if (name) {
    const result = await getUsersByName(name);
    if (result === undefined || result.length == 0)
      return res.status(404).send('no data found');

    return res.send(result);
  }
  // const users = User.findAll();
  const users = await getAllUsers();
  if (users === null) return res.send('no data found');
  res.status(200).send(users);
};

//view by id in params
export const viewSingleUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;
  // const { name1 } = req.body as { name1: string };
  // const users = User.findById(+id); //can use Number() typecasting as well
  const users = await getSingleUser(id);

  if (users === null) {
    res.status(404).send('no such record found');
  } else {
    res.status(200).send(users);
  }
};

// editing username
export const editUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const { id } = req.params;
    // params ko id ra crntuser ko id match vaye matra edit garne authorized::done in authorize.ts

    const { name } = req.body as { name: string };
    // const users = User.edit(parseInt(id), { name });
    const flag = await allowUser(req, id);
    if (flag === false) return res.status(403).send('you are not authorized');

    const users = await edtUser(id, name);
    if (users === null) {
      return res.status(401).send('you are not authorized');
    } else {
      return res.status(200).send(users);
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // console.log(error.code, error.message);
      if (error.code === 'P2025') {
        error.message = 'The record you are looking for does not exist';
      }
      res.status(404).send(error.message);
    }
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  // const flag = await allowUser(req, parseInt(id));
  // if (flag) {
  //   const user = User.delete(parseInt(id));
  //   if (!user) {
  //     return res.status(404).send('no such user found');
  //   }
  //   return res.status(200).send(user);
  // } else {
  //   return res.status(401).send('you can edit/delete your own account only');
  // }

  try {
    const { id } = req.params;
    const flag = await allowUser(req, id);
    if (flag === false) return res.status(401).send('you are not authorized');

    const user = await delUser(id);
    if (user === null) {
      return res.status(404).send('no such data exists');
    } else {
      return res.send(user);
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // console.log(error.code, error.message);
      if (error.code === 'P2025') {
        error.message = 'The record you are looking for does not exist';
      }
      return res.status(404).send(error.message);
    }
  }
};

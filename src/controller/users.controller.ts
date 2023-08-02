import express, { NextFunction } from 'express';
import { UserInfo } from '../interface/user.interface';
import { User } from '../models/user.model';

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
export const viewAllUsers = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const users = User.findAll();
  res.status(200).send(users);
};

//view by id in params
export const viewSingleUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;
  const users = User.findById(+id); //can use Number() typecasting as well
  if (users) {
    res.status(200).send(users);
  } else {
    res.status(404).send('no such record found');
  }
};

export const editUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;
  // params ko id ra crntuser ko id match vaye matra edit garne authorized::done in authorize.ts

  const { name } = req.body as { name: string };
  const users = User.edit(parseInt(id), { name });
  res.status(200).send(users);
};

export const deleteUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;
  const user = User.delete(parseInt(id));
  res.status(200).send(user);
};

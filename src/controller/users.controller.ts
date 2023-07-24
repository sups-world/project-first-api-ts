import express, { NextFunction } from 'express';
import { userInfo } from 'os';

// interface
interface userInfo {
  id: number;
  name: string;
  email: string;
}

// dummy database
const dummyDb3: userInfo[] = [
  {
    id: 1,
    name: 'ram',
    email: 'ram@gmail.com',
  },
  {
    id: 2,
    name: 'shyam',
    email: 'shyam@gmail.com',
  },
  {
    id: 3,
    name: 'hari',
    email: 'hari@gmail.com',
  },
];

// view all users
export const viewAllUsers = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  // access db, get list of all users
  res.send(dummyDb3);
};

// view single user by id
export const viewSingleUser = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  // access db, findOne
  // const { name } = req.query;
  const { id } = req.params;

  // const userByName: userInfo = dummyDb3.find(
  //   a => a.name.toLocaleLowerCase() === name,
  // ) as userInfo;

  const userById = dummyDb3.findIndex(a => a.id.toString() === id);

  // if (userById) {
  //   console.log('user exists');
  //   res.send(userByName);
  // } else {
  //   console.log('no such user exists');
  //   res.send('No such user exists');
  // }
  console.log(userById);
  if (userById !== -1) {
    res.status(200).send(dummyDb3[userById]);
  } else {
    res.status(404).send('user not found');
  }
};

// using patch to edit partially..changing name only from req.body
// edit username
export const editUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id, name } = req.query;
  console.log(id, name);

  const userById: userInfo = dummyDb3.find(
    a => a.id.toString() === id,
  ) as userInfo;

  if (userById) {
    console.log('ready to edit name');
    const { newName } = req.body;
    const index: number = dummyDb3.indexOf(userById);
    // console.log(newName + ':::newName:::' + index + 'this is the index');
    // dummyDb3.splice(1,index,newName)
    console.log(userById);
  } else {
    return res.status(404).send('id not found');
  }

  res.status(200).send('edit a user');
};

// deleting a user
export const deleteUser = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  // accessdb, delete a user
  const { id } = req.params;
  console.log(id);
  const userById: userInfo = dummyDb3.find(
    a => a.id.toString() === id,
  ) as userInfo;

  if (userById) {
    console.log(userById);
    dummyDb3.splice(dummyDb3.indexOf(userById), 1);
    console.log('post deleted successfully');

    res.status(200).send('deleted successfully');
  } else {
    res.status(404).send('user not found');
  }
};

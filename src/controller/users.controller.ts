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
];

export const viewAllUsers = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  // access db, get list of all users
  try {
    const allUsers: userInfo[] = dummyDb3.map(a => a);
    res.send(allUsers);
  } catch (error) {
    console.log(error);
    res.send('error occured here');
  }
};

// view single user by name
export const viewSingleUser = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  // access db, findOne
  try {
    const { name } = req.query;

    const userByName: userInfo = dummyDb3.find(
      a => a.name.toLocaleLowerCase() === name,
    ) as userInfo;

    if (userByName) {
      console.log('user exists');
      res.send(userByName);
    } else {
      console.log('no such user exists');
      res.send('No such user exists');
    }
  } catch (error) {
    console.log(error);
    res.send('error viewing single user');
  }
};

// using patch to edit partially..changing name only from req.body
// edit username
export const editUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  // accessdb,edit user
  // id from params, req.body.name has username
  try {
    const { id, name } = req.query;
    console.log(id, name);

    const userById: userInfo = dummyDb3.find(
      a => a.id.toString() === id,
    ) as userInfo;

    if (userById) {
      console.log('ready to edit name');
    } else {
      console.log('sorry! no such record exists');
    }
  } catch (error) {
    console.log('error occured while editing');
    res.send('error occured while editing');
  }

  res.send('edit a user');
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  // accessdb, delete a user
  try {
    const { id } = req.params;
    console.log(id);
    const userById: userInfo = dummyDb3.find(
      a => a.id.toString() === id,
    ) as userInfo;

    if (userById) {
      console.log(userById);
      dummyDb3.splice(dummyDb3.indexOf(userById), 1);
      console.log('post deleted successfully');

      res.send('deleted successfully');
    } else {
      console.log('unable to find user');
      res.send('unable to find user');
    }
  } catch (error) {
    console.log(error);
    res.send('error occured here');
  }
};

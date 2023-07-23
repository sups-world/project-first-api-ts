import express, { NextFunction } from 'express';

// interface
interface userInfo {
  name: string;
  email: string;
}

// dummy database
const dummyDb3: userInfo[] = [
  {
    name: 'ram',
    email: 'ram@gmail.com',
  },
  {
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

export const editUser = (req: express.Request, res: express.Response) => {
  // accessdb,edit user
  res.send('edit a user');
};

export const deleteUser = (req: express.Request, res: express.Response) => {
  // accessdb, delete a user
  res.send('delete a user');
};

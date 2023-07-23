import express from 'express';

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

export const viewSingleUser = (req: express.Request, res: express.Response) => {
  // access db, findOne
  res.send('view single user');
};

export const editUser = (req: express.Request, res: express.Response) => {
  // accessdb,edit user
  res.send('edit a user');
};

export const deleteUser = (req: express.Request, res: express.Response) => {
  // accessdb, delete a user
  res.send('delete a user');
};

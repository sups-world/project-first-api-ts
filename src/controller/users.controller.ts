import express from 'express';

export const viewAllUsers = (req: express.Request, res: express.Response) => {
  // access db, get list of all users
  res.send('view all users');
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

import express from 'express';

export const viewAllUsers = (req: express.Request, res: express.Response) => {
  res.send('view all users');
};

export const viewSingleUser = (req: express.Request, res: express.Response) => {
  res.send('view single user');
};

export const editUser = (req: express.Request, res: express.Response) => {
  res.send('edit a user');
};

export const deleteUser = (req: express.Request, res: express.Response) => {
  res.send('delete a user');
};

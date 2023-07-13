import express from 'express';

export const signUp = (req: express.Request, res: express.Response) => {
  res.send('sign up user');
};

export const loginUser = (req: express.Request, res: express.Response) => {
  res.send('logged in successfully');
};

import express from 'express';
import bcrypt from 'bcrypt';

export const signUp = (req: express.Request, res: express.Response) => {
  //password hashing
  bcrypt
    .hash(req.body.name, 10)
    .then(hash => {
      // store hash in db

      console.log('pw hashed successfully', hash);
    })
    .catch(err => {
      console.log(err);
    });

  res.send('validation complete..sign up user');
};

export const loginUser = (req: express.Request, res: express.Response) => {
  res.send('validation complete..log in user');
};

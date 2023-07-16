import express from 'express';
import bcrypt, { hash } from 'bcrypt';

import { user } from '../interface/user.interface';

export const signUp = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  // init new user

  //password hashing

  // inside req.body we get name,email,password
  // console.log(
  //   '.name',
  //   req.body.name,
  //   '::req.body.email',
  //   req.body.email,
  //   'req.body.password::',
  //   req.body.password,
  // );

  const username = req.body.name;
  const userEmail = req.body.email;
  const userPw = req.body.password;

  bcrypt
    .hash(userPw, 10)
    .then(hash => {
      // store hash in db

      // registering user
      // const newUser = req.body;
      // newUser.password = hash;
      // console.log(user);
      // JWT TOKEN AND SESSIONS

      console.log('pw hashed successfully', hash);
    })
    .catch(err => {
      console.log(err);
    });

  console.log(username, userEmail, userPw);
  res.send('validation complete..sign up user');
};

export const loginUser = (req: express.Request, res: express.Response) => {
  // compare usernames and passwords
  // log in with a jwt token
  res.send('validation complete..log in user');
};

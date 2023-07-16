import express from 'express';
import bcrypt, { hash } from 'bcrypt';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

export const signUp = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  // init new user

  //password hashing

  // inside req.body we get name,email,password

  // destructuring must be with the same names as in the request
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then(hash => {
      // store hash in db

      // console.log(newUser);

      const newUser = {
        name: name,
        email: email.toLowerCase(), //sanitization
        password: hash,
        token: '',
      };

      // creating a new token
      const token = jwt.sign({ newUser }, process.env.SECRET_KEY as string, {
        expiresIn: '7 days',
      });

      console.log(token, 'this is token');

      // saving token
      newUser.token = token;

      // returning new USER
      console.log(newUser, 'new user created successfully');

      console.log('pw hashed successfully', hash);

      // response holds newUser json object which can be derived again
      res.json(newUser);
    })
    .catch(err => {
      console.log(err);
    });
};

export const loginUser = (req: express.Request, res: express.Response) => {
  // compare usernames and passwords
  // log in with a jwt token
  res.send('validation complete..log in user');
};

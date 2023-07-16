import express from 'express';
import bcrypt, { hash, compareSync } from 'bcrypt';
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

export const loginUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  // compare usernames and passwords
  // log in with a jwt token

  // dummy data
  const dummyDb = [
    {
      dbEmail: 'admin@gmail.com',
      dbPassword: 'admin',
    },
    {
      dbEmail: 'admin1@gmail.com',
      dbPassword: 'admin1',
    },
  ];

  // destructuring email,passwords from the req.body into it's components email and password
  const { email, password } = req.body;

  // find email in existing database

  const found = dummyDb.find(sample => {
    return sample.dbEmail === email;
  });
  if (found) {
    console.log('Email exists::');

    // compare password hashing of bcrypt

    //     const asyncFxn = async () => {
    //       try{
    //       const dummyHashed = await bcrypt.hash(found.dbPassword, 10);
    //       const match = await bcrypt.compare(password, dummyHashed);

    //       if (match) {
    //         console.log('match::', match);
    //       } else {
    //         console.log('incorrect password');
    //       }
    //     };
    //   } else {
    //     console.log("user doesn't exist");
    //   }
    // }catch(error){
    //   if(error){
    //     console.log(error)
    //   }
    // }
    //   // .catch(err => console.log('error of type',err))

    // Rewriting with async function
    const asyncFxn = async () => {
      const dummyHashed = await bcrypt.hash(found.dbPassword, 10);
      const match = await bcrypt.compare(password, dummyHashed);
      console.log(match);
      if (match) {
        console.log('username and password matched');
      } else {
        console.log('incorrect password');
      }
    };
    asyncFxn();

    res.send('validation complete..log in user');
  }
};

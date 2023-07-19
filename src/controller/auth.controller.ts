import express from 'express';
import bcrypt, { hash, compareSync } from 'bcrypt';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

// function for signup
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

// // function for login
// export const loginUser = (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction,
// ) => {
//   // compare usernames and passwords
//   // log in with a jwt token

//   // dummy data
//   const dummyDb = [
//     {
//       dbEmail: 'admin@gmail.com',
//       dbPassword: 'admin',
//     },
//     {
//       dbEmail: 'admin1@gmail.com',
//       dbPassword: 'admin1',
//     },
//   ];

//   // const flag for final checking
//   var flag: boolean;
//   // destructuring email,passwords from the req.body into it's components email and password
//   const { email, password } = req.body;

//   // find email in existing database

//   const found = dummyDb.find(sample => {
//     return sample.dbEmail === email;
//   });
//   if (found) {
//     console.log('Email exists::');

//     // compare password hashing of bcrypt

//     // rewriting with promise chaining
//     // const promiseFxn = new Promise((resolve, reject) => {
//     const dummyHashed1 = bcrypt.hash(found.dbPassword, 10);

//     // to change this into a promise

//     let proMatch = new Promise((resolve, reject) => {
//       const match1 = bcrypt.compare(password, dummyHashed1.toString());
//       if (match1) {
//         resolve('resolve matched usernames');
//       } else {
//         reject('reject no match');
//       }
//     });

//     proMatch
//       .then(() => {
//         console.log('username and password matched');
//         res.send('correct credentials....welcome user');
//       })
//       .catch(() => {
//         console.log('Incorrect');
//         res.send('Email and password did not match...log in unsuccessful');
//       });

//     // Rewriting with async function
//     // const asyncFxn = async () => {
//     //   const dummyHashed = await bcrypt.hash(found.dbPassword, 10);
//     //   const match = await bcrypt.compare(password, dummyHashed);

//     //   console.log(match);
//     //   if (match) {
//     //     console.log('username and password matched');
//     //     flag = true;
//     //   } else {
//     //     console.log('incorrect password');
//     //     flag = false;
//     //   }
//     // };

//     // asyncFxn().then(() => {
//     //   if (flag) {
//     //     res.send('correct credentials..welcome user');
//     //   } else {
//     //     res.send('Email and password did not match...log in unsuccessful');
//     //   }
//     // });
//     // async await is upto here

//     // res.send('validation complete..log in user');
//   } else {
//     res.status(200).send('No such email exists');
//   }
// };

// improved function for login

export const loginUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  // dummy Database
  const dummyDb = [
    {
      dbEmail: 'admin@gmail.com',
      dbPassword: 'admin',
      hashedPw: '$2b$10$I/CyKcMXAQhiCXOUViof4OEHW8YfXlXz0xHj6ESH04cMvKu/BveNC',
    },
    {
      dbEmail: 'admin1@gmail.com',
      dbPassword: 'admin1',
      hashedPw: '$2b$10$MHgskyF5yHZdk.QbPCb3AOZL405J.oTueDc7UaMwqbX5cWQCjLvDi',
    },
  ];
  // destructuring data from req.body
  const { email, password } = req.body;
  console.log('entered email', email);

  // find email in existing database..throw error if not found

  try {
    const found = dummyDb.find(data => data.dbEmail === email);
    if (found) {
      console.log('email exists:::');
      const userData = found;
      // if email found compare hashed password
      bcrypt.compare(password, userData.hashedPw, (_err, result) => {
        if (result) {
          res.send(`welcome ${userData.dbEmail}`);
        } else {
          res.send('wrong password');
        }
      });
    } else {
      throw new Error('no such email exists');
    }
  } catch (error) {
    console.log(error);
    res.send('no such email exists');
  }
};

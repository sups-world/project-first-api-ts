import express from 'express';
import bcrypt, { hash, compareSync } from 'bcrypt';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { User } from '../models/user.model';
// import { UserInfo } from '../interface/user.interface';

// interface
// interface accountInfo {
//   name: string;
//   email: string;
//   hashedPw: string;
// }

//  dummy db
// to define an array of objects
// const dummyDb2: accountInfo[] = [
//   {
//     name: 'ram',
//     email: 'ram@gmail.com',
//     hashedPw: '$2b$10$uxhDMf9MVy5l5YjC5CGQSukH6D4NOtguB99QLnZr83LFtDJCDOL2m',
//   },
//   {
//     name: 'shyam',
//     email: 'shyam@gmail.com',
//     hashedPw: '$2b$10$uxhDMf9MVy5l5YjC5CGQSukH6D4NOtguB99QLnZr83LFtDJCDOL2m', //12345
//   },
// ];

// // dummy Database

// function for signup
// export const signUp = async (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction,
// ) => {
//   // init new user
//   //password hashing
//   // inside req.body we get name,email,password
//   // destructuring must be with the same names as in the request
//   const { name, email, password } = req.body;

//   //check if email is unique
//   // TODO ::make another function called viewFirst to get emails
//   const found = User.viewAll(a => email === a.email);
//   if (found) {
//     res.status(400).send('Email already used');
//   }
//   bcrypt
//     .hash(password, 10)
//     .then(hash => {
//       const newUser1 = {
//         name: name.toLowerCase(),
//         email: email.toLowerCase(),
//         password: hash,
//       };
//       User.addUsers(name, email, password);
//       //  // creating a new token
//       //  const token = jwt.sign({ newUser }, process.env.SECRET_KEY as string, {
//       //   expiresIn: '7 days',
//       // });
//       // console.log(token, 'this is token');

//       // // return token, no need to save token..front end stores the token
//       // // saving token
//       // // newUser.token = token;

//       // // returning the token while console logging newUser
//       // console.log(newUser, 'new user created successfully');
//       // return res.status(201).json({ token: token });

//       return res.end();
//     })
//     .catch(err => {
//       console.log(err);
//       return res.status(500).send(err);
//     });
// };

// export const loginUser = async (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction,
// ) => {
//   // destructuring data from req.body
//   const { email, password } = req.body;
//   console.log('entered email', email);

//   // find email in existing database..throw error if not found

//   // try {
//   const found = dummyDb2.find(data => data.email === email);
//   if (found) {
//     console.log('email exists:::');
//     const userData: accountInfo = found;
//     // if email found compare hashed password
//     try {
//       const match = await bcrypt.compare(password, userData.hashedPw);
//       if (!match) {
//         return res.status(401).send('wrong password'); //return garda, flow is stopped here..makes program efficient
//       }
//     } catch (error) {
//       console.log(error);
//       return res.status(500).send('server error');
//     }

//     // assign a jwt token
//     // const token = jwt.encode({
//     //   username:username,
//     //   expire: Date.now() + (1000*60 *60) //1 hour

//     // },tokenSecret);
//     // callbackify(null,token);

//     try {
//       const token = jwt.sign({ userData }, process.env.SECRET_KEY as string, {
//         expiresIn: '7 days',
//       });
//       console.log('token is:::', token);
//       // return token
//       return res.status(200).json({ token: token }).end();
//       // .send(`welcome ${userData.email}`);
//       // .send(`welcome ${userData.email}`);

//       // no need to store token in db like sessions
//     } catch (error) {
//       console.log(error);
//       return res.status(500).send('unable to login due to server error');
//     }
//   }
// };

//USING MODELS
//signup module
export const signup = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { email, password, name } = req.body;

  const existingUser = User.findFirst(a => a.email === email);
  if (existingUser) {
    return res.status(400).send('email already used');
  }

  const hashedPwd = await bcrypt.hash(password, 10);
  const user = User.add({ email, name, password: hashedPwd });

  //  // creating a new token
  //       //  const token = jwt.sign({ newUser }, process.env.SECRET_KEY as string, {
  //       //   expiresIn: '7 days',
  //       // });
  //       // console.log(token, 'this is token');

  //       // // return token, no need to save token..front end stores the token
  //       // // saving token
  //       // // newUser.token = token;

  //       // // returning the token while console logging newUser
  //       // console.log(newUser, 'new user created successfully');
  //       // return res.status(201).json({ token: token });

  const accessToken = jwt.sign(
    { email: user.email, pwd: user.password },
    process.env.SECRET_KEY as string,
    {
      expiresIn: '15s',
    },
  );

  res.status(201).json({ accessToken: accessToken, user });
};

//sign in module
export const login = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { email, password } = req.body;

  const user = User.findFirst(a => a.email === email);

  if (!user) {
    return res.status(401).send('Invalid email or password');
  }

  const isPwdValid = await bcrypt.compare(password, user.password);

  if (!isPwdValid) {
    res.status(401).send('Invalid email or password');
  }

  const token = jwt.sign(
    { email: user.email, pwd: user.password },
    process.env.SECRET_KEY as string,
    {
      expiresIn: '15s',
    },
  );
};

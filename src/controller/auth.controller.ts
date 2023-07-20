import express from 'express';
import bcrypt, { hash, compareSync } from 'bcrypt';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

// interface
interface accountInfo {
  name: string;
  email: string;
  hashedPw: string;
}

// second dummy db
// to define an array of objects
const dummyDb2: accountInfo[] = [
  {
    name: 'ram',
    email: 'ram@gmail.com',
    hashedPw: '$2b$10$uxhDMf9MVy5l5YjC5CGQSukH6D4NOtguB99QLnZr83LFtDJCDOL2m',
  },
  {
    name: 'shyam',
    email: 'shyam@gmail.com',
    hashedPw: '$2b$10$uxhDMf9MVy5l5YjC5CGQSukH6D4NOtguB99QLnZr83LFtDJCDOL2m', //12345
  },
];

// // dummy Database
// const dummyDb = [
//   {
//     dbEmail: 'admin@gmail.com',
//     dbPassword: 'admin',
//     hashedPw: '$2b$10$I/CyKcMXAQhiCXOUViof4OEHW8YfXlXz0xHj6ESH04cMvKu/BveNC',
//   },
//   {
//     dbEmail: 'admin1@gmail.com',
//     dbPassword: 'admin1',
//     hashedPw: '$2b$10$MHgskyF5yHZdk.QbPCb3AOZL405J.oTueDc7UaMwqbX5cWQCjLvDi',
//   },
// ];

// function for signup
export const signUp = async (
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

      const newUser: accountInfo = {
        name: name,
        email: email.toLowerCase(), //sanitization
        hashedPw: hash,
      };

      // write to db
      dummyDb2.push(newUser);
      // res.send(dummyDb2);
      // pushing to dummy db

      // creating a new token
      const token = jwt.sign({ newUser }, process.env.SECRET_KEY as string, {
        expiresIn: '7 days',
      });
      console.log(token, 'this is token');

      // return token, no need to save token..front end stores the token
      // saving token
      // newUser.token = token;

      // returning the token while console logging newUser
      console.log(newUser, 'new user created successfully');
      return res.status(200).json({ token: token });

      // console.log('pw hashed successfully', hash);

      // response holds newUser json object which can be derived again
      res.json(newUser);
    })
    .catch(err => {
      console.log(err);
      return res.send(err);
    });
};

export const loginUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  // destructuring data from req.body
  const { email, password } = req.body;
  console.log('entered email', email);

  // find email in existing database..throw error if not found

  // try {
  const found = dummyDb2.find(data => data.email === email);
  if (found) {
    console.log('email exists:::');
    const userData: accountInfo = found;
    // if email found compare hashed password
    try {
      const match = await bcrypt.compare(password, userData.hashedPw);
      if (match) {
      } else {
        return res.status(401).send('wrong password'); //return garda, flow is stopped here..makes program efficient
      }
    } catch (error) {
      console.log(error);
      res.end();
    }

    // assign a jwt token
    // const token = jwt.encode({
    //   username:username,
    //   expire: Date.now() + (1000*60 *60) //1 hour

    // },tokenSecret);
    // callbackify(null,token);

    try {
      const token = jwt.sign({ userData }, process.env.SECRET_KEY as string, {
        expiresIn: '7 days',
      });
      console.log('token is:::', token);
      // return token
      return res.status(200).json({ token: token }).end();
      // .send(`welcome ${userData.email}`);
      // .send(`welcome ${userData.email}`);

      // no need to store token in db like sessions
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  }
};

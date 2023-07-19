import express from 'express';
import bcrypt, { hash, compareSync } from 'bcrypt';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

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
      token: '',
    },
    {
      dbEmail: 'admin1@gmail.com',
      dbPassword: 'admin1',
      hashedPw: '$2b$10$MHgskyF5yHZdk.QbPCb3AOZL405J.oTueDc7UaMwqbX5cWQCjLvDi',
      token: '',
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
      // bcrypt.compare(password, userData.hashedPw, (_err, result) => {
      //   if (result) {
      //     res.send(`welcome ${userData.dbEmail}`);
      //   } else {
      //     res.send('wrong password');
      //   }
      // });

      const match = await bcrypt.compare(password, userData.hashedPw);
      if (match) {
        res.send(`welcome ${userData.dbEmail}`);
      } else {
        return res.status(401).send('wrong password'); //return garda, flow is stopped here..makes program efficient
      }

      // assign a jwt token
      // const token = jwt.encode({
      //   username:username,
      //   expire: Date.now() + (1000*60 *60) //1 hour

      // },tokenSecret);
      // callbackify(null,token);

      const token = jwt.sign({ userData }, process.env.SECRET_KEY as string, {
        expiresIn: '7 days',
      });
      console.log(token);
      // return token
      // no need to store token in db like sessions
    } else {
      throw new Error('no such email exists');
    }
  } catch (error) {
    console.log(error);
    res.send('no such email exists');
  }
};

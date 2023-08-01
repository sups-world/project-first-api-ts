// import express from 'express';
// import jwt from 'jsonwebtoken';

// import { configDotenv } from 'dotenv';
// import 'dotenv/config';

// export const verifyToken = (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction,
// ) => {
//   const token =
//     req.body.token ||
//     req.query.token ||
//     req.params.token ||
//     req.headers['x-access=token'];
//   const decoded = jwt.verify(token, 'ABCDEF');
//   //   req.user = decoded;
//   return next();
// };

import express from 'express';
import jwt from 'jsonwebtoken';
import { getSystemErrorName } from 'util';
import { CustomError } from '../models/custom.error.model';

export const authenticateToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  //Bearer TOKEN
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    // return res.status(401).send('Not authorized to perform this action');
    return next(
      new CustomError('You are not authorized to perform this action', 401),
    );
  }
  // // user is the value we serialized, const user = {name:username}
  // jwt.verify(token, process.env.SECRET_KEY as string, err => {
  //   console.log(err);
  //   if (err) return res.sendStatus(401);

  //   next(); //next function example:viewAllPosts in routes
  // });

  try {
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY as string);
    // let req.decodeToken= decodedToken;
    // req.decodeToken = decodeToken ;
    console.log(decodeToken);

    return next();
  } catch (error) {
    // return res.status(401).send('unauthorized access');
    console.log(error);
    next(new CustomError('token expired', 401));
  }
  // return next();
};

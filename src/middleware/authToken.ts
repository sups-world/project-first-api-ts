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

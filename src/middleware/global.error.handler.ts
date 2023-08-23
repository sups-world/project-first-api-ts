// interface StatusError extends Error {
//   status?: number;
// }
// import express from 'express';

// export const globalError = async (
//   error: StatusError,
//   req: express.Request,
//   res: express.Response,
// ) => {
//   console.log(error.message);
//   if (error.status == 404) {
//     res.status(404).send('NOT FOUND !!!');
//   } else {
//     res.status(error['status'] || 500);
//     res.json({ error: error.message });
//     res.end();
//   }
// };

// // 404 handling
// // const error = new Error(`${req.method} AND ${req.originalUrl} NOT FOUND`) as StatusError;
// // error['status']= 404;
// // next(error);
import express from 'express';

export interface errorWithStatus extends Error {
  status?: number;
}

export const globalError = (
  err: errorWithStatus,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  console.log(err, 'this is the error');
  return res.status(err.status || 500).send({ message: err.message });
};

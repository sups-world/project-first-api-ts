import { NextFunction, Request, Response } from 'express';
import { MyError } from '../models/myError.model';

export const myErrorHandler = async (
  err: MyError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('this is err.statck', err.stack);
  err.status = err.status || '500';
  err.message = err.message || 'We have run into an unknown error';

  return res.status(parseInt(err.status)).json({
    error: {
      message: err.message,
      status: err.status,
    },
  });
};

// const error = new MyError('custom error message','400');
// next(error);

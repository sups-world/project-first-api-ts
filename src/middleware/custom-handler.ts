import express from 'express';
import { CustomError } from '../models/custom.error.model';

export const handleError = async (
  err: TypeError | CustomError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  console.log('this is the error', err);
  if (err instanceof CustomError) {
    console.log('in custom Error');
    res.status(err.status).send(err.message);
  } else {
    console.log('in other error');
    console.log(err);
    res.status((err as CustomError).status);
    res.send(err.message + ' ::::::::');
    res.end();
  }
};

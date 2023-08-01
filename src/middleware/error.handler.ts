import express, { NextFunction } from 'express';
import { CustomError, BaseError } from '../models/custom.error.model';
/**
 * Custom error handler to standardize error objects returned to
 * the client
 *
 * @param err Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */

function handleError(
  err: TypeError | CustomError,
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) {
  let customEror = err;

  if (err instanceof CustomError) {
    customEror = new CustomError('we are having some troubles');

    // we are not using the next function to prvent from triggering
    // the default error-handler. However, make sure you are sending a
    // response to client to prevent memory leaks in case you decide to
    // NOT use, like in this example, the NextFunction .i.e., next(new Error())
    return res.status((customEror as CustomError).status).send(customEror);
  } else if (err instanceof BaseError) {
    return res.status(err.status).json({
      status: err.status < 500 && err.status >= 400 ? 'fail' : 'error',
      message: err.message,
    });
  }
}
export default handleError;

import express from 'express';
import { body, validationResult } from 'express-validator';

// array ma validation rules rakhne function that returns the array of body.req

export const userValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('name cannot be empty'),
    body('email').isEmail().withMessage('this is not a valid email'),
    body('password')
      .isLength({ min: 5 })
      .withMessage('must be 5 characters or more'),
  ];
};

export const validate = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const ermsg = validationResult(req);
  // error xina vane go to next flow
  if (ermsg.isEmpty()) {
    return next();
  }

  const extractedErrors: any = [];

  ermsg
    .array()
    .map((err: any) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    ermsg: extractedErrors,
  });
};

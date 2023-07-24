import express from 'express';
import { body, validationResult } from 'express-validator';

// the array holds validation check for each body(req)

export const userValidationRules = [
  body('name')
    .isString()
    .trim()
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage('name cannot be empty'),
  body('email').trim().isEmail().withMessage('this is not a valid email'),
  body('password')
    .isLength({ min: 5, max: 12 })
    .withMessage(
      'must be 5 characters or more..must not be more than 12 characters',
    ),
];

// login validation
export const loginValidationRules = [
  body('email').trim().isEmail().withMessage('this is not a valid email'),
  body('password')
    .isLength({ min: 5, max: 12 })
    .withMessage(
      'must be 5 characters or more..must not be more than 12 characters',
    ),
];

//this function extracts error from each element from body(req)
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

  return res.status(400).json({
    ermsg: extractedErrors,
  });
};

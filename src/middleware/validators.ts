import express from 'express';
import { body, validationResult } from 'express-validator';

// the array holds validation check for each body(req)..this is for previous code

export const userValidationRules = {
  name: body('name')
    .isString()
    .trim()
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage('name cannot be empty or less than 2 characters'),
  email: body('email')
    .trim()
    .isEmail()
    .withMessage('this is not a valid email'),
  password: body('password')
    .isLength({ min: 5, max: 12 })
    .withMessage(
      'password must be 5 characters or more..must not be more than 12 characters',
    ),
};

// export const nameValidationRules = body('name')
//   .isString()
//   .trim()
//   .notEmpty()
//   .isLength({ min: 2 })
//   .withMessage('name cannot be empty or less than 2 characters');

// export const emailValidationRules = body('email')
//   .trim()
//   .isEmail()
//   .withMessage('this is not a valid email');
// export const pwdValidationRules = body('password')
//   .isLength({ min: 5, max: 12 })
//   .withMessage(
//     ' password must be 5 characters or more..must not be more than 12 characters',
//   );

// export const userValidationRules = [
//   // body('name')
//   //   .isString()
//   //   .trim()
//   //   .notEmpty()
//   //   .isLength({ min: 2 })
//   //   .withMessage('name cannot be empty'),
//   nameValidationRules,
//   emailValidationRules,
//   pwdValidationRules,
// ];

// login validation
// export const loginValidationRules = [
//   body('email').trim().isEmail().withMessage('this is not a valid email'),
//   body('password')
//     .isLength({ min: 5, max: 12 })
//     .withMessage(
//       'must be 5 characters or more..must not be more than 12 characters',
//     ),
// ];

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

import express from 'express';
import { ExpressValidator } from 'express-validator';
import { body, param, validationResult } from 'express-validator';
import { getSingleUser } from '../services/users.services';
// import { Prisma } from '@prisma/client';
// import prisma from '../database/index.database';

// the array holds validation check for each body(req)..this is for previous code
//object...
//TODO:::extends garne concept

let idExistChecker = {
  id: param('id').custom(async a => {
    const ref = await getSingleUser(a);
    if (!ref) {
      throw new Error("This user doesn't exist");
    }
  }),
};
export const userValidationRules = {
  nameValidator: body('name')
    .isString()
    .trim()
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage('name cannot be empty or less than 2 characters'),
  emailValidator: body('email')
    .trim()
    .isEmail()
    .withMessage('this is not a valid email'),
  passwordValidator: body('password')
    .isLength({ min: 5, max: 12 })
    .withMessage(
      'password must be 5 characters or more..must not be more than 12 characters',
    ),
  idValidator: param('id').isString().withMessage('id should be cuid'),
};

// export const emailUniqueChecker = emailcollection.custom(async a => {
//   const ref = await getSingleUser(undefined, a);
//   if (ref) {
//     throw new Error('Email is already in use.Try another');
//   }
// });
export const isIdExist = userValidationRules.idValidator.custom(async a => {
  const ref = await getSingleUser(a);
  console.log('hello:::', ref);
  if (ref === null) {
    throw new Error("This user doesn't exist");
  }
});

export const postValidationRules = {
  title: body('title')
    .notEmpty()
    .trim()
    .isString()
    .withMessage('title cannot be empty...only string is allowed'),
  body: body('body').isString().withMessage('only string is accepted in body'),
  id: param('id').isNumeric().toInt().withMessage(' should be number'),
};

// check email is unique in database
export const emailRules = {
  // email: body('email').custom(async a => {
  //   const ref = await getSingleUser(a);
  //   if (ref) {
  //     throw new Error('Email already in use');
  //   }
  // }),
  email: body('email').custom(async a => {
    const ref = await getSingleUser(undefined, a);
    if (ref) {
      throw new Error('Email is already in use.Try another');
    }
  }),
};

//to check if id exists for users
export const idExistRules = {
  id: param('id').custom(async a => {
    const ref = await getSingleUser(a);
    if (!ref) {
      throw new Error("This user doesn't exist");
    }
  }),
};

// classes of validators so that we can use as needed

//this function extracts error from each element from body(req)
export const validate = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const ermsg = validationResult(req);
  console.log('errors::::::', ermsg);
  // error xina vane go to next flow
  if (ermsg.isEmpty()) {
    return next();
  }

  console.log(ermsg);
  const extractedErrors: any = [];

  ermsg
    .array()
    .map((err: any) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    ermsg: extractedErrors,
  });
};

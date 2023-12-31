// import express from 'express';

import { Router } from 'express';
import {
  viewAllUsers,
  viewSingleUser,
  editUser,
  deleteUser,
} from '../controller/users.controller';
import {
  userValidationRules as rules,
  validate,
  // emailUniqueChecker as isEmailUnique,
  isIdExist as isIdinDb,
} from '../middleware/validators';
import { idExistRules as idExists } from '../middleware/validators';

import { authenticateToken as authToken } from '../middleware/authToken';

// import { authorizeUser as allowUser } from '../middleware/authorize';

export const usersRoute = Router();

// usersRoute.get('/', authToken, viewAllUsers);
usersRoute.get('/', authToken, viewAllUsers);

// usersRoute.get('/:id', viewSingleUser);
usersRoute.get('/:id', isIdinDb, validate, viewSingleUser);

// usersRoute.patch(
//   '/:id',
//   authToken,
//   [rules.id, rules.name],
//   validate,
//   allowUser,
//   editUser,
// );
usersRoute.patch(
  '/:id',
  idExists.id,
  validate,
  authToken,
  [rules.idValidator, rules.nameValidator],
  validate,
  editUser,
);

// usersRoute.delete('/:id', authToken, deleteUser);
usersRoute.delete('/:id', isIdinDb, validate, authToken, deleteUser);

// code to debug
// (_, __, next) => {
//   console.log('asda');
//   next();
// },

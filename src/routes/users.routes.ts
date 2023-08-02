import express from 'express';

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
} from '../middleware/validators';

import { authenticateToken as authToken } from '../middleware/authToken';

export const usersRoute = Router();

usersRoute.get('/', authToken, viewAllUsers);

usersRoute.get('/:id', viewSingleUser);

//TODO::validate name from req.body
usersRoute.patch('/:id', [rules.id, rules.name], validate, editUser);

usersRoute.delete('/:id', authToken, deleteUser);

// code to debug
// (_, __, next) => {
//   console.log('asda');
//   next();
// },

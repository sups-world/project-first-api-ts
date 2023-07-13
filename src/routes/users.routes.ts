import express from 'express';

import { Router } from 'express';
import {
  viewAllUsers,
  viewSingleUser,
  editUser,
  deleteUser,
} from '../controller/users.controller';

export const usersRoute = Router();

usersRoute.get('/all', viewAllUsers);

usersRoute.get('/:id', viewSingleUser);

usersRoute.put('/:id', editUser);

usersRoute.delete('/:id', deleteUser);

// code to debug
// (_, __, next) => {
//   console.log('asda');
//   next();
// },

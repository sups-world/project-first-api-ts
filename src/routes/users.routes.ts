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

// using query here
usersRoute.get('/?', viewSingleUser);

usersRoute.put('/:id', editUser);

usersRoute.delete('/:id', deleteUser);

// code to debug
// (_, __, next) => {
//   console.log('asda');
//   next();
// },

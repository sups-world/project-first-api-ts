import { Router } from 'express';

import { signup, login } from '../controller/auth.controller';
import { userValidationRules, validate } from '../middleware/validators';

export const authRoute = Router();

// adding validator before signUp controller
authRoute.post(
  '/signup',
  userValidationRules.name,
  userValidationRules.email,
  userValidationRules.password,
  validate,
  signup,
);

// verify token in login
authRoute.post(
  '/login',
  userValidationRules.email,
  userValidationRules.password,
  validate,
  login,
);

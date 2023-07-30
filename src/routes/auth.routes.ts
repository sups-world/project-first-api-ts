import { Router } from 'express';

import { signup, login } from '../controller/auth.controller';
import {
  validate,
  userValidationRules as rules,
} from '../middleware/validators';

export const authRoute = Router();

// adding validator before signUp controller
authRoute.post(
  '/signup',
  [rules.name, rules.email, rules.password],
  validate,
  signup,
);

// verify token in login
authRoute.post('/login', [rules.email, rules.password], validate, login);

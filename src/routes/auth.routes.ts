import { Router } from 'express';

import { signup, login } from '../controller/auth.controller';
import {
  validate,
  userValidationRules as rules,
  emailRules as isEmailunique,
} from '../middleware/validators';

export const authRoute = Router();

// adding validator before signUp controller
authRoute.post(
  '/signup',
  [rules.nameValidator, rules.emailValidator, rules.passwordValidator],
  isEmailunique.email,
  validate,
  signup,
);

// verify token in login
authRoute.post(
  '/login',
  [rules.emailValidator, rules.passwordValidator],
  validate,
  login,
);

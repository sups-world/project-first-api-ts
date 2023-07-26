import { Router } from 'express';

import { signup, login } from '../controller/auth.controller';
import {
  loginValidationRules,
  userValidationRules,
  validate,
} from '../middleware/validators';

export const authRoute = Router();

// adding validator before signUp controller
authRoute.post('/signup', userValidationRules, validate, signup);

// verify token in login
authRoute.post('/login', loginValidationRules, validate, login);

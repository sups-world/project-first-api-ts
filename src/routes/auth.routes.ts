import { Router } from 'express';

import { signUp, loginUser } from '../controller/auth.controller';
import {
  loginValidationRules,
  userValidationRules,
  validate,
} from '../middleware/validators';

export const authRoute = Router();

// adding validator before signUp controller
authRoute.post('/signup', userValidationRules, validate, signUp);

// verify token in login
authRoute.post('/login', loginValidationRules, validate, loginUser);

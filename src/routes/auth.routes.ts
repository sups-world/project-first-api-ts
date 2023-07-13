import { Router } from 'express';

import { signUp, loginUser } from '../controller/auth.controller';
import { userValidationRules, validate } from '../validators/validators';

export const authRoute = Router();

// adding validator before signUp controller

// authRoute.post('/signup', validate, signUp);

authRoute.post('/signup', userValidationRules(), validate, signUp);

authRoute.post('/login', loginUser);

import { Router } from 'express';

import { signUp, loginUser } from '../controller/auth.controller';
import { userValidationRules, validate } from '../middleware/validators';

export const authRoute = Router();

// adding validator before signUp controller
authRoute.post('/signup', userValidationRules(), validate, signUp);

authRoute.post('/login', userValidationRules(), validate, loginUser);

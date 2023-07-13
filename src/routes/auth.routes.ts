import express from 'express';

import { Router } from 'express';

import { signUp, loginUser } from '../controller/auth.controller';

export const authRoute = Router();

authRoute.post('/signup', signUp);

authRoute.post('/login', loginUser);

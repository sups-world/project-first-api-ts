import express from 'express';
import { defaultRoute } from './defaultRoutes';
import { usersRoute } from './users.routes';
import { postsRoute } from './posts.routes';
import { authRoute } from './auth.routes';

export const routes = express.Router();

routes.use('/home', defaultRoute);
routes.use('/users', usersRoute);
routes.use('/posts', postsRoute);
routes.use('/auth', authRoute);

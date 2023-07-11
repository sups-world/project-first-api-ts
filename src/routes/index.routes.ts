import express from 'express';
import { defaultRoute } from './defaultRoutes';
import { usersRoute } from './auth.routes';
import { postsRoute } from './posts.routes';

export const routes = express.Router();

routes.use(defaultRoute);
routes.use(usersRoute);
routes.use(postsRoute);

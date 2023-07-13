import express from 'express';
import { defaultRoute } from './defaultRoutes';
import { usersRoute } from './users.routes';
import { postsRoute } from './posts.routes';
import { authRoute } from './auth.routes';

export const routes = express.Router();

routes.use(defaultRoute);
routes.use(usersRoute);
routes.use(postsRoute);
routes.use(authRoute);

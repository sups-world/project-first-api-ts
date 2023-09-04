import express from 'express';

import { Router } from 'express';
import { defaultHome } from '../controller/default.controller';

export const defaultRoute = Router();

defaultRoute.get('/', defaultHome);

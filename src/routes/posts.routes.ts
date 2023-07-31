// import express from 'express';
import {
  postValidationRules as rules,
  validate,
} from '../middleware/validators';

import { authenticateToken as tokenAuth } from '../middleware/authToken';

import { Router } from 'express';
import {
  createPost,
  deletePost,
  editPost,
  // ownPost,
  viewAllPosts,
  viewSinglePost,
} from '../controller/posts.controller';

export const postsRoute = Router();

postsRoute.get('/', tokenAuth, viewAllPosts);

postsRoute.get('/:id', viewSinglePost);

postsRoute.post('/', [rules.id, rules.title, rules.body], validate, createPost);

// put or patch::patch for changing only partial...put for completely changing or creating new
postsRoute.put('/:id', editPost);

postsRoute.delete('/:id', deletePost);

// postsRoute.get('/own', tokenAuth, ownPost);

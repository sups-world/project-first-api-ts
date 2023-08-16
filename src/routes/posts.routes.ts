// import express from 'express';
import {
  postValidationRules as rules,
  validate,
} from '../middleware/validators';

import { authenticateToken as verifyToken } from '../middleware/authToken';

import { Router } from 'express';
import {
  authorPosts,
  createPost,
  deletePost,
  editPost,
  viewAllPosts,
  viewSinglePost,
} from '../controller/posts.controller';

export const postsRoute = Router();

postsRoute.get('/', viewAllPosts);

postsRoute.get('/:id', verifyToken, viewSinglePost);

postsRoute.post(
  '/',
  verifyToken,
  [rules.title, rules.body],
  validate,
  createPost,
);

// put or patch::patch for changing only partial...put for completely changing or creating new
postsRoute.put('/:id', verifyToken, editPost);

postsRoute.delete('/:id', verifyToken, deletePost);

postsRoute.get('/author/:id', authorPosts);

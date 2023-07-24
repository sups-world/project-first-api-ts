import express from 'express';

import { Router } from 'express';
import {
  createPost,
  deletePost,
  editPost,
  viewAllPosts,
  viewSinglePost,
} from '../controller/posts.controller';

export const postsRoute = Router();

postsRoute.get('/', viewAllPosts);

postsRoute.get('/:id', viewSinglePost);

postsRoute.post('/:id', createPost);

// put or patch::patch for changing only partial...put for completely changing or creating new
postsRoute.put('/:id', editPost);

postsRoute.delete('/:id', deletePost);

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

postsRoute.get('/all', viewAllPosts);

postsRoute.get('/:id', viewSinglePost);

postsRoute.post('/new/:id', createPost);

// put or patch
postsRoute.patch('/edit/:id', editPost);

postsRoute.delete('/:id', deletePost);

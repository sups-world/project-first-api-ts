import { configDotenv } from 'dotenv';
import 'dotenv/config';

import express from 'express';

import { routes } from './routes/index.routes';

configDotenv();

const app = express();
const port = process.env.PORT;

app.use('/', routes);

app.get('/users', (req: express.Request, res: express.Response) => {
  res.send('retrieving all users');
});

app.get('/users/:id', (req: express.Request, res: express.Response) => {
  res.send('getting single user');
});

app.get('/posts', (req: express.Request, res: express.Response) => {
  res.send('getting all posts');
});

app.get('/posts/:id', (req: express.Request, res: express.Response) => {
  res.send('getting single post');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

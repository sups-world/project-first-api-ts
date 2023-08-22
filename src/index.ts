import { configDotenv } from 'dotenv';
import 'dotenv/config';

import express from 'express';

import { routes } from './routes/index.routes';
import { handleError } from './middleware/custom-handler';

// import { errorHandler } from './middleware/errorHandler';
// import handleError from './middleware/error.handler';

configDotenv();

const app = express();
const port = process.env.PORT;

app.use(express.json());
// routes
app.use('/', routes);

//404 handling
app.use((req, res, next) => {
  next({
    status: 404,
    message: 'The page you are looking for does not exist',
  });
});
// error handler at the end of use and routes
// app.use(handleError);

app.use(handleError);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

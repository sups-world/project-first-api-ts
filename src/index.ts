import { configDotenv } from 'dotenv';
import 'dotenv/config';

import express from 'express';

import { routes } from './routes/index.routes';
// import { errorHandler } from './middleware/errorHandler';
import handleError from './middleware/error.handler';

configDotenv();

const app = express();
const port = process.env.PORT;

app.use(express.json());
// routes
app.use('/', routes);

// error handler at the end of use and routes
// app.use(handleError);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

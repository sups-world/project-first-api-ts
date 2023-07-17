import { configDotenv } from 'dotenv';
import 'dotenv/config';

import express from 'express';

import { routes } from './routes/index.routes';
// import { errorHandler } from './middleware/errorHandler';

configDotenv();

const app = express();
const port = process.env.PORT;

app.use(express.json());
// routes
app.use('/', routes);

// error handler at the end of use and routes
// app.use(errorHandler);
app.listen(port, async () => {
  try {
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.log(`unable to liseten on port ${port}`);
  }
});

import { configDotenv } from 'dotenv';
import 'dotenv/config';

import express from 'express';

import { routes } from './routes/index.routes';

configDotenv();

const app = express();
const port = process.env.PORT;

app.use(express.json());
// routes
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

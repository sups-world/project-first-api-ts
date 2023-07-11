import 'dotenv/config';

import express from 'express';

const app = express();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

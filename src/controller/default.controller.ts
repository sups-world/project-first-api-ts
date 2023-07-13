import express from 'express';

export const defaultHome = (req: express.Request, res: express.Response) => {
  res.send('homepage here');
};

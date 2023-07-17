import express from 'express';

export const defaultHome = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  res.send('homepage here');
  // throw new Error('this is an error');
  // const b = await
  // try {
  //   const user: number = 2;
  //   if (user <= 5) {
  //     // const er = new Error('user not found');
  //     // er.statusCode = 400;
  //     // res.status(401).send('this is a sample error');
  //     throw new Error({status:});
  //     res.status(401);
  //   }
  //   if (user > 5) {
  //     throw new Error('greater than 5');
  //     res.status(400);
  //   }
  // } catch (err) {
  //   next(err);
  // }
};

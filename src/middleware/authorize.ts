import express from 'express';
export const authorizeUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id: cid } = req.crntUser as { id: number }; //req.crntUser is an object only after compilation therefore we extract like this
  const { id: paramsID } = req.params as unknown as { id: number };
  //   console.log('this is params id', paramsID, 'this is current id', cid);
  if (cid === paramsID) {
    return next();
  } else {
    return res.status(401).send('You are not authorized');
  }
};
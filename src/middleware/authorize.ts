//this function will not be used. I integrated this to the user.controller itself

// req. header ma hune id ra params ma pathaune id matra same xa ki xina herxa

import express from 'express';
export const authorizeUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id: cid } = req.crntUser as { id: string }; //req.crntUser is an object only after compilation therefore we extract like this
  const { id: paramsID } = req.params as unknown as { id: string };
  console.log('this is params id', paramsID, 'this is current id', cid);
  console.log('this is the value:::', cid === paramsID);
  if (cid == paramsID) {
    return next();
  } else {
    return res.status(401).send('You are not authorized');
  }
};

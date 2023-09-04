// import express from 'express';
// // class StatusCode extends Error {
// //     status: number|undefined;
// // }

// export const errorHandler = (
//   err: express.ErrorRequestHandler,
//   req: express.Request,
//   res: express.Response,
// ) => {
//   console.log('Middleware error handling');
//   // const errStatus = err.statusCode || 500;
//   // const errMsg = err.message || 'something went wrong';
//   // res.status(errStatus).json({
//   //     success: false,
//   //     status: errStatus,
//   //     message:errMsg,
//   // stack: process.env.NODE_ENV ==='development' ? err.stack: {}
//   // })

//   const statusCode = err.status ?? 500;
//   const message = err.message || 'something went wrong'
//   return res.status(statusCode).json({
//     error:statusCode,
//     message:err.message
//   })
// };

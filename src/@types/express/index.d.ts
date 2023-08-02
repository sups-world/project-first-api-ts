// import { UserInfo } from '../../interface/user.interface';

// declare global {
//   namespace Express {
//     interface Request {
//       currentUserID: UserInfo;
//     }
//   }
// }

import express from 'express';

declare global {
  namespace Express {
    interface Request {
      //   currentID: string | any;
      crntUser: UserInfo;
    }
  }
}

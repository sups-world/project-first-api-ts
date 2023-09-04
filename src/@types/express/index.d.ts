import { UserInfo } from '../../interface/user.interface';

// declare global {
//   namespace Express {
//     interface Request {
//       currentUserID: UserInfo;
//     }
//   }
// }

import express from 'express';
import { IUser } from '../../interface/user.interface';

declare global {
  namespace Express {
    interface Request {
      //   currentID: string | any;
      crntUser: IUser;
      crntUserId: string;
    }
  }
}

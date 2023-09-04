export interface UserInfo {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  email: string;
  name: string | null;
  password: string;
}

// use {} to import this as it is not a default export

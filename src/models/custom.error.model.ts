export class BaseError extends Error {
  status: number;
  // isOperational: boolean | undefined;
  additionalInfo!: any;

  constructor(message: string, status: number, additionalInfo: any = {}) {
    super(message);
    this.status = status;
    // this.isOperational = this.isOperational;
    this.additionalInfo = additionalInfo;
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}

export class CustomError extends Error {
  message!: string;
  status!: number;
  additionalInfo!: any;

  constructor(message: string, status: number = 500, additionalInfo: any = {}) {
    super(message);
    this.status = status;
    this.additionalInfo = additionalInfo;
  }
}

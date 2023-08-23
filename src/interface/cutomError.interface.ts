export class CustomError extends Error {
  message: string;
  status: number;

  constructor(message: string, status: number = 500) {
    super(message);
    this.message = message;
    this.status = status;
  }
}

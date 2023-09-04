export class MyError extends Error {
  status: string;

  constructor(message: string, status: string) {
    super(message);
    this.name = 'MyError';
    this.status = status;
  }
}

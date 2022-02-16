class AppError extends Error {
  statusCode = 500;
  constructor(message: string, statusCode: number) {
    super(message);
    this.message = `${statusCode} error: ${message}`;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;

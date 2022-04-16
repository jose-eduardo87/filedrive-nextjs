export type ErrorType = Error & {
  statusCode: number;
  isOperational: boolean;
  code?: string;
};

class ErrorClass extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorClass;

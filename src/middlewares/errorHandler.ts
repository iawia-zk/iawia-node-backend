import { Request, Response, NextFunction } from 'express';
import { BaseError, INTERNAL_SERVER_ERROR } from '../utils/errorCodes';

export class AppError extends Error {
  statusCode: number;
  errorCode: string;
  message: string;

  constructor(error: BaseError, message?: string) {
    super(error.message);
    this.statusCode = error.statusCode;
    this.errorCode = error.code;
    this.message = message || error.message;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      errorCode: err.errorCode,
    });
  }

  console.error('Error:', err);

  return res.status(INTERNAL_SERVER_ERROR.statusCode).json({
    status: 'error',
    message: INTERNAL_SERVER_ERROR.message,
    errorCode: INTERNAL_SERVER_ERROR.code,
  });
};

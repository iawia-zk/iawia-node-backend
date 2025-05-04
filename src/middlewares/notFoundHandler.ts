import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';
import { NOT_FOUND_ERROR } from '../utils/errorCodes';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(NOT_FOUND_ERROR, `Route ${req.originalUrl} not found`));
};

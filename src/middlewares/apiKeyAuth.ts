import { Request, Response, NextFunction } from 'express';
import { UNAUTHORIZED_ERROR } from '../utils/errorCodes';
import { AppError } from './errorHandler';

export const verifyApiKey = (req: Request, res: Response, next: NextFunction) => {
  try {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
      return next(new AppError(UNAUTHORIZED_ERROR, 'No API key provided'));
    }

    if (apiKey !== process.env.X_API_KEY) {
      console.log('apiKey', apiKey);
      console.log('process.env.X_API_KEY', process.env.X_API_KEY);
      return next(new AppError(UNAUTHORIZED_ERROR, 'Invalid API key'));
    }

    next();
  } catch (error) {
    next(new AppError(UNAUTHORIZED_ERROR, 'API key validation failed'));
  }
};

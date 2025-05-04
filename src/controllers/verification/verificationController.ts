import { NextFunction, Request } from 'express';
import { CustomResponse, EmptyParams, EmptyReqBody } from '../controllers.types';
import { PostVerificationReqBody } from './verificationController.types';

export const postVerificationController = async (
  req: Request<EmptyParams, EmptyReqBody, PostVerificationReqBody>,
  res: CustomResponse<any>,
  next: NextFunction
) => {
  try {
    // ...
  } catch (error) {
    next(error);
  }
};

import { AppError } from '../../middlewares/errorHandler';
import { VALIDATION_ERROR } from '../../utils/errorCodes';
import { PostVerificationReqBody } from './verificationController.types';

export function validatePostVerificationRequestBody(body: PostVerificationReqBody) {
  const { runnables, passportData } = body;

  if (!runnables || !passportData) {
    throw new AppError(VALIDATION_ERROR, 'Invalid request body');
  }

  return body;
}

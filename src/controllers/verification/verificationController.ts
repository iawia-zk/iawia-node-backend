import { NextFunction, Request } from 'express';
import { CustomResponse, EmptyParams, EmptyReqBody } from '../controllers.types';
import { PostVerificationReqBody } from './verificationController.types';
import { executeRunnableHash } from '../../services/runnableHashService';
import { validatePostVerificationRequestBody } from './verificationController.validators';
import { CryptoService } from '../../services/crypto/cryptoService';

export const postVerificationController = async (
  req: Request<EmptyParams, EmptyReqBody, PostVerificationReqBody>,
  res: CustomResponse<any>,
  next: NextFunction
) => {
  try {
    validatePostVerificationRequestBody(req.body);

    const runnables = req.body.runnables;
    // TODO: get this in encrypted format
    const passportData = req.body.passportData;

    const cryptoService = new CryptoService();
    const decryptedData = await cryptoService.decryptData(passportData);

    console.log(decryptedData);

    const result = runnables.map((runnable) => {
      return executeRunnableHash(runnable, decryptedData);
    });

    res.json({ result });
  } catch (error) {
    next(error);
  }
};

import express from 'express';
import { verifyApiKey } from '../middlewares/apiKeyAuth';
import { postVerificationController } from '../controllers/verification/verificationController';

const router = express.Router();

router.post('/v1', verifyApiKey, postVerificationController);

export default router;

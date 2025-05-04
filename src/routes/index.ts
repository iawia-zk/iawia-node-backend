import { Router } from 'express';
import verificationRoutes from './verificationRoutes';
import { executeRunnableHash } from '../services/runnableHashService';
const router = Router();

router.get('/health', (req, res) => {
  const mockFunction = 'ZnVuY3Rpb24gdmVyaWZ5KHZhbHVlKSB7CiAgcmV0dXJuIHRydWU7Cn0K';

  const result = executeRunnableHash(mockFunction, { age: '1990-01-01' });

  res.json({ status: 'ok', timestamp: new Date().toISOString(), result });
});

router.use('/verification', verificationRoutes);

export const apiRoutes = router;

import { Router } from 'express';
import configRoutes from './verificationRoutes';
const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.use('/config', configRoutes);

export const apiRoutes = router;

import { Router } from 'express';
import { crackHash } from '../controllers/crack-hash.controller';
import { timeoutMiddleware } from '../middlewares/timeout.middleware';

const router = Router();

router.use(timeoutMiddleware);
router.post('/crack-hash', crackHash);

export default router;

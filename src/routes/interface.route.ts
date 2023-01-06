import express, { Router } from 'express';
import { safeJoin } from '../helpers';

const router = Router();

router.use(express.static(safeJoin('./src/interface/', '')));
router.get('/', (_req, res) => {
  res.sendFile(safeJoin('./src/interface/', 'index.html'));
});

export default router;

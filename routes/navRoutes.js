import { Router } from 'express';
import { logoutUser } from '../controllers/navController.js';

const router = Router();

router.post('/logout', logoutUser);

// router.get('/search')

export default router;
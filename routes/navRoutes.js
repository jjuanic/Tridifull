import { Router } from 'express';
import { logoutUser, profilePage } from '../controllers/navController.js';
import verificarToken from '../middlewares/verificarJWT.js';

const router = Router();

router.post('/logout', logoutUser);
router.post('/profile',  verificarToken, profilePage);
router.get('/profile',  verificarToken, profilePage);

// router.get('/search')

export default router;
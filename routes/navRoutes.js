import { Router } from 'express';
import { logoutUser, profilePage, searchPage,faqPages, historyPage } from '../controllers/navController.js';
import verificarToken from '../middlewares/verificarJWT.js';

const router = Router();

router.post('/logout', logoutUser);
router.post('/profile',  verificarToken, profilePage);
router.get('/profile',  verificarToken, profilePage);
router.post('/search', searchPage);
router.get('/search', searchPage);
router.get('/faq',faqPages);
router.get('/history',historyPage);

// router.get('/search')

export default router;
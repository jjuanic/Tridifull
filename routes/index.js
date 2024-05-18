import express from 'express';
import { indexPage,likeAlbum } from '../controllers/indexController.js';
import verificarToken from '../middlewares/verificarJWT.js';


var router = express.Router();

/* GET home page. */
router.get('/',indexPage);
// router.get('/logout', logoutUser);
router.post('/likeAlbum', verificarToken, likeAlbum);

export default router

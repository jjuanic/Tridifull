import express from 'express';
import { indexPage,likeAlbum } from '../controllers/indexController.js';


var router = express.Router();

/* GET home page. */
router.get('/',indexPage);
router.post('/',likeAlbum);

export default router

const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const authPost = require('../middleware/authPost')
const multer = require('../middleware/multer-config')

// Récupération de tous les posts 
router.get('/', auth, postCtrl.getAllPosts);

// Récupération d'un post 
router.get('/:id', auth, postCtrl.getOnePost);

// Création d'un post 
router.post('/create' ,auth, multer,  postCtrl.createOnePost);

// Modification d'un post 
router.post('/:id' ,auth, multer, authPost, postCtrl.modifyOnePost);

// Suppression d'un post 
router.delete('/:id' , auth, authPost,  postCtrl.deleteOnePost);


module.exports = router;
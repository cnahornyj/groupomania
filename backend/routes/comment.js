const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const authComm = require('../middleware/authComm')
const auth = require('../middleware/auth');

// Création d'un post 
router.post('/create/:id', auth, commentCtrl.createOneComment);

// Récupération les commentaires d'un post
router.get('/:id', auth, commentCtrl.getCommentsfromPost);

// Suppression d'un commentaire 
router.delete('/:id', auth, authComm, commentCtrl.deleteOneComment);

// Modification d'un commentaire
router.post('/:id', auth, authComm, commentCtrl.modifyOneComment);

module.exports = router;
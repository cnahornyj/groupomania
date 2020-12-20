const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/like');
const auth = require('../middleware/auth');

// Modération des likes
router.put('/:id', auth, likeCtrl.moderateLikes)

// Récupération des likes liés au post
router.get('/:id', auth, likeCtrl.getLikesfromPost);



module.exports = router;
/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const postCtrl=require('../controllers/post');
//const pour le token
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

//requete get pour afin de recuperer les posts dans la base de donnee
router.get('/', multer, postCtrl.getAllPosts);

//requete pour poster un nouvel objet avec multer pour les images
router.post('/post', multer, postCtrl.createPost); 

//requete pour recuperer les posts d'un utilisateur en particulier
router.get('/:userId', multer, postCtrl.findAllPostUser);

//requete pour supprimer un objet existant
router.delete('/:id', multer, postCtrl.deletePost );
//requete pour recuperer tous les commentaire de chaque post



module.exports = router;
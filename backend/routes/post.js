/*** Importer express pour acceder au router ***/
const express = require("express");
/*** Appeler le router avec la méthode express/ ***/
const router = express.Router();
/*** Récupération de la configuration d'authentification de JsonWebToken ***/
const auth = require("../middleware/auth");
const authAdmin = require('../middleware/authAdmin')

/*** importer le controllers post pour associer les fonctions aux routes***/
const postCtrl = require("../controllers/posts");
/*** importer multer pour la gestion des images ***/
const multer = require('../middleware/multer-config');

/*** Requête POST pour poster un nouveau post***/
router.post("/posts", auth, multer, postCtrl.createPost);

/*** Requête DELETE pour supprimer un post ***/
router.delete("/posts/:id", auth, multer, postCtrl.deletePost);

/*** Requête GET pour afficher tous les posts ***/
router.get("/posts", auth, multer, postCtrl.getAllPosts);

/***  Requête GET pour afficher tous les posts d'un Utilisateur ***/
router.get("/posts/:userId", auth, multer, postCtrl.findAllPostUser);

/*** Requête DELETE de l'administrateur pour supprimer un post  ***/
router.delete('/admin/delete/posts/:id', authAdmin, multer, postCtrl.adminDeletePost);

/*** Exporter le router ***/
module.exports = router;
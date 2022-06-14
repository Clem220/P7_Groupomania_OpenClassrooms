/*** Import express pour acceder au router ***/
const express = require('express');
/*** Appeler le router avec la méthode express ***/
const router = express.Router();

/*** Récupération de la configuration d'authentification de JsonWebToken ***/
const auth = require('../middleware/auth');

/*** Importer le controllers comment pour associer les fonctions aux routes***/
const commentCtrl = require('../controllers/comments');

/*** Requête POST pour créer un nouveau commentaire ***/
router.post('/comments', commentCtrl.createComment);

/*** Requête GET pour récupérer les commentaires ***/
router.get('/comments', auth, commentCtrl.getComments);

/*** Requête DELETE pour supprimer un commentaire posté ***/
router.delete('/comments/:id', auth, commentCtrl.deleteComment);






/*** exporter le router ***/
module.exports = router;
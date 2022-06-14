/*** Importer express pour acceder au router ***/
const express = require('express');
/*** Appeler le router avec la méthode express ***/
const router = express.Router();
/*** Récupération de la configuration d'authentification de JsonWebToken ***/
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin')
/*** Importer multer pour la gestion des images ***/
const multer = require('../middleware/multer-config');
/*** Importer le controllers users pour associer les fonctions aux routes ***/
const userCtrl = require('../controllers/users');

/*** Créer un nouvel utilisateur ***/
router.post('/auth/signup', userCtrl.signup);
/*** Connection d'un utilisateur ***/
router.post('/auth/login', userCtrl.login);

/*** Récupérer le profile ***/
router.get('/users/:id', auth, multer, userCtrl.getProfile);
/*** Récupérer les profiles ***/
router.get('/users', auth, userCtrl.getAllProfiles);
/*** Modifier le profile ***/
router.put('/users/:id', auth, multer, userCtrl.updateProfile);

/*** Supprimer le profile ***/
router.delete('/users/:id', auth, multer, userCtrl.deleteProfile);

/*** Supprimer le profile d'un utilisateur quand on est Admin ***/
router.delete('/admin/delete/:id', authAdmin, multer, userCtrl.adminDeleteProfileUser);

/*** exporter le router ***/
module.exports = router;
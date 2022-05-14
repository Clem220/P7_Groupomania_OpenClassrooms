const express = require('express');
const routeur = express.Router();
const auth = require('../middlewares/auth');

const userCtrl = require('../controllers/user');

routeur.post('/signup', userCtrl.signup);
routeur.post('/login', userCtrl.login);
routeur.delete('/:id', auth, userCtrl.deleteUser);

module.exports = routeur;
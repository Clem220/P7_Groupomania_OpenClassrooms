/*** importer le package jsonwebtoken pour vérifier les tokens ***/
const jwt = require('jsonwebtoken');
/*** Définir les variables d'environnement pour masquer les informations de connexion à la base de données  ***/
require('dotenv').config();
/*** middleware authenttification de l'administrateur ***/
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
        const isAdmin = decodedToken.isAdmin;
        if (isAdmin !== true) {
            throw 'interdit aux non admins';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error
        });
    }
};
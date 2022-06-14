/***  enregistrer les fichiers images en important multer qui est un package qui permet de gérer les fichiers entrants dans les requêtes HTTP ***/
const multer = require('multer');
/*** Création d'un dictionnaire des types MIME pour définir le format des images ***/
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    "image/webp": "webp",
};
/*** création d'un objet de configuration pour indique à multer où enregistrer les fichiers images et les renommer ***/
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images'); 
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});
/*** Export de la fonction */
module.exports = multer({
    storage: storage
}).single('image');
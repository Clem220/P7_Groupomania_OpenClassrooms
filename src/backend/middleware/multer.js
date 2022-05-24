const multer = require('multer');
/*** Création d'un dictionnaire des types MIME pour définir le format des images ***/

/*** création d'un objet de configuration pour indique à multer où enregistrer les fichiers images et les renommer ***/
const storage = multer.diskStorage({
    /*** la fonction destination indique à multer d'enregistrer les fichiers dans le dossier images ***/
    destination: (req, file, callback) => {
        callback(null, 'image'); /*** null c'est à dire qu'il n'y a pas d'erreur à ce niveau là ***/
    },
    /*** on indique à multer le nom du fichier à utiliser ***/
    filename: (req, file, callback) => {
        /*** on génére un nouveau nom pour le fichier en utilisant le nom d'origine, 
         * on supprime les espaces s'ils existent avec split et on remplace les espaces par des inderscores avec join  ***/
        const name = file.originalname.split(' ').join('_');
        
        /*** générer le nom de fichier: on appelle le callback avec l'argument null pour indiquer qu'il n y'a pas d'erreur ***/
        callback(null, name );
    }
});
/*** on exporte multer, on lui passe l'objet storage,
 *  on appelle la méthode single pour indiquer que c'est un fichier uniquement d'image ***/
module.exports = multer({
    storage: storage
}).single('image');
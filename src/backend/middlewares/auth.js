const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = (req, res, next) => {
  try {
    // on prend le token de la requette
    const token = req.header.authorization.split("")[1];
    // on le decode grace au TOKEN present dans .env
    const decodeToken = jwt.verify(token, process.env.TOKEN);
    // on extrait l'user.id du TOKEN
    const userId = decodeToken.userId;
    //on le compare avec celui de la requette
    if (req.body.userId && req.body.userId != userId) {
      throw "Invalid user ID";
    } else {
      next(); // si il est juste, on passe au middleware suivant
    }
  } catch {
    res.status(401).json({
      error: new Error("invalid request !"),
    });
  }
};

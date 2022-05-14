const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../database_connect");
require("dotenv").config();

//inscription

exports.signup = (req, res, next) => {
  //cryptage email
  const buffer = Buffer.from(req.body.email);
  const cryptedEmail = buffer.toString("base64");
  // verfication dispo email

  db.query(
    `SELECT * FROM users WHERE email = '${cryptedEmail}'`,
    (err, results, rows) => {
      // Si email déjà utilisé
      if (results.length > 0) {
        res.status(401).json({
          message: "Email non disponible",
        });
        // Si email dispo
      } else {
        // Cryptage du mdp
        bcrypt
          .hash(req.body.password, 10)
          .then((cryptedPassword) => {
            //ajout à la BDD
            db.query(
              `INSERT INTO users VALUES (NULL, '${req.body.nom}', '${req.body.prenom}', '${cryptedPassword}', '${cryptedEmail}', 0)`,
              (err, results, fields) => {
                if (err) {
                  console.log(err);
                  return res.status(400).json("erreur");
                }
                return res.status(201).json({
                  message: "Votre compte à été crée !",
                });
              }
            );
          })
          .catch((error) =>
            res.status(500).json({
              error,
            })
          );
      }
    }
  );
};

// Connexion

exports.login = (req, res, next) => {
  const buffer = Buffer.from(req.body.email);
  const cryptedEmail = buffer.toString("base64");
  // Rechercher de l'utilisateur dans la BDD
  db.query(
    `SELECT * FROM users WHERE email = '${cryptedEmail}'`,
    (err, results, rows) => {
      // Si utilisateur trouvé :
      if (results.length > 0) {
        // Verification du MDP
        bcrypt.compare(req.body.password, results[0].password).then((valid) => {
          // Si MDP invalide erreur
          if (!valid) {
            res.status(401).json({
              message: "Mot de passe incorrect.",
            });
            // Si MDP valide, création d'un TOKEN
          } else {
            res.status(200).json({
              userId: results[0].id,
              nom: results[0].nom,
              prenom: results[0].prenom,
              admin: results[0].admin,
              token: jwt.sign(
                {
                  userId: results[0].id,
                },
                process.env.TOKEN,
                {
                  expiresIn: "24h",
                }
              ),
            });
          }
        });
      } else {
        res.status(404).json({
          message: "Utilisateur inconnu.",
        });
      }
    }
  );
};

// Delete user
exports.deleteUser = (req, res, next) => {
    db.query(`DELETE FROM users WHERE users.id = ${req.params.id}`, (error, results, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(results);
    });
};
/* eslint-disable no-unused-vars */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailValidator = require("email-validator");
var passwordValidator = require("password-validator");
const models = require("../models/index.js");
//const { users } = require('../models/index.js');

var schema = new passwordValidator();
schema
  .is()
  .min(8)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(2)
  .has()
  .not()
  .spaces()
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]);

exports.signup = (req, res, next) => {
 if (!schema.validate(req.body.password)) {
    throw { error: " invalide !" }; 
  }else { 
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        models.users
          .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            admin: false,
            password: hash,
            imageUrl: req.file ? `${req.protocol}://${req.get("host")}/image/${
              req.file.filename
            }` : 'http://localhost:3000/image/IMG_4404.jpeg',
          })
          .then((users) =>
            res.status(200).json({
              admin: users.admin,
              userId: users.id,
              token: jwt.sign({ userId: users.id }, process.env.JWT_KEY, {
                expiresIn: "24h",
              }),
            })
          );
      })
      .catch((error) => res.status(500).json({ error }));
  }
};
exports.login = (req, res, next) => {
  models.users
    .findOne({
      where: { email: req.body.email },
    })
    .then((users) => {
      if (!users) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, users.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            admin: users.admin,
            userId: users.id,
            token: jwt.sign({ userId: users.id }, process.env.JWT_KEY, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    });
};

exports.deleteUser = (req, res, next) => {
  models.users
    .findOne({ where: { id: req.params.id } })
    .then(() => {
      models.users
        .destroy({ where: { id: req.params.id } })
        .then((user) => res.status(200).json(user), {
          message: "Compte supprimé",
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneUser = (req, res, next) => {
  models.users
    .findOne({ where: { id: req.params.id } })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
  models.users
    .findAll({ attributes: ["id", "email", "firstName", "lastName"] })
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

exports.updateUserEmail = (req, res, next) => {
  try {
    console.log(req.body.email)
    models.users.update(
      {
        email: req.body.email,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    return res.status(200).send({
      message: "Informations modifiées",
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};
exports.updateUserImg = (req, res, next) => {
  try {
    models.users.update(
      {
        imageUrl: `${req.protocol}://${req.get("host")}/image/${
          req.file.filename
        }`,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    return res.status(200).send({
      message: "Informations modifiées",
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.findPostCom = (req, res, next) => {
  models.comments
    .findAll({
      order: [["createdAt", "DESC"]],
      where: {
        postId: req.params.id,
      },
      include: {
        model: models.posts,
      },
    })
    .then((comments) => {
      return res.status(200).json(comments);
    })
    .catch((error) => {
      return res.status(500).json({
        error,
      });
    });
};

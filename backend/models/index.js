'use strict';
/*** Définir les variables d'environnement pour masquer les informations de connexion à la base de données  ***/
require("dotenv").config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const mysql = require("mysql2");


const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USERNAME,
  password: `${process.env.DB_PASSWORD}`
});
connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME} CHARACTER SET 'utf8'`,
function(err,results) {
  console.log(results);
  console.log(err);
});




const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});
/*try { */
  sequelize.authenticate()
  .then(() => console.log('Connexion à mysql réussie !'))
  .catch(error => console.log('Connexion échouée:' + error)) 
  /*** création de la table utilisateurs ***/
  
  /* sequelize.query(`DROP TABLE IF EXISTS Users`).then(([results, metadata]) => {
    console.log('DROP Users!'); 
  }); */
  sequelize.query(`CREATE TABLE IF NOT EXISTS Users (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    imageUrl VARCHAR(255) NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL, 
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN NOT NULL DEFAULT FALSE,
    createdAt datetime NULL,
    updatedAt datetime NULL,
    PRIMARY KEY (id)  
    ) ENGINE = InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8`).then(([results, metadata]) => {
      console.log('Table Users créée !');
    });
    
    /*** servent PRIMARY KEY(id) est une clé primaire qui serve à identifier une ligne de manière unique ***/
    
    /*** création de la table des articles,
     on ajoute une clé étrangère pour associer chaque post à son utilisateur
     (On donne un nom à notre clé,on indique la colonne sur laquelle on crée la clé,puis la Colonne de référence) ***/
     
      /* sequelize.query(`  DROP TABLE IF EXISTS Posts`).then(([results, metadata]) => {
       console.log('DROP Posts!'); 
      }); */
      sequelize.query(` CREATE TABLE IF NOT EXISTS Posts (
        id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
        userId SMALLINT UNSIGNED NOT NULL,
        content TEXT NOT NULL,
        imageUrl VARCHAR(255) NULL,
        createdAt datetime NULL,
        updatedAt datetime NULL,
        PRIMARY KEY (id),
        CONSTRAINT fk_post_userId FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE
        ) ENGINE = InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8`).then(([results, metadata]) => {
          console.log('Base de données créée !');
        });
        
        /**** création de la table des commentaires ***/
        /*  sequelize.query(`DROP TABLE IF EXISTS Comments`).then(([results, metadata]) => {
          console.log('Base de données créée !');
        }); */
        sequelize.query(`CREATE TABLE IF NOT EXISTS Comments (
          id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
          userId SMALLINT UNSIGNED NOT NULL, 
          postId SMALLINT UNSIGNED NOT NULL,
          content TEXT NOT NULL,
          createdAt datetime NULL,
          updatedAt datetime NULL,
          imageUrl varchar(255) NULL,
          PRIMARY KEY (id),
          CONSTRAINT fk_comment_post_id FOREIGN KEY (postId) REFERENCES Posts(id) ON DELETE CASCADE ON UPDATE CASCADE,
          CONSTRAINT fk_comment_user_id FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE
          ) ENGINE = InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;`).then(([results, metadata]) => {
            console.log('Base de données créée !');
          })
          sequelize.query(`USE ${process.env.DB_NAME};`);
       /* }  .catch (error) {
          console.error('Impossible de se connecter, erreur suivante :', error);
        } */
        const db = {};
        db.sequelize = sequelize;
        db.Sequelize = Sequelize;
        
        
        db.Post = require('./Post')(sequelize, Sequelize);
        db.User = require('./User')(sequelize, Sequelize);
        db.Comment = require('./Comment')(sequelize, Sequelize);
        
       
        db.Post.belongsTo(db.User, {
          foreignKey: {
            name: 'userId',
            allowNull: false
          },
          onDelete: 'CASCADE',
          onUpdate: 'NO ACTION',
        });
        
        
        db.Comment.belongsTo(db.User, {
          foreignKey: {
            name: 'userId',
            allowNull: false
          },
          onDelete: 'CASCADE',
          onUpdate: 'NO ACTION',
        });
        
        db.Comment.belongsTo(db.Post, {
          foreignKey: {
            name: 'postId',
            allowNull: false
          },
          onDelete: 'CASCADE',
          onUpdate: 'NO ACTION',
        });
        
        sequelize.authenticate()
        .then(() => console.log('Connexion à mysql réussie !'))
        .catch(error => console.log('Connexion échouée:' + error)) 
        
        
        module.exports = db;
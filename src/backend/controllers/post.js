/* eslint-disable no-unused-vars */

const fs = require('fs'); 
const models=require('../models/index.js')
const jwt = require('jsonwebtoken');


exports.deletePost = (req, res, next) => {
    // nous utilisons l'ID que nous recevons comme paramètre pour accéder au post correspondant dans la base de données 
            models.posts.findOne ({ 
                where: { id: req.params.id }})          
                .then(post => {
                    if (req.file) {
                        const filename = post.imageUrl.split('/image/')[1];
                        fs.unlink(`image/${filename}`, () => {
                            post.destroy({
                                    where: {
                                        id: req.params.id
                                    }
                                })
                                .then(() => res.status(200).json({
                                    message: 'le post est bien supprimé !'
                                }))
                                .catch(error => res.status(400).json({
                                    error
                                }))
                        })
               } else { 
                    models.posts.destroy({where:{id: req.params.id }})
                    .then(() => res.status(200).json({ message: 'post supprimé !'}))
                    .catch(error => res.status(400).json({ error }));
                } 
})
}

exports.createPost = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.userId;
if (!req.file) {
    return models.posts.create({
        userId: userId,
        content: req.body.content,
        title: req.body.title,
        imageUrl: null,
    })
        .then((post) => res.status(201).json(post))
        .catch((error) => {console.log(error)
             res.status(500).json(error)});

    } else {
        models.posts.create({
            userId: userId,
            content: req.body.content,
            title: req.body.title,
            imageUrl: `${req.protocol}://${req.get("host")}/image/${
                req.file.filename
            }`,
        })
            .then((post) => res.status(201).json({post}))
            .catch((error) => res.status(500).json(error));
    } 
};


exports.findAllPostUser= (req, res, next) => {

  models.posts.findAll({
    order:[[
        'createdAt', 'DESC'
   ]],
    include:{
        model:models.users,
    },
     where: { userId: req.params.userId }
    })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(500).json(error));
};
     
exports.getAllPosts = (req, res, next) => {
    models.posts.findAll({
        order:[[
             'createdAt', 'DESC'
        ]],
         include:{
             model:models.users,
         }}).then(posts => {
       return res.status(200).json(posts);
     }).catch(error => {
        return res.status(500).json({
            
         });
     });
    };

    
const db = require("../database_connect");

//all post
exports.getAllPost = (req, res, next) => {
  db.querry(
    "SELECT user.nom, user.prenom, post.id, post.userId, post.title, post.content, post.date AS date FROM user INNER JOIN posts on user.id = post.userid ORDER BY date DESC",
    (error, result, field) => {
      if (error) {
        return res.status(400).json({
          error,
        });
      }
      return res.status(200).json(result);
    }
  );
};

//newPost
exports.newPost = (req, res, next) =>{
    db.querry(`INSERT INTO post VALUES (NULL, '${req.body.userID}', '${req.body.title}', NOW(), '${req.body.content}')`, (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(201).json ({
            message: 'Votre post à été publié !'
        })
    });
};

//onePost
exports.getOnePost = (req, res, next) => {
    db.querry (`SELECT * FROM post WHERE post.id = ${req.params.id}`, (error, result, field) => {
        if (error) {
            return res.status(400).json ({
                error
            });
        } 
        return res.status(201).json (result);
    });
};

//delete onePost
exports.deleteOnePost = (req, res, next) => {
    db.querry (`UPDATE post SET title = '${req.body.title}', content = '${req.body.content}' WHERE post.id = ${req.params.id}`, (error, result, field) => {
        if (error) {
            return res.status(400).json ({
                error
            });
        }
        return res.status(200).json (result);
    });
};

//Modify onePost 
exports.modifyOnePost = (req, res, next) => {
    db.querry (`UPDATE post SET title = '${req.body.title}', content = '${req.body.content}' WHERE post.id = ${req.params.id}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json (result);
    });
};

// Get User's Posts
exports.getUserPost = (req, res, next) => {
    db.query(`SELECT * FROM posts WHERE posts.userId = ${req.params.id}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};
// New comment
exports.newComment = (req, res, next) => {
    db.query(`INSERT INTO comments VALUES (NULL, ${req.body.userId}, ${req.params.id}, NOW(), '${req.body.content}')`, (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};
// Get all comments
exports.getAllComments = (req, res, next) => {
    db.query(`SELECT users.id, users.nom, users.prenom, comments.id,comments.content, comments.userId, comments.date FROM users INNER JOIN comments ON users.id = comments.userId WHERE comments.postId = ${req.params.id} ORDER BY comments.date DESC`,
        (error, result, field) => {
            if (error) {
                return res.status(400).json({
                    error
                });
            }
            return res.status(200).json(result);
        });
};
//Delete comment
exports.deleteComment = (req, res, next) => {
    db.query(`DELETE FROM comments WHERE comments.id = ${req.params.id}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};
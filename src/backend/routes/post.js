const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userControl = require('../controllers/post');

//posts
router.get('/', auth, userControl.getAllPost);
router.post('/', auth, userControl.newPost);
router.get('/:id', auth, userControl.getOnePost);
router.delete('/:id', auth, userControl.deleteOnePost);
router.put('/:id', auth,userControl.modifyOnePost);
router.get('/user:id/posts', auth, userControl.getUserPost);

//commentaires
router.get('/:id/comments', auth, userControl.getAllComments);
router.post('/:id/comment/', auth, userControl.newComment);
router.delete('/comment/:id', auth,userControl.deleteComment);

module.exports = router;
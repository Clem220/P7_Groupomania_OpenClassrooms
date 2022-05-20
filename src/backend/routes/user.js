/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer');

router.post('/signup', multer, userCtrl.signup);
router.post('/login', multer, userCtrl.login);
router.get('/:id', multer, userCtrl.getOneUser)
router.get('/',userCtrl.getAllUsers)
router.get('/:id/posts/comments',userCtrl.findPostCom);
router.put('/:id/email', multer, userCtrl.updateUserEmail)
router.put('/:id/photo', multer, userCtrl.updateUserImg)
router.delete('/:id',userCtrl.deleteUser)

module.exports = router;
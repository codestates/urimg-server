const express = require('express');
const router = express.Router();

const { userController } = require('../controller');

// * POST /user/login
router.post('/login', userController.login.post);

// * GET /user/userinfo
router.get('/userinfo', userController.userinfo.get);

//* DELETE /user/userinfo
router.delete('/userinfo', userController.userinfo.delete);

//* PATCH /user/userinfo
router.patch('/userinfo', userController.userinfo.patch);

module.exports = router;

const express = require('express');
const router = express.Router();

const { userController } = require('../controller');

// * POST /user/login
router.post('/login', userController.login.post);

// * GET /user/userinfo
router.get('/userinfo', userController.userinfo.get);

// * POST /user/signup
router.post('/signup', userController.signup.post);

//* POST /user/logout
router.post('/logout', userController.logout.post);

module.exports = router;

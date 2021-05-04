var express = require('express');
var router = express.Router();

const{ imgController } = require('../controller');

router.post('/upload', imgController.upload.post);

router.get('/mypage', imgController.mypage.get);

module.exports = router;

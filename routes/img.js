var express = require('express');
var router = express.Router();

const{ imgController } = require('../controller');

router.post('/upload', imgController.upload.post);

router.post('/like', imgController.like.post);

module.exports = router;

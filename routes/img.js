var express = require('express');
var router = express.Router();

const{ imgController } = require('../controller');

router.post('/upload', imgController.upload.post);

router.post('/like', imgController.like.post);

router.get('/list', imgController.list.get);

router.get('/comment', imgController.comment.get)

router.post('/comment', imgController.comment.post)

module.exports = router;

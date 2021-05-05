var express = require('express');
var router = express.Router();

const{ imgController } = require('../controller');

router.post('/upload', imgController.upload.post);

router.get('/mypage', imgController.mypage.get);

router.post('/like', imgController.like.post);

router.get('/list', imgController.list.get);

router.get('/:id', imgController.id.get);

router.delete('/like', imgController.like.delete);

module.exports = router;

var express = require('express');
var router = express.Router();

const{ imgController } = require('../controller');

router.post('/upload', imgController.upload.post);

router.get('/mypage', imgController.mypage.get);

router.post('/like', imgController.like.post);

router.get('/list', imgController.list.get);

router.get('/comment', imgController.comment.get);

router.post('/comment', imgController.comment.post);

router.delete('/like', imgController.like.delete);

router.post('/search', imgController.search.post);

router.get('/like', imgController.like.get);

router.get('/:id', imgController.id.get);

module.exports = router;

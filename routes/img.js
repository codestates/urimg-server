var express = require('express');
var router = express.Router();

const{ imgController } = require('../controller');

// * POST /img/upload
router.post('/upload', imgController.upload.post);

// * GET /img/mypage
router.get('/mypage', imgController.mypage.get);

// * POST /img/like
router.post('/like', imgController.like.post);

// * GET /img/list
router.get('/list', imgController.list.get);

// * GET /img/comment
router.get('/comment', imgController.comment.get);

// * POST /img/comment
router.post('/comment', imgController.comment.post);

// * DELETE /img/like
router.delete('/like', imgController.like.delete);

// * POST /img/search
router.post('/search', imgController.search.post);

// * GET /img/like
router.get('/like', imgController.like.get);

// * GET /img/:id
router.get('/:id', imgController.id.get);

module.exports = router;

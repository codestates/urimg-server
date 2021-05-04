var express = require('express');
var router = express.Router();

const{ imgController } = require('../controller');

router.post('/upload', imgController.upload.post);

router.post('/like', imgController.like.post);

router.get('/list', imgController.list.get);

router.get('/:id', imgController.id.get);

module.exports = router;

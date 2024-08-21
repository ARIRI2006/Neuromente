const { Router } = require('express');
const postRouter = Router();

const { storepost } = require('../controller/postController');

postRouter.post('/store/post', storepost);

module.exports = postRouter;
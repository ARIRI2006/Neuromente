const { Router } = require('express');
const postRouter = Router();

const { storepost } = require('../controller/postController');
const { getpost } = require('../controller/postController');

postRouter.post('/store/post', storepost);
postRouter.get('/store/getpost', getpost);

module.exports = postRouter;
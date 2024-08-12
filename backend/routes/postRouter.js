const { Router } = require('express');
const router = Router();

const { storepost } = require('../controller/postController');

router.post('/store/post', storepost);

module.exports = router;
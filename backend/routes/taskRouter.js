const { Router } = require('express');
const router = Router();

const { storeTask } = require('../controller/taskController');
const { loginTask } = require('../controller/loginController');

router.post('/store/task', storeTask);
router.post('/store/logintask', loginTask);

module.exports = router;
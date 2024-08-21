const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const router = require('./routes/taskRouter');
const postRouter = require('./routes/postRouter');
const app = express();

app.set('port', process.env.PORT || 3010);
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use('/api', postRouter);

module.exports = app;
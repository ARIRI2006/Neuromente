const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const router = require('./routes/taskRouter');
const postRouter = require('./routes/postRouter');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();

app.set('port', process.env.PORT || 3008);
app.use(cors());
app.use(express.json());


module.exports = app;

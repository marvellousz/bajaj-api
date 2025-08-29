const express = require('express');
const cors = require('cors');
const { validateBfhlRequest } = require('../middleware/validation');
const { globalErrorHandler, asyncErrorHandler } = require('../middleware/errorHandler');
const { handleBfhlPost } = require('../controllers/bfhlController');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', validateBfhlRequest, asyncErrorHandler(handleBfhlPost));
app.use(globalErrorHandler);

module.exports = app;

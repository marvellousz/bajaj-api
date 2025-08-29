const express = require('express');
const cors = require('cors');
const { validateBfhlRequest } = require('./middleware/validation');
const { globalErrorHandler, notFoundHandler, asyncErrorHandler } = require('./middleware/errorHandler');
const { handleBfhlPost } = require('./controllers/bfhlController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ 
    message: 'BFHL API is running',
    status: 'healthy'
  });
});

app.post('/bfhl', validateBfhlRequest, asyncErrorHandler(handleBfhlPost));
app.use(notFoundHandler);
app.use(globalErrorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
const globalErrorHandler = (err, req, res, next) => {
  if (!err) {
    err = new Error('Unknown error occurred');
  }

  console.error('Error:', err.message);

  let statusCode = 500;
  let errorResponse = {
    is_success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred'
    }
  };

  if (err.name === 'ValidationError') {
    statusCode = 400;
    errorResponse.error = {
      code: 'VALIDATION_ERROR',
      message: err.message
    };
  } else if (err.name === 'SyntaxError' && err.message.includes('JSON')) {
    statusCode = 400;
    errorResponse.error = {
      code: 'INVALID_JSON',
      message: 'Invalid JSON in request body'
    };
  }

  res.status(statusCode).json(errorResponse);
};

const notFoundHandler = (req, res) => {
  res.status(404).json({
    is_success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.url} not found`
    }
  });
};

const asyncErrorHandler = (fn) => {
  return (req, res, next) => {
    try {
      const result = fn(req, res, next);
      Promise.resolve(result).catch(next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  globalErrorHandler,
  notFoundHandler,
  asyncErrorHandler
};
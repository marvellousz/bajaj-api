const validateBfhlRequest = (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        is_success: false,
        error: {
          code: 'MISSING_BODY',
          message: 'Request body is required'
        }
      });
    }

    if (!req.body.hasOwnProperty('data')) {
      return res.status(400).json({
        is_success: false,
        error: {
          code: 'MISSING_DATA_FIELD',
          message: 'data field is required in request body'
        }
      });
    }

    if (!Array.isArray(req.body.data)) {
      return res.status(400).json({
        is_success: false,
        error: {
          code: 'INVALID_DATA_TYPE',
          message: 'data field must be an array'
        }
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      is_success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'An error occurred during request validation'
      }
    });
  }
};

module.exports = {
  validateBfhlRequest
};
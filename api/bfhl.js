const { processData, calculateSum, concatenateAlphabets } = require('../services/dataProcessor');
const { getUserInfo } = require('../services/userService');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      is_success: false,
      error: {
        code: 'METHOD_NOT_ALLOWED',
        message: 'Only POST method is allowed'
      }
    });
  }

  try {
    // Validate request body
    if (!req.body || !req.body.data) {
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

    // Process the data
    const { data } = req.body;
    const processedData = processData(data);
    const userInfo = getUserInfo();
    const sum = calculateSum(processedData.numbers);
    const concatString = concatenateAlphabets(processedData.alphabets);

    // Return successful response
    res.status(200).json({
      is_success: true,
      user_id: userInfo.user_id,
      email: userInfo.email,
      roll_number: userInfo.roll_number,
      odd_numbers: processedData.odd_numbers,
      even_numbers: processedData.even_numbers,
      alphabets: processedData.alphabets,
      special_characters: processedData.special_characters,
      sum: sum,
      concat_string: concatString
    });

  } catch (error) {
    console.error('Error:', error);
    
    res.status(500).json({
      is_success: false,
      error: {
        code: 'PROCESSING_ERROR',
        message: 'An error occurred while processing the request'
      }
    });
  }
};

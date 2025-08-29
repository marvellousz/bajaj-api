
const { processData, calculateSum, concatenateAlphabets } = require('../services/dataProcessor');
const { getUserInfo } = require('../services/userService');

const handleBfhlPost = async (req, res) => {
  try {
    const { data } = req.body;
    const processedData = processData(data);
    const userInfo = getUserInfo();
    const sum = calculateSum(processedData.numbers);
    const concatString = concatenateAlphabets(processedData.alphabets);

    const response = {
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
    };

    res.status(200).json(response);

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

module.exports = {
  handleBfhlPost
};
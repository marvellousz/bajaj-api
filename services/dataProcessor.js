function processData(data) {
  if (!Array.isArray(data)) {
    throw new Error('Input must be an array');
  }

  const result = {
    numbers: [],
    odd_numbers: [],
    even_numbers: [],
    alphabets: [],
    special_characters: []
  };

  data.forEach(item => {
    const itemStr = String(item);
    
    if (isNumber(itemStr)) {
      result.numbers.push(itemStr);
      const num = parseInt(itemStr, 10);
      if (num % 2 === 0) {
        result.even_numbers.push(itemStr);
      } else {
        result.odd_numbers.push(itemStr);
      }
    } else if (isAlphabet(itemStr)) {
      result.alphabets.push(itemStr.toUpperCase());
    } else if (isSpecialCharacter(itemStr)) {
      result.special_characters.push(itemStr);
    }
  });

  return result;
}

function isNumber(str) {
  return /^\d+$/.test(str);
}

function isAlphabet(str) {
  return /^[a-zA-Z]+$/.test(str);
}

function isSpecialCharacter(str) {
  return !isNumber(str) && !isAlphabet(str) && str.trim() !== '';
}

function calculateSum(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return "0";
  }

  const sum = numbers.reduce((total, numStr) => {
    const num = parseInt(numStr, 10);
    return total + (isNaN(num) ? 0 : num);
  }, 0);

  return String(sum);
}

function concatenateAlphabets(alphabets) {
  if (!Array.isArray(alphabets) || alphabets.length === 0) {
    return "";
  }

  const allChars = [];
  alphabets.forEach(alphaStr => {
    for (let i = 0; i < alphaStr.length; i++) {
      const char = alphaStr[i];
      if (isAlphabet(char)) {
        allChars.push(char);
      }
    }
  });

  if (allChars.length === 0) {
    return "";
  }

  const reversedChars = allChars.reverse();
  let result = "";
  
  reversedChars.forEach((char, index) => {
    if (index % 2 === 0) {
      result += char.toLowerCase();
    } else {
      result += char.toUpperCase();
    }
  });

  return result;
}

module.exports = {
  processData,
  isNumber,
  isAlphabet,
  isSpecialCharacter,
  calculateSum,
  concatenateAlphabets
};
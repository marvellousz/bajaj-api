/**
 * Integration tests for BFHL API Controller
 * Tests complete request/response flow with all services integrated
 */

const request = require('supertest');
const express = require('express');
const { handleBfhlPost } = require('../controllers/bfhlController');
const { validateBfhlRequest } = require('../middleware/validation');

// Create test Express app
const createTestApp = () => {
  const app = express();
  app.use(express.json());
  app.post('/bfhl', validateBfhlRequest, handleBfhlPost);
  return app;
};

describe('BFHL Controller Tests', () => {
  let app;

  beforeEach(() => {
    app = createTestApp();
  });

  test('should process mixed data correctly', async () => {
    const testData = {
      data: ["M", "1", "334", "4", "B", "Z", "a", "@"]
    };

    const response = await request(app)
      .post('/bfhl')
      .send(testData)
      .expect(200);

    expect(response.body).toMatchObject({
      is_success: true,
      odd_numbers: ["1"],
      even_numbers: ["334", "4"],
      alphabets: ["M", "B", "Z", "A"],
      special_characters: ["@"],
      sum: "339",
      concat_string: "aZbM"
    });
  });

  test('should handle numbers only', async () => {
    const testData = {
      data: ["1", "2", "3", "4", "5"]
    };

    const response = await request(app)
      .post('/bfhl')
      .send(testData)
      .expect(200);

    expect(response.body).toMatchObject({
      is_success: true,
      odd_numbers: ["1", "3", "5"],
      even_numbers: ["2", "4"],
      alphabets: [],
      special_characters: [],
      sum: "15",
      concat_string: ""
    });
  });

  test('should handle alphabets only', async () => {
    const testData = {
      data: ["A", "b", "C", "d"]
    };

    const response = await request(app)
      .post('/bfhl')
      .send(testData)
      .expect(200);

    expect(response.body).toMatchObject({
      is_success: true,
      odd_numbers: [],
      even_numbers: [],
      alphabets: ["A", "B", "C", "D"],
      special_characters: [],
      sum: "0",
      concat_string: "dCbA"
    });
  });

  test('should handle empty array', async () => {
    const testData = {
      data: []
    };

    const response = await request(app)
      .post('/bfhl')
      .send(testData)
      .expect(200);

    expect(response.body).toMatchObject({
      is_success: true,
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: "0",
      concat_string: ""
    });
  });

  test('should handle missing data field', async () => {
    const response = await request(app)
      .post('/bfhl')
      .send({ otherField: "value" })
      .expect(400);

    expect(response.body).toMatchObject({
      is_success: false,
      error: {
        code: 'MISSING_DATA_FIELD'
      }
    });
  });

  test('should handle non-array data', async () => {
    const response = await request(app)
      .post('/bfhl')
      .send({ data: "not an array" })
      .expect(400);

    expect(response.body).toMatchObject({
      is_success: false,
      error: {
        code: 'INVALID_DATA_TYPE'
      }
    });
  });
});
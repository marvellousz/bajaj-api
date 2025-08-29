const request = require('supertest');
const app = require('../index');

describe('App Tests', () => {
  
  test('GET / should return health status', async () => {
    const response = await request(app)
      .get('/')
      .expect(200);

    expect(response.body).toHaveProperty('message', 'BFHL API is running');
    expect(response.body).toHaveProperty('status', 'healthy');
  });

  test('POST /bfhl should process valid data', async () => {
    const testData = {
      data: ["M", "1", "334", "4", "B", "Z", "a", "@"]
    };

    const response = await request(app)
      .post('/bfhl')
      .send(testData)
      .expect(200);

    expect(response.body).toHaveProperty('is_success', true);
    expect(response.body).toHaveProperty('user_id');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('roll_number');
  });

  test('POST /bfhl should handle empty array', async () => {
    const testData = {
      data: []
    };

    const response = await request(app)
      .post('/bfhl')
      .send(testData)
      .expect(200);

    expect(response.body.is_success).toBe(true);
    expect(response.body.odd_numbers).toEqual([]);
    expect(response.body.even_numbers).toEqual([]);
    expect(response.body.alphabets).toEqual([]);
    expect(response.body.special_characters).toEqual([]);
    expect(response.body.sum).toBe("0");
    expect(response.body.concat_string).toBe("");
  });

  test('POST /bfhl should return 400 for missing data field', async () => {
    const testData = {
      notData: ["1", "2", "3"]
    };

    const response = await request(app)
      .post('/bfhl')
      .send(testData)
      .expect(400);

    expect(response.body.is_success).toBe(false);
    expect(response.body.error.code).toBe('MISSING_DATA_FIELD');
  });

  test('POST /bfhl should return 400 for non-array data', async () => {
    const testData = {
      data: "not an array"
    };

    const response = await request(app)
      .post('/bfhl')
      .send(testData)
      .expect(400);

    expect(response.body.is_success).toBe(false);
    expect(response.body.error.code).toBe('INVALID_DATA_TYPE');
  });

  test('POST /bfhl should return 400 for missing body', async () => {
    const response = await request(app)
      .post('/bfhl')
      .expect(400);

    expect(response.body.is_success).toBe(false);
    expect(response.body.error.code).toBe('MISSING_BODY');
  });

  test('should return 404 for unknown routes', async () => {
    const response = await request(app)
      .get('/unknown')
      .expect(404);

    expect(response.body.is_success).toBe(false);
    expect(response.body.error.code).toBe('NOT_FOUND');
  });
});
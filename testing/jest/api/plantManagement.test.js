const supertest = require('supertest');
const baseUrl = 'http://localhost:3000'; // Assuming backend runs on port 3000
const request = supertest(baseUrl);

describe('Plant Management API Tests', () => {
  let plantId;
  const testPlant = {
    name: 'Test Plant',
    category: 'Vegetable',
    description: 'A test plant for API testing',
    climate: 'Moderate',
    soilPh: '6.5-7.0',
    landPreparation: 'Standard preparation required',
    fertilizers: ['Organic compost', 'NPK 10-10-10']
  };

  // Test for creating a new plant
  test('POST /Plant/add - should create a new plant', async () => {
    const response = await request
      .post('/Plant/add')
      .send(testPlant)
      .set('Accept', 'application/json');
    
    expect(response.status).toBe(201);
    expect(response.body).toBe('New Plant Added');
  });

  // Test for retrieving all plants
  test('GET /Plant - should retrieve all plants', async () => {
    const response = await request.get('/Plant');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    
    // Store a plant ID for further tests if plants exist
    if (response.body.length > 0) {
      plantId = response.body[0]._id;
    }
  });

  // Test for retrieving a specific plant by ID
  test('GET /Plant/:id - should retrieve a specific plant', async () => {
    // Skip if no plantId is available
    if (!plantId) {
      console.log('Skipping test: no plant ID available');
      return;
    }

    const response = await request.get(`/Plant/${plantId}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('category');
  });

  // Test for updating a plant
  test('PUT /Plant/update/:id - should update a plant', async () => {
    // Skip if no plantId is available
    if (!plantId) {
      console.log('Skipping test: no plant ID available');
      return;
    }

    const updatedData = {
      ...testPlant,
      name: 'Updated Test Plant',
      description: 'This plant has been updated for testing'
    };

    const response = await request
      .put(`/Plant/update/${plantId}`)
      .send(updatedData)
      .set('Accept', 'application/json');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Plant Updated');
  });

  // Negative test - create plant with incomplete data
  test('POST /Plant/add - should fail with incomplete data', async () => {
    const incompletePlant = {
      name: 'Incomplete Plant'
      // Missing required fields
    };

    const response = await request
      .post('/Plant/add')
      .send(incompletePlant)
      .set('Accept', 'application/json');
    
    expect(response.status).toBe(500); // API should return error status
  });
});
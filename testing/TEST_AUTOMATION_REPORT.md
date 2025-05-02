# Software Test Automation Report

## 1. Manual Testing vs Automated Testing

### Manual Testing
Manual testing involves human testers executing test cases step by step without using any automation tools. The tester takes the role of an end-user and tests the application to identify any unexpected behavior or bugs.

**Advantages:**
- Flexibility in execution
- No initial automation setup cost
- Better for exploratory testing and user experience evaluation
- Easier to adapt to changing requirements
- Human intuition can catch visual and UX issues

**Disadvantages:**
- Time-consuming and labor-intensive
- Prone to human error and inconsistency
- Difficult to scale for large applications
- Repetitive tasks are tedious and inefficient
- Limited coverage due to time constraints

### Automated Testing
Automated testing uses specialized tools and scripts to execute test cases automatically, compare actual outcomes with expected outcomes, and generate test reports.

**Advantages:**
- Faster execution and feedback
- Reusability of test scripts
- Consistency in test execution
- Better test coverage
- Efficient for regression testing
- Cost-effective in the long run

**Disadvantages:**
- High initial setup cost and learning curve
- Maintenance overhead as application evolves
- Limited ability to detect visual or UX issues
- Some scenarios are difficult to automate
- Tool dependencies and compatibility issues

## 2. Evolution of Test Automation Tools

### Early Days (1980s-1990s)
- Simple record and playback tools
- Limited to specific platforms
- Script-based testing
- Examples: WinRunner, QTP (now UFT)

### 2000s
- Introduction of open-source tools
- Web testing capabilities improved
- Better integration with development tools
- Examples: Selenium, JUnit, TestNG

### 2010s
- Cloud-based testing platforms
- Behavior-Driven Development (BDD) frameworks
- Mobile testing capabilities
- Integration with CI/CD pipelines
- Examples: Cypress, Appium, Cucumber

### Current Trends (2020s)
- AI-powered test automation
- Low-code/no-code testing solutions
- Shift-left testing approaches
- Test automation for microservices and APIs
- Integration with DevOps practices
- Examples: Playwright, TestProject, mabl

## 3. Importance of Test Automation in Software Development

### Faster Time to Market
- Reduces testing cycles from days/weeks to hours/minutes
- Enables continuous testing in CI/CD pipelines
- Allows for more frequent releases

### Improved Quality
- Consistent and repeatable test execution
- Higher test coverage across features and platforms
- Early detection of regressions and issues

### Cost Reduction
- Reduces manual testing effort for repetitive tasks
- Lowers the cost of fixing bugs in later stages
- Better resource allocation for complex testing tasks

### Enhanced Efficiency
- Parallel test execution across multiple environments
- 24/7 testing capability
- Reusable test components and shared libraries

### Better Developer Experience
- Immediate feedback on code changes
- Increased confidence in code quality
- Reduced debugging time

## 4. Challenges in Software Test Automation Implementation

### Technical Challenges
- Tool selection complexity
- Integration with existing systems
- Test environment stability
- Test data management
- Handling dynamic elements and asynchronous processes

### Organizational Challenges
- Building and maintaining automation skills
- Securing management buy-in
- Balancing automation investment with ROI
- Transitioning from manual to automated testing
- Cultural resistance to change

### Maintenance Challenges
- Keeping tests up-to-date with changing requirements
- Managing test script fragility
- Dealing with technical debt in test code
- Scaling automation as the application grows
- Maintaining test data relevance

### Process Challenges
- Integrating automation into existing workflows
- Establishing testing standards and best practices
- Balancing speed and quality
- Measuring automation effectiveness
- Ensuring test coverage across critical paths

## 5. Justification for Automation Tool Selection

For the AgriPeace farming management system, we selected the following tools:

### Jest
**Reasons for selection:**
- JavaScript-based testing framework that integrates well with our MERN stack
- Excellent for unit and API testing with built-in assertion library
- Offers mocking capabilities for isolating components under test
- Zero configuration required for React applications
- Parallel test execution for faster feedback
- Built-in code coverage reporting
- Active community and documentation

### Cypress
**Reasons for selection:**
- Modern E2E testing tool designed for web applications
- Real-time reloading and time-travel debugging
- Automatic waiting and retry logic reduces flaky tests
- Built-in screenshots and video recording for failed tests
- Runs directly in the browser for better debugging
- Easy setup and configuration
- Strong documentation and community support

### Postman
**Reasons for selection:**
- Powerful API testing platform with intuitive UI
- Supports automated API testing with Newman CLI
- Collections can be shared among team members
- Environment variables for different deployment contexts
- Comprehensive request and response validation
- Test scripts written in JavaScript
- API documentation generation capabilities
- Integration with CI/CD pipelines

### K6
**Reasons for selection:**
- Open-source performance testing tool
- JavaScript-based scripting for developers' familiarity
- Low resource consumption compared to other performance tools
- Support for various load test patterns (spike, stress, soak)
- Local and cloud execution options
- Integration with CI/CD and monitoring systems
- Metrics visualization and comprehensive reporting
- Can simulate thousands of virtual users

### Why these tools over alternatives?

**Jest vs Mocha/Chai:**
- Jest includes built-in assertion, mocking, and coverage reporting
- Simpler configuration and setup process
- Better integration with React ecosystem

**Cypress vs Selenium:**
- Faster execution with better stability
- Modern architecture that reduces flaky tests
- Superior developer experience and debugging tools
- Easier setup and maintenance
- Real-time test feedback during development

**Postman vs REST-assured/SoapUI:**
- More intuitive user interface for manual and automated testing
- Better suited for JavaScript-based projects
- Stronger collaboration features for team sharing
- Easier learning curve for developers and QA engineers

**K6 vs JMeter/Gatling:**
- Code-based approach fits better with developer workflow
- Lighter resource footprint enables more realistic load testing
- JavaScript support aligns with our full-stack JS ecosystem
- More modern architecture and cloud integration options
- Superior developer experience and easier CI/CD integration

## 6. Test Cases Used

### Unit Testing with Jest

#### Test Case Group: Plant Management API
**Test Objective:** Verify CRUD operations for plant management API endpoints

1. **Test Case: Create new plant**
   - Test Steps:
     1. Send POST request to `/Plant/add` with valid plant data
     2. Verify response status is 201
     3. Verify response message confirms plant was added
   - Expected Result: New plant is successfully created in the database

2. **Test Case: Retrieve all plants**
   - Test Steps:
     1. Send GET request to `/Plant`
     2. Verify response status is 200
     3. Verify response body is an array
   - Expected Result: All plants are retrieved successfully

3. **Test Case: Retrieve specific plant**
   - Test Steps:
     1. Send GET request to `/Plant/:id` with a valid ID
     2. Verify response status is 200
     3. Verify response contains expected plant properties
   - Expected Result: Specific plant details are retrieved correctly

4. **Test Case: Update plant**
   - Test Steps:
     1. Send PUT request to `/Plant/update/:id` with updated plant data
     2. Verify response status is 200
     3. Verify response message confirms plant was updated
   - Expected Result: Plant information is updated in the database

5. **Test Case: Create plant with invalid data**
   - Test Steps:
     1. Send POST request to `/Plant/add` with incomplete plant data
     2. Verify response status is 500 (error)
   - Expected Result: Error response indicating invalid data

### E2E Testing with Cypress

#### Test Case Group: Authentication
**Test Objective:** Verify user authentication functionality

1. **Test Case: User login validation**
   - Test Steps:
     1. Visit the login page
     2. Verify form elements are present
     3. Attempt login with invalid credentials
     4. Verify error message is displayed
   - Expected Result: Login form validation works correctly

2. **Test Case: Successful admin login**
   - Test Steps:
     1. Visit the login page
     2. Enter valid admin credentials
     3. Submit the login form
     4. Verify redirection to admin dashboard
   - Expected Result: Admin is successfully logged in and redirected

#### Test Case Group: Plant Management (Admin)
**Test Objective:** Verify plant management functionality for admin users

1. **Test Case: Add new plant**
   - Test Steps:
     1. Login as admin
     2. Navigate to plant management page
     3. Click "Add Plant" button
     4. Fill plant details form
     5. Submit the form
     6. Verify success message and new plant in list
   - Expected Result: New plant is added successfully

2. **Test Case: Edit existing plant**
   - Test Steps:
     1. Login as admin
     2. Navigate to plant management page
     3. Click edit button for an existing plant
     4. Modify plant details
     5. Save changes
     6. Verify success message and updated details in list
   - Expected Result: Plant details are updated successfully

3. **Test Case: Delete plant**
   - Test Steps:
     1. Login as admin
     2. Navigate to plant management page
     3. Click delete button for a plant
     4. Confirm deletion in modal
     5. Verify success message and plant removal from list
   - Expected Result: Plant is deleted successfully

#### Test Case Group: Location Management (Farmer)
**Test Objective:** Verify location management functionality for farmer users

1. **Test Case: Add new location**
   - Test Steps:
     1. Login as farmer
     2. Navigate to location management page
     3. Click "Add Location" button
     4. Fill location details form
     5. Submit the form
     6. Verify success message and new location in list
   - Expected Result: New location is added successfully

2. **Test Case: View location crops**
   - Test Steps:
     1. Login as farmer
     2. Navigate to location management page
     3. Click "View Crops" button for a location
     4. Verify crop details page loads correctly
   - Expected Result: Crop details for the selected location are displayed

## 7. Automation Test Scripts

### Jest API Tests

The Jest test script for Plant Management API testing is located at:
`/testing/jest/api/plantManagement.test.js`

Key components of this test script:
- Uses supertest library for API requests
- Tests CRUD operations for plants
- Validates response status codes and payloads
- Handles error cases and validation

### Cypress E2E Tests

#### Authentication Tests
Located at: `/testing/cypress/e2e/auth/login.cy.js`

Key components:
- Tests login form validation
- Tests successful login for both user and admin roles
- Verifies proper redirection after authentication
- Tests navigation to registration page

## 8. Detailed Test Cases and Automation Steps

### API Testing with Jest

#### Plant Management API

##### Test Case: Create New Plant (Valid Data)
- **Objective**: Verify that a new plant can be added with valid data
- **Automation Steps**:
  1. Mock the `Plant.findOne` method to return null (plant does not exist)
  2. Mock the `Plant.create` method to return the request body
  3. Call the `addPlant` controller function with a request containing valid plant data
  4. Verify that `Plant.findOne` was called with the correct plant name
  5. Verify that `Plant.create` was called with the correct plant data
  6. Verify that response status is 201
  7. Verify that response JSON contains 'New Plant Added'
- **Expected Result**: Plant is successfully added to the database and appropriate success response is returned

##### Test Case: Create New Plant (Duplicate Plant)
- **Objective**: Verify that system handles duplicate plant names properly
- **Automation Steps**:
  1. Mock the `Plant.findOne` method to return an existing plant
  2. Call the `addPlant` controller function with a request containing a duplicate plant name
  3. Verify that `Plant.findOne` was called with the correct plant name
  4. Verify that `Plant.create` was not called
  5. Verify that response status is 400
  6. Verify that response JSON contains appropriate error message
- **Expected Result**: System prevents duplicate plant creation and returns appropriate error response

##### Test Case: Create New Plant (Database Error)
- **Objective**: Verify error handling when database operation fails
- **Automation Steps**:
  1. Mock the `Plant.findOne` method to reject with an error
  2. Call the `addPlant` controller function
  3. Verify that response status is 500
  4. Verify that response JSON contains the error message
- **Expected Result**: System handles database errors gracefully with appropriate error response

##### Test Case: Retrieve All Plants (Success)
- **Objective**: Verify that all plants can be retrieved successfully
- **Automation Steps**:
  1. Create mock plant data array
  2. Mock the `Plant.find` and `sort` methods to return the mock data
  3. Call the `getAllPlants` controller function
  4. Verify that `Plant.find` was called
  5. Verify that response JSON contains the mock plant data
- **Expected Result**: All plants are retrieved and returned in the response

##### Test Case: Retrieve All Plants (Database Error)
- **Objective**: Verify error handling when database retrieval fails
- **Automation Steps**:
  1. Mock the `Plant.find` method to return an object with a `sort` method
  2. Mock the `sort` method to reject with an error
  3. Call the `getAllPlants` controller function
  4. Verify that response status is 500
  5. Verify that response JSON contains the error message
- **Expected Result**: System handles database errors gracefully with appropriate error response

##### Test Case: Retrieve Specific Plant (Valid ID)
- **Objective**: Verify that a specific plant can be retrieved by ID
- **Automation Steps**:
  1. Create mock plant data for a specific ID
  2. Mock the `Plant.findById` method to return the mock data
  3. Call the `getOnePlant` controller function with a request containing a valid plant ID
  4. Verify that `Plant.findById` was called with the correct ID
  5. Verify that response status is 200
  6. Verify that response JSON contains the mock plant data
- **Expected Result**: Specific plant is retrieved and returned in the response

##### Test Case: Update Plant (Valid Data)
- **Objective**: Verify that a plant can be updated with valid data
- **Automation Steps**:
  1. Mock the `Plant.findByIdAndUpdate` method to return the updated data
  2. Call the `updatePlant` controller function with a request containing valid plant ID and updated data
  3. Verify that `Plant.findByIdAndUpdate` was called with the correct ID and data
  4. Verify that response status is 200
  5. Verify that response JSON contains confirmation message
- **Expected Result**: Plant is successfully updated and appropriate success response is returned

##### Test Case: Delete Plant (Success)
- **Objective**: Verify that a plant can be deleted successfully
- **Automation Steps**:
  1. Mock the `Plant.findByIdAndDelete` method to return an empty object
  2. Call the `deletePlant` controller function with a request containing valid plant ID
  3. Verify that `Plant.findByIdAndDelete` was called with the correct ID
  4. Verify that response status is 200
  5. Verify that response JSON contains confirmation message
- **Expected Result**: Plant is successfully deleted and appropriate success response is returned

### API Testing with Postman

#### User Authentication API

##### Test Case: User Login (Valid Credentials)
- **Objective**: Verify successful user authentication with valid credentials
- **Automation Steps**:
  1. Set up a POST request to `/api/set-token`
  2. Configure request body with valid user credentials:
     ```json
     {
       "email": "user@gmail.com", 
       "password": "user12345"
     }
     ```
  3. Add test script to verify:
     ```javascript
     pm.test("Status code is 200", function() {
       pm.response.to.have.status(200);
     });
     pm.test("Response contains JWT token", function() {
       var jsonData = pm.response.json();
       pm.expect(jsonData.token).to.exist;
       pm.environment.set("userToken", jsonData.token);
     });
     ```
  4. Execute the request
- **Expected Result**: Server responds with status 200 and a valid JWT token

##### Test Case: User Login (Invalid Credentials)
- **Objective**: Verify system properly handles invalid login attempts
- **Automation Steps**:
  1. Set up a POST request to `/api/set-token`
  2. Configure request body with invalid credentials:
     ```json
     {
       "email": "nonexistent@gmail.com", 
       "password": "wrongpassword"
     }
     ```
  3. Add test script to verify:
     ```javascript
     pm.test("Status code is 401", function() {
       pm.response.to.have.status(401);
     });
     pm.test("Error message is returned", function() {
       var jsonData = pm.response.json();
       pm.expect(jsonData.error).to.be.true;
       pm.expect(jsonData.message).to.exist;
     });
     ```
  4. Execute the request
- **Expected Result**: Server responds with appropriate authentication error and status 401

#### Plant Management API

##### Test Case: Retrieve All Plants
- **Objective**: Verify retrieval of all plants in the system
- **Automation Steps**:
  1. Set up a GET request to `/Plant`
  2. Add authorization header using the saved JWT token:
     ```
     Authorization: Bearer {{userToken}}
     ```
  3. Add test script to verify:
     ```javascript
     pm.test("Status code is 200", function() {
       pm.response.to.have.status(200);
     });
     pm.test("Response is an array", function() {
       var jsonData = pm.response.json();
       pm.expect(jsonData).to.be.an('array');
     });
     pm.test("Plants have required properties", function() {
       var jsonData = pm.response.json();
       if (jsonData.length > 0) {
         pm.expect(jsonData[0]).to.have.property('name');
         pm.expect(jsonData[0]).to.have.property('category');
       }
     });
     ```
  4. Execute the request
- **Expected Result**: Server returns an array of plant objects with status 200

##### Test Case: Create New Plant
- **Objective**: Verify a new plant can be created with valid data
- **Automation Steps**:
  1. Set up a POST request to `/Plant/add`
  2. Add authorization header with admin token
  3. Configure request body with valid plant data:
     ```json
     {
       "name": "Test Plant {{$timestamp}}",
       "category": "Vegetable",
       "description": "A test plant created via automation",
       "climate": "Tropical",
       "soilPH": 6.5,
       "landPreparation": "Standard preparation steps"
     }
     ```
  4. Add test script to verify:
     ```javascript
     pm.test("Status code is 201", function() {
       pm.response.to.have.status(201);
     });
     pm.test("Success message is returned", function() {
       var jsonData = pm.response.json();
       pm.expect(jsonData).to.include("New Plant Added");
     });
     // Save plant ID for later tests
     var responseBody = pm.response.json();
     if (responseBody._id) {
       pm.environment.set("plantId", responseBody._id);
     }
     ```
  5. Execute the request
- **Expected Result**: Server responds with status 201 and confirmation message

##### Test Case: Retrieve Plant By ID
- **Objective**: Verify retrieval of a specific plant by ID
- **Automation Steps**:
  1. Set up a GET request to `/Plant/{{plantId}}`
  2. Add authorization header with JWT token
  3. Add test script to verify:
     ```javascript
     pm.test("Status code is 200", function() {
       pm.response.to.have.status(200);
     });
     pm.test("Plant has correct ID", function() {
       var jsonData = pm.response.json();
       pm.expect(jsonData._id).to.equal(pm.environment.get("plantId"));
     });
     pm.test("Plant has required properties", function() {
       var jsonData = pm.response.json();
       pm.expect(jsonData).to.have.property('name');
       pm.expect(jsonData).to.have.property('category');
       pm.expect(jsonData).to.have.property('description');
     });
     ```
  4. Execute the request
- **Expected Result**: Server returns the specific plant object with status 200

##### Test Case: Update Plant
- **Objective**: Verify a plant can be updated with new information
- **Automation Steps**:
  1. Set up a PUT request to `/Plant/update/{{plantId}}`
  2. Add authorization header with admin token
  3. Configure request body with updated plant data:
     ```json
     {
       "name": "Updated Plant Name {{$timestamp}}",
       "description": "This description was updated via automation test"
     }
     ```
  4. Add test script to verify:
     ```javascript
     pm.test("Status code is 200", function() {
       pm.response.to.have.status(200);
     });
     pm.test("Success message is returned", function() {
       var jsonData = pm.response.json();
       pm.expect(jsonData.message).to.equal("Plant Updated");
     });
     ```
  5. Execute the request
- **Expected Result**: Server responds with status 200 and confirmation message

##### Test Case: Delete Plant
- **Objective**: Verify a plant can be deleted from the system
- **Automation Steps**:
  1. Set up a DELETE request to `/Plant/delete/{{plantId}}`
  2. Add authorization header with admin token
  3. Add test script to verify:
     ```javascript
     pm.test("Status code is 200", function() {
       pm.response.to.have.status(200);
     });
     pm.test("Success message is returned", function() {
       var jsonData = pm.response.json();
       pm.expect(jsonData.message).to.equal("Plant Deleted");
     });
     ```
  4. Execute the request
- **Expected Result**: Server responds with status 200 and confirmation message

#### Location Management API

##### Test Case: Create New Location
- **Objective**: Verify a new farming location can be added
- **Automation Steps**:
  1. Set up a POST request to `/Location/add`
  2. Add authorization header with farmer token
  3. Configure request body with valid location data:
     ```json
     {
       "province": "Western",
       "district": "Colombo",
       "city": "Test Location {{$timestamp}}",
       "latitude": 6.9271,
       "longitude": 79.8612,
       "areaSize": 5.75,
       "soilType": "Loamy",
       "irrigationType": "Drip"
     }
     ```
  4. Add test script to verify:
     ```javascript
     pm.test("Status code is 200", function() {
       pm.response.to.have.status(200);
     });
     pm.test("Success message is returned", function() {
       var jsonData = pm.response.json();
       pm.expect(jsonData).to.include("New Location Added");
     });
     ```
  5. Execute the request
- **Expected Result**: Server responds with status 200 and confirmation message

##### Test Case: Retrieve All Locations
- **Objective**: Verify retrieval of all farming locations
- **Automation Steps**:
  1. Set up a GET request to `/Location`
  2. Add authorization header with JWT token
  3. Add test script to verify:
     ```javascript
     pm.test("Status code is 200", function() {
       pm.response.to.have.status(200);
     });
     pm.test("Response is an array", function() {
       var jsonData = pm.response.json();
       pm.expect(jsonData).to.be.an('array');
     });
     // Save first location ID for later tests
     if (jsonData.length > 0) {
       pm.environment.set("locationId", jsonData[0]._id);
     }
     ```
  4. Execute the request
- **Expected Result**: Server returns an array of location objects with status 200

##### Test Case: Add Crop to Location
- **Objective**: Verify a crop can be added to a specific location
- **Automation Steps**:
  1. Set up a POST request to `/api/crops`
  2. Add authorization header with farmer token
  3. Configure request body with valid crop data:
     ```json
     {
       "name": "Test Crop {{$timestamp}}",
       "plantingDate": "2025-05-01",
       "harvestDate": "2025-09-01",
       "locationId": "{{locationId}}",
       "status": "Growing"
     }
     ```
  4. Add test script to verify:
     ```javascript
     pm.test("Status code is 200", function() {
       pm.response.to.have.status(200);
     });
     pm.test("Crop has been created", function() {
       var jsonData = pm.response.json();
       pm.expect(jsonData._id).to.exist;
       pm.environment.set("cropId", jsonData._id);
     });
     ```
  5. Execute the request
- **Expected Result**: Server responds with status 200 and the created crop object

#### Fertilizer Management API

##### Test Case: Create New Fertilizer
- **Objective**: Verify a new fertilizer can be added to the system
- **Automation Steps**:
  1. Set up a POST request to `/Fertilizer/add`
  2. Add authorization header with admin token
  3. Configure request body with valid fertilizer data:
     ```json
     {
       "name": "Test Fertilizer {{$timestamp}}",
       "type": "Organic",
       "composition": "N-P-K 5-10-5",
       "application": "Apply 2kg per hectare",
       "benefits": "Improves soil structure",
       "limitations": "May attract pests if overused"
     }
     ```
  4. Add test script to verify:
     ```javascript
     pm.test("Status code is 200", function() {
       pm.response.to.have.status(200);
     });
     pm.test("Success message is returned", function() {
       var jsonData = pm.response.json();
       pm.expect(jsonData).to.include("New Fertilizer Added");
     });
     ```
  5. Execute the request
- **Expected Result**: Server responds with status 200 and confirmation message

##### Test Case: Retrieve All Fertilizers
- **Objective**: Verify retrieval of all fertilizers in the system
- **Automation Steps**:
  1. Set up a GET request to `/Fertilizer`
  2. Add authorization header with JWT token
  3. Add test script to verify:
     ```javascript
     pm.test("Status code is 200", function() {
       pm.response.to.have.status(200);
     });
     pm.test("Response is an array", function() {
       var jsonData = pm.response.json();
       pm.expect(jsonData).to.be.an('array');
     });
     // Save first fertilizer ID for later tests
     if (jsonData.length > 0) {
       pm.environment.set("fertilizerId", jsonData[0]._id);
     }
     ```
  4. Execute the request
- **Expected Result**: Server returns an array of fertilizer objects with status 200

#### Cost Calculator API

##### Test Case: Calculate Farming Cost
- **Objective**: Verify cost calculation functionality for farming operations
- **Automation Steps**:
  1. Set up a POST request to `/api/costCalculator/calculate`
  2. Add authorization header with farmer token
  3. Configure request body with cost calculation data:
     ```json
     {
       "landSize": 5,
       "soilPreparation": 10000,
       "seeds": 5000,
       "fertilizer": 7500,
       "irrigation": 8000,
       "labor": 15000,
       "harvesting": 12000,
       "transportation": 5000,
       "miscellaneous": 3000,
       "cropName": "Test Crop",
       "locationName": "Test Location"
     }
     ```
  4. Add test script to verify:
     ```javascript
     pm.test("Status code is 200", function() {
       pm.response.to.have.status(200);
     });
     pm.test("Calculation is correct", function() {
       var jsonData = pm.response.json();
       pm.expect(jsonData.totalCost).to.exist;
       // Validate calculation (sum of all cost components)
       var expectedTotal = 10000 + 5000 + 7500 + 8000 + 15000 + 12000 + 5000 + 3000;
       pm.expect(jsonData.totalCost).to.equal(expectedTotal);
     });
     ```
  5. Execute the request
- **Expected Result**: Server responds with status 200 and correct cost calculation

##### Test Case: Retrieve Previous Calculations
- **Objective**: Verify retrieval of user's previous cost calculations
- **Automation Steps**:
  1. Set up a GET request to `/api/costCalculator/userCalculations`
  2. Add authorization header with farmer token
  3. Add test script to verify:
     ```javascript
     pm.test("Status code is 200", function() {
       pm.response.to.have.status(200);
     });
     pm.test("Response is an array", function() {
       var jsonData = pm.response.json();
       pm.expect(jsonData).to.be.an('array');
     });
     pm.test("Calculation history has required properties", function() {
       var jsonData = pm.response.json();
       if (jsonData.length > 0) {
         pm.expect(jsonData[0]).to.have.property('totalCost');
         pm.expect(jsonData[0]).to.have.property('cropName');
       }
     });
     ```
  4. Execute the request
- **Expected Result**: Server returns an array of previous calculations with status 200

### E2E Testing with Cypress

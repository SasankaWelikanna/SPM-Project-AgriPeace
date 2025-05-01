# Performance Testing with k6

This directory contains performance tests for the SPM Project using Grafana k6. The tests are designed to evaluate the system's performance under different scenarios.

## Prerequisites

1. Install k6 from [k6.io](https://grafana.com/docs/k6/latest/set-up/install-k6/)
2. Make sure the backend server is running on `http://localhost:5000`

## Test Types

1. **Load Tests** (`load-tests.js`)

   - Simulates normal load conditions
   - Ramps up to 20 concurrent users
   - Tests basic functionality and response times
   - Duration: 5 minutes

2. **Stress Tests** (`stress-tests.js`)

   - Tests system behavior under extreme conditions
   - Ramps up to 100 concurrent users
   - Tests system stability and error handling
   - Duration: 16 minutes

3. **Spike Tests** (`spike-tests.js`)
   - Tests system response to sudden traffic spikes
   - Alternates between normal load and spikes up to 200 users
   - Tests system's ability to handle sudden load changes
   - Duration: 5 minutes

## Running the Tests

To run the tests, use the following commands:

```bash
# Run load tests
k6 run load-tests.js

# Run stress tests
k6 run stress-tests.js

# Run spike tests
k6 run spike-tests.js
```

## Test Metrics

The tests measure the following metrics:

- Response time (95th percentile)
- Error rate
- Requests per second
- Virtual users

## Thresholds

Each test has specific thresholds:

- Load Tests:

  - 95% of requests should complete within 500ms
  - Error rate should be less than 1%

- Stress Tests:

  - 95% of requests should complete within 1000ms
  - Error rate should be less than 5%

- Spike Tests:
  - 95% of requests should complete within 2000ms
  - Error rate should be less than 10%

## Tested Endpoints

The tests cover the following endpoints:

- GET `/Plant` - Get all plants
- GET `/Fertilizer` - Get all fertilizers
- GET `/api/diseases` - Get all diseases
- POST `/api/costCalculator/calculate` - Calculate costs

## Customizing Tests

You can modify the test parameters in each test file:

- Change the number of virtual users
- Adjust the test duration
- Modify the thresholds
- Add or remove endpoints to test

## Viewing Results

k6 provides real-time metrics during test execution. For more detailed analysis, you can:

1. Export results to JSON:

```bash
k6 run --out json=results.json load-tests.js
```

2. Use Grafana for visualization (requires additional setup)

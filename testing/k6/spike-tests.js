import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "15s", target: 10 }, // Normal load
    { duration: "15s", target: 30 }, // First spike
    { duration: "15s", target: 50 }, // Second spike
    { duration: "15s", target: 10 }, // Recovery
  ],
  thresholds: {
    http_req_duration: [
      { threshold: "p(95)<5000", abortOnFail: false }, // 95% under 5s
      { threshold: "p(99)<6000", abortOnFail: false }, // 99% under 6s
    ],
    http_req_failed: ["rate<0.05"], // Less than 5% of requests should fail
  },
};

const BASE_URL = "http://localhost:3000";

// First get a token for authentication
function getToken() {
  const loginPayload = JSON.stringify({
    email: "admin@gmail.com",
    password: "admin12345",
  });

  const loginResponse = http.post(`${BASE_URL}/api/set-token`, loginPayload, {
    headers: { "Content-Type": "application/json" },
  });

  if (loginResponse.status === 200) {
    return JSON.parse(loginResponse.body).token;
  }
  return null;
}

export default function () {
  const token = getToken();
  if (!token) {
    console.error("Failed to get authentication token");
    return;
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // Test GET endpoints with concurrent requests
  const responses = http.batch([
    ["GET", `${BASE_URL}/Plant`, null, { headers }],
    ["GET", `${BASE_URL}/Fertilizer`, null, { headers }],
    ["GET", `${BASE_URL}/api/diseases`, null, { headers }],
    ["GET", `${BASE_URL}/Location`, null, { headers }],
    ["GET", `${BASE_URL}/api/crops`, null, { headers }],
  ]);

  responses.forEach((response, index) => {
    const endpoint = [
      "plants",
      "fertilizers",
      "diseases",
      "locations",
      "crops",
    ][index];
    check(response, {
      [`${endpoint} status is 200`]: (r) => r.status === 200,
      [`${endpoint} response time < 5s`]: (r) => r.timings.duration < 5000,
    });
  });

  // Test POST endpoint
  const costCalculatorPayload = JSON.stringify({
    crop: "Rice",
    area: 100,
    waterResources: "Moderate",
    soilType: "Fertile",
    userId: "test-user-id",
  });

  const costCalculatorResponse = http.post(
    `${BASE_URL}/api/costCalculator/calculate`,
    costCalculatorPayload,
    {
      headers,
      tags: { name: "cost-calculator" },
    }
  );

  check(costCalculatorResponse, {
    "cost calculator status is 200": (r) => r.status === 200,
    "cost calculator response time < 5s": (r) => r.timings.duration < 5000,
  });

  sleep(2); // Increased delay between iterations to reduce load
}

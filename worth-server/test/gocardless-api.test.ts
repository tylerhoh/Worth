import axios from 'axios';

describe('GoCardless API', () => {
  it('should list customers from GoCardless API', async () => {
    // Set up necessary environment variables (e.g., access token, GoCardless environment)
    const accessToken = process.env.GoCardlessAccessToken;
    const baseUrl = process.env.GoCardlessBaseUrl || 'https://api-sandbox.gocardless.com';

    // Make an actual HTTP request to the GoCardless API to list customers
    const response = await axios.get(`${baseUrl}/customers`, {
      headers: {
        'GoCardless-Version': '2015-07-06', // Specify API version if needed
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Assert that the HTTP request was successful (status code 200)
    expect(response.status).toBe(200);

    // Assert that the response contains an array of customers
    expect(response.data.customers).toBeDefined();
    expect(Array.isArray(response.data.customers)).toBe(true);

    // Add more assertions as needed based on the API response
  });
});
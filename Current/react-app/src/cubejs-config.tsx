import cubejs from '@cubejs-client/core';

const API_URL = 'http://localhost:4002';
const CUBEJS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTYyMzkwMjJ9.0LMuwLBMxDSB-iuHsVlB6HHIBALV8I-_1_j6L8kaJqU';

console.log('Creating cubejsApi...');
const cubejsApi = cubejs(CUBEJS_TOKEN, {
  apiUrl: `${API_URL}/cubejs-api/v1`,
});

console.log('cubejsApi created:', cubejsApi);
console.log('cubejsApi type:', typeof cubejsApi);
console.log('cubejsApi is null?', cubejsApi === null);
console.log('cubejsApi is undefined?', cubejsApi === undefined);

export default cubejsApi;
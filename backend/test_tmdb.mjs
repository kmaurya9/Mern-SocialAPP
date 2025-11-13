import axios from 'axios';

const TMDB_API_KEY = '7df3f97deeb3b34220a918e0675d0e20';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

console.log('Testing TMDB API Key Format...\n');

// Test 1: Using api_key parameter (old/deprecated)
console.log('Test 1: Using api_key parameter (DEPRECATED)');
try {
  const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
    params: {
      api_key: TMDB_API_KEY,
      query: 'inception',
      page: 1,
    },
  });
  console.log('✓ Success with api_key');
  console.log('Results:', response.data.results.length);
} catch (error) {
  console.log('✗ Error:', error.response?.status, error.response?.statusText);
  console.log('Message:', error.response?.data?.status_message);
}

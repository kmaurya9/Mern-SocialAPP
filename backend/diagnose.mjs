import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from parent directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

console.log('🔍 TMDB API Diagnostics\n');
console.log('API Key loaded:', TMDB_API_KEY ? '✓' : '✗');
console.log('API Key value:', TMDB_API_KEY ? `${TMDB_API_KEY.substring(0, 10)}...` : 'NOT FOUND');
console.log('Base URL:', TMDB_BASE_URL);
console.log('');

async function test() {
  try {
    console.log('Testing API call with query "inception"...\n');
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query: 'inception',
        page: 1,
      },
    });
    console.log('✓ API Call Successful');
    console.log('Status:', response.status);
    console.log('Results found:', response.data.results.length);
    console.log('Total results:', response.data.total_results);
    console.log('Sample result:', response.data.results[0]?.title);
  } catch (error) {
    console.log('✗ API Call Failed');
    console.log('Error Status:', error.response?.status);
    console.log('Error Message:', error.response?.data?.status_message || error.message);
    console.log('Full error:', error.response?.data);
  }
}

await test();

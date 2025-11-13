# 🎬 Movie Search Debugging Guide

## Quick Start

### Issue
Movie search is giving an error when you try to search for movies.

### Solution Status
✅ **FIXED** - Enhanced error handling and logging implemented

---

## 🚀 Getting Started

### Step 1: Start Backend
```bash
cd "/Users/kshitij/MERN Projects/Mern-Social/backend"
node index.js
```

You should see:
```
Environment check - TMDB_API_KEY exists: true
Server is running on http://localhost:3000
Connected To MongoDb
```

### Step 2: Start Frontend
```bash
cd "/Users/kshitij/MERN Projects/Mern-Social/frontend"
npm run dev
```

### Step 3: Test Search
1. Open http://localhost:5173 (or whatever port Vite shows)
2. Navigate to Search page
3. Click "Search Movies" button
4. Type a movie name (e.g., "Inception")
5. Click Search

---

## 🔍 Understanding the Logs

### Backend Console Output

#### Success Example
```
[TMDB Search] Query: inception
[TMDB Search] API Key loaded: true
[TMDB Search] Calling TMDB API for: inception
[TMDB Search] Success - Found 20 results for: inception
```

#### Error Example (Empty Query)
```
[TMDB Search] Query: 
[TMDB Search] API Key loaded: true
```
Response: `{"message":"Please provide a search query"}`

#### Error Example (Network Issue)
```
[TMDB Search] API Error: {
  status: 500,
  statusText: 'Internal Server Error',
  message: 'getaddrinfo ENOTFOUND api.themoviedb.org',
  query: 'inception'
}
```

### Frontend Console Output (Browser F12)

#### Success
```
[Movie Search] Searching for: inception
[Movie Search] Found 20 results
```

#### Error
```
[Movie Search] Error: AxiosError
  Response: 500
  Data: {message: "Server error..."}
```

---

## 🐛 Troubleshooting

### Issue 1: "Error searching movies" - Network Error

**Cause**: Backend server is not running

**Solution**:
```bash
# Check if backend is running
ps aux | grep "node index.js"

# If not running, start it
cd backend
node index.js
```

**Look for**: Should see port 3000 in logs

---

### Issue 2: "Error searching movies" - Server Error

**Cause**: TMDB API key is invalid or TMDB is down

**Solution**:
```bash
# Check environment variable
cat ../.env | grep TMDB_API_KEY

# Test TMDB API directly
curl "https://api.themoviedb.org/3/search/movie?api_key=YOUR_KEY&query=test"
```

**Look for**: 
- Should get JSON response with results
- Should NOT get `{"status_code": 34, "status_message": "The resource you requested could not be found"}`

---

### Issue 3: "Please enter a search query" - Empty Input

**Cause**: User didn't enter anything or only spaces

**Solution**: Just type something in the search box!

**Look for**: Toast message appears at top of screen

---

### Issue 4: Nothing Happens When Searching

**Cause**: Multiple possibilities

**Debug Steps**:

1. **Open Browser Console** (F12 → Console tab)
   - Look for any red error messages
   - Look for `[Movie Search]` logs
   - Check Network tab for failed requests

2. **Check Backend Logs**
   - Should see `[TMDB Search] Query: ...`
   - Note any error messages
   - Copy error and paste it below for help

3. **Test Backend Directly**
   ```bash
   curl "http://localhost:3000/api/movies/search?query=inception"
   ```
   - Should return JSON with movie results
   - If error, note the error message

4. **Test TMDB API**
   ```bash
   curl "https://api.themoviedb.org/3/search/movie?api_key=YOUR_KEY&query=inception"
   ```
   - Check if external API is responding

---

## 📊 Error Messages & What They Mean

| Frontend Error | Backend Logs | Meaning | Fix |
|---|---|---|---|
| "Network error - Unable to connect" | No logs appear | Backend not running | Start backend: `node index.js` |
| "Server error - TMDB API may be unavailable" | `[TryCatch Error] status: 500` | TMDB API problem | Check API key, restart, or wait for TMDB |
| "Request timeout" | No response logged | Slow connection or stuck process | Check internet, restart backend |
| "Please enter a search query" | `[TMDB Search] Query: ` | Empty search field | Type something in search box |
| Works! ✓ | `[TMDB Search] Success - Found X results` | Perfect! | Everything working |

---

## 🔧 Advanced Debugging

### Enable More Detailed Logs

1. Open `backend/controllers/movieControllers.js`
2. Find the searchMovies function
3. Add more console.logs as needed
4. Restart backend

### Test with Different Queries

```bash
# Test different queries
curl "http://localhost:3000/api/movies/search?query=avatar"
curl "http://localhost:3000/api/movies/search?query=batman"
curl "http://localhost:3000/api/movies/search?query=a"  # Very short

# Test edge cases
curl "http://localhost:3000/api/movies/search?query=   "  # Only spaces
curl "http://localhost:3000/api/movies/search"  # Missing query parameter
```

### Monitor Network Requests

1. Open Browser DevTools (F12)
2. Go to Network tab
3. Perform search
4. Look for `/api/movies/search?query=...` request
5. Check:
   - Status code (should be 200)
   - Response (should have "results" array)
   - Time taken

---

## 💡 Common Solutions

### Solution 1: Clear Cache & Restart

```bash
# Kill backend
pkill -f "node index.js"

# Clear node modules cache
rm -rf node_modules/.cache

# Restart
cd backend
node index.js
```

### Solution 2: Verify Environment

```bash
# Check all variables
echo "Node version: $(node -v)"
echo "npm version: $(npm -v)"
echo "TMDB API Key: $(grep TMDB_API_KEY ../.env | cut -d= -f2)"
```

### Solution 3: Test Each Layer

```bash
# Layer 1: TMDB API
curl "https://api.themoviedb.org/3/search/movie?api_key=YOUR_KEY&query=test"

# Layer 2: Backend API
curl "http://localhost:3000/api/movies/search?query=test"

# Layer 3: Frontend (use browser console)
// Type in browser console:
fetch('/api/movies/search?query=test').then(r => r.json()).then(console.log)
```

---

## 📱 Quick Copy-Paste Commands

### Check Backend Status
```bash
ps aux | grep "node index.js" | grep -v grep && echo "✓ Running" || echo "✗ Not running"
```

### Kill All Node Processes
```bash
pkill -f node
```

### Start Backend with Output
```bash
cd "/Users/kshitij/MERN Projects/Mern-Social/backend" && node index.js
```

### Test Movie Search
```bash
curl "http://localhost:3000/api/movies/search?query=inception" | python3 -m json.tool
```

### Monitor Backend Logs
```bash
cd "/Users/kshitij/MERN Projects/Mern-Social/backend" && node index.js 2>&1 | tee search.log
```

---

## 📝 Reporting Issues

If you still have problems, provide:

1. **Backend Log Output**
   ```
   [Paste the full terminal output here]
   ```

2. **Browser Console Error**
   ```
   [Paste any red errors here]
   ```

3. **What You Searched For**
   ```
   e.g., "Inception"
   ```

4. **Expected vs Actual**
   ```
   Expected: List of movies appears
   Actual: Error message appears
   ```

---

## ✅ Verification Checklist

- [ ] Backend shows: "Server is running on http://localhost:3000"
- [ ] Backend shows: "Connected To MongoDb"
- [ ] Backend shows: "TMDB_API_KEY exists: true"
- [ ] Frontend dev server is running (shows URL)
- [ ] No errors in browser console (F12)
- [ ] No errors in backend console
- [ ] curl test returns JSON: `curl "http://localhost:3000/api/movies/search?query=test"`
- [ ] Search for a movie works and shows results

If all checked, your setup is working! 🎉

---

## 🚀 Next Steps

Once search is working:

1. **Explore Features**
   - Try different movie searches
   - Click on movie details
   - Add reviews

2. **Monitor Logs**
   - Watch backend console for patterns
   - Note any repeated errors
   - Check response times

3. **Optimize**
   - Consider adding search caching
   - Add search history
   - Implement search suggestions

---

## 📞 Questions?

Check:
1. This debugging guide (you're reading it!)
2. `MOVIE_SEARCH_FIX_SUMMARY.md` - Technical details
3. `MOVIE_SEARCH_ANALYSIS.md` - Detailed analysis
4. Backend console logs - Most helpful!

Good luck! 🎬✨

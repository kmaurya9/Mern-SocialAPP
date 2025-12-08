import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { LoadingAnimation } from "../components/Loading";
import { MovieData } from "../context/MovieContext";
import { UserData } from "../context/UserContext";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [searchType, setSearchType] = useState("users"); // 'users' or 'movies'
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { movies, searchMovies } = MovieData();
  const { isAuth } = UserData();

  // Load search from URL params on mount
  useEffect(() => {
    const queryParam = searchParams.get("query");
    const typeParam = searchParams.get("type") || "users";
    if (queryParam) {
      setSearch(queryParam);
      setSearchType(typeParam);
    }
  }, []);

  // Search users - simple and direct like searchMovies
  const searchUsers = async (query) => {
    setLoading(true);
    try {
      if (!query || query.trim() === "") {
        // Clear results immediately when query is empty
        setUsers([]);
        setLoading(false);
        return [];
      }

      console.log("[User Search] Searching for:", query);
      
      // Use public endpoint for anonymous users, protected endpoint for authenticated users
      const endpoint = isAuth ? "/api/user/all?search=" + query : "/api/user/search/public?search=" + query;
      const { data } = await axios.get(endpoint);
      
      console.log("[User Search] Found", data.length, "results");
      setUsers(data || []);
      setLoading(false);
      return data;
    } catch (error) {
      console.error("[User Search] Error:", error);
      
      let errorMessage = "Error searching users";
      
      if (error.response?.status === 400) {
        errorMessage = error.response?.data?.message || "Invalid search query";
      } else if (error.response?.status === 500) {
        errorMessage = error.response?.data?.message || "Server error";
      } else if (error.code === "ECONNABORTED") {
        errorMessage = "Request timeout";
      } else if (error.message === "Network Error" || !error.response) {
        errorMessage = "Network error - Unable to connect";
      }
      
      toast.error(errorMessage);
      setUsers([]);
      setLoading(false);
    }
  };

  // Search whenever input changes
  useEffect(() => {
    // Update URL params
    if (search.trim()) {
      setSearchParams({ query: search, type: searchType });
    } else {
      setSearchParams({});
    }

    if (searchType === "users") {
      searchUsers(search);
    } else {
      searchMovies(search);
    }
  }, [search, searchType]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Search is already happening on every keystroke, so just prevent default
      e.preventDefault();
    }
  };

  return (
    <div className={`bg-gray-100 min-h-screen pb-20 ${!isAuth ? 'pt-20' : 'pt-20'}`}>
      <div className="flex justify-center items-center flex-col pt-5">
        {/* Search Type Toggle */}
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setSearchType("users")}
            className={`px-4 py-2 rounded-md ${
              searchType === "users"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            Search Users
          </button>
          <button
            onClick={() => setSearchType("movies")}
            className={`px-4 py-2 rounded-md ${
              searchType === "movies"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            Search Movies
          </button>
        </div>

        {/* Search Bar */}
        <div className="search flex justify-center items-center gap-4 mb-4">
          <input
            type="text"
            className="custom-input px-4 py-2 w-64"
            style={{ border: "gray solid 1px" }}
            placeholder={
              searchType === "users" ? "Enter Name" : "Enter Movie Title"
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>

        {loading ? (
          <LoadingAnimation />
        ) : (
          <>
            {/* User Results */}
            {searchType === "users" && (
              <div className="w-full max-w-2xl px-4">
                <h2 className="text-xl font-bold mb-4 text-center">Users</h2>
                {users && users.length > 0 ? (
                  <div className="space-y-2">
                    {users.map((e) => (
                      <div key={e._id}>
                        {isAuth ? (
                          <Link
                            className="px-4 py-3 bg-white rounded-md flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer"
                            to={`/profile/${e._id}`}
                          >
                            <img
                              src={e.profilePic?.url || "/default-avatar.png"}
                              alt=""
                              className="w-12 h-12 rounded-full"
                            />
                            <div className="flex-1">
                              <p className="font-semibold">{e.name}</p>
                              {isAuth && <p className="text-sm text-gray-600">{e.email}</p>}
                              {!isAuth && (
                                <p className="text-sm text-gray-600">
                                  {e.followers?.length || 0} followers · {e.followings?.length || 0} following
                                </p>
                              )}
                            </div>
                          </Link>
                        ) : (
                          <div className="px-4 py-3 bg-white rounded-md flex items-center gap-3 cursor-not-allowed opacity-70">
                            <img
                              src={e.profilePic?.url || "/default-avatar.png"}
                              alt=""
                              className="w-12 h-12 rounded-full"
                            />
                            <div className="flex-1">
                              <p className="font-semibold">{e.name}</p>
                              <p className="text-sm text-gray-600">
                                {e.followers?.length || 0} followers · {e.followings?.length || 0} following
                              </p>
                            </div>
                            <button
                              onClick={() => window.location.href = '/login'}
                              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                            >
                              Login to View
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-md p-8 text-center">
                    <p className="text-gray-500 mb-2">
                      {search ? "No users found" : "Enter a name to search"}
                    </p>
                    {search && <p className="text-sm text-gray-400">Try a different search term</p>}
                  </div>
                )}
              </div>
            )}

            {/* Movie Results */}
            {searchType === "movies" && (
              <div className="w-full max-w-4xl">
                <h2 className="text-xl font-bold mb-4 text-center">Movies</h2>
                {movies && movies.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {movies.map((movie) => (
                      <Link
                        key={movie.id}
                        to={`/details/${movie.id}`}
                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                      >
                        <img
                          src={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                              : "/placeholder-movie.png"
                          }
                          alt={movie.title}
                          className="w-full h-64 object-cover"
                        />
                        <div className="p-3">
                          <h3 className="font-semibold text-sm line-clamp-2">
                            {movie.title}
                          </h3>
                          <p className="text-xs text-gray-600 mt-1">
                            {movie.release_date?.split("-")[0]}
                          </p>
                          <div className="flex items-center mt-2">
                            <span className="text-yellow-500 text-sm">★</span>
                            <span className="text-sm ml-1">
                              {movie.vote_average?.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500">
                    {search
                      ? "No movies found"
                      : "Enter a movie title to search"}
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;

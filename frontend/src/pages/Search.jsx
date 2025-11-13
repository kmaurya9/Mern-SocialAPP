import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
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
  const debounceTimer = useRef(null);

  // Get search query from URL on component mount
  useEffect(() => {
    const query = searchParams.get("query");
    const type = searchParams.get("type") || "users";
    if (query) {
      setSearch(query);
      setSearchType(type);
      if (type === "users") {
        fetchUsers(query);
      } else {
        handleSearchMovies(query);
      }
    }
  }, []);

  // Auto-search when search input changes (with debounce)
  useEffect(() => {
    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // If search is empty, clear results
    if (!search.trim()) {
      setUsers([]);
      searchMovies(""); // This will clear movies in context
      return;
    }

    // Set new timer for debounced search
    debounceTimer.current = setTimeout(() => {
      setSearchParams({ query: search, type: searchType });
      
      if (searchType === "users") {
        fetchUsers(search);
      } else {
        handleSearchMovies(search);
      }
    }, 500); // Wait 500ms after user stops typing

    // Cleanup timer on unmount
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [search, searchType]);

  async function fetchUsers(query = search) {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/user/all?search=" + query);
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function handleSearchMovies(query = search) {
    setLoading(true);
    await searchMovies(query);
    setLoading(false);
  }

  // Manual search function (used when Enter is pressed)
  const handleSearch = () => {
    if (!search.trim()) {
      toast.error("Please enter a search query");
      return;
    }
    
    // Trigger search immediately (no debounce for manual search)
    setSearchParams({ query: search, type: searchType });
    
    if (searchType === "users") {
      fetchUsers(search);
    } else {
      handleSearchMovies(search);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
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
              <div className="w-full max-w-2xl">
                <h2 className="text-xl font-bold mb-4 text-center">Users</h2>
                {users && users.length > 0 ? (
                  users.map((e) => (
                    <Link
                      key={e._id}
                      className="mt-3 px-4 py-3 bg-white rounded-md flex items-center gap-3 hover:shadow-md transition-shadow"
                      to={`/profile/${e._id}`}
                    >
                      <img
                        src={e.profilePic.url}
                        alt=""
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{e.name}</p>
                        <p className="text-sm text-gray-600">{e.email}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    {search ? "No users found" : "Enter a name to search"}
                  </p>
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

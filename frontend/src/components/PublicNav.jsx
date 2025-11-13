import React from "react";
import { Link } from "react-router-dom";
import { IoSearchCircleOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";

const PublicNav = () => {
  return (
    <div className="fixed top-0 w-full bg-white shadow-md py-3 px-4 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
          <AiOutlineHome className="text-2xl" />
          <span>Mern Social</span>
        </Link>
        <div className="flex gap-4 items-center">
          <Link
            to="/search"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <IoSearchCircleOutline className="text-2xl" />
            <span className="hidden md:inline">Search</span>
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PublicNav;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { IoSearchCircleOutline, IoSearchCircle } from "react-icons/io5";
import {
  IoChatbubbleEllipses,
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";
import { RiAccountCircleFill, RiAccountCircleLine } from "react-icons/ri";
import { UserData } from "../context/UserContext";

const NavigationBar = () => {
  const [tab, setTab] = useState(window.location.pathname);
  const { user } = UserData();

  return (
    <>
      {/* Top Header with User Info */}
      <div className="bg-white border-b border-gray-200 p-3 sm:p-4 shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition min-w-0">
            <div className="w-8 h-8 bg-gradient-to-l from-blue-400 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              M
            </div>
            <span className="font-bold text-sm sm:text-lg hidden xs:inline whitespace-nowrap">MovieApp</span>
          </Link>
          {user && (
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <img 
                src={user.profilePic?.url} 
                alt={user.name} 
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-blue-400 flex-shrink-0"
                title={`Logged in as ${user.name}`}
              />
              <div className="hidden xs:flex flex-col min-w-0">
                <p className="font-medium text-gray-900 text-xs sm:text-sm truncate">{user.name}</p>
                <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                  <p className="text-xs text-green-600 whitespace-nowrap">● Online</p>
                  <span className="text-xs bg-blue-100 text-blue-800 px-1.5 sm:px-2 py-0.5 rounded-full capitalize font-medium whitespace-nowrap">
                    {user.role}
                  </span>
                </div>
              </div>
              {user.role === 'curator' && (
                <Link to="/curator" className="ml-2 text-xs bg-purple-500 hover:bg-purple-600 text-white px-2 sm:px-3 py-1 rounded transition whitespace-nowrap flex-shrink-0">
                  Dashboard
                </Link>
              )}
              {user.role === 'admin' && (
                <Link to="/admin" className="ml-2 text-xs bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1 rounded transition whitespace-nowrap flex-shrink-0">
                  Admin
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 shadow-lg">
        <div className="flex justify-around items-center">
          <Link
            to={"/"}
            onClick={() => setTab("/")}
            className="flex flex-col items-center justify-center p-3 min-w-12 min-h-12 text-2xl transition-transform hover:scale-110 active:scale-95"
            title="Home"
            aria-label="Home"
          >
            <span className={tab === "/" ? "text-blue-500" : "text-gray-600"}>
              {tab === "/" ? <AiFillHome /> : <AiOutlineHome />}
            </span>
            <span className="text-xs mt-1 font-medium">Home</span>
          </Link>
          <Link
            onClick={() => setTab("/search")}
            to={"/search"}
            className="flex flex-col items-center justify-center p-3 min-w-12 min-h-12 text-2xl transition-transform hover:scale-110 active:scale-95"
            title="Search movies and users"
            aria-label="Search"
          >
            <span className={tab === "/search" ? "text-blue-500" : "text-gray-600"}>
              {tab === "/search" ? <IoSearchCircle /> : <IoSearchCircleOutline />}
            </span>
            <span className="text-xs mt-1 font-medium">Search</span>
          </Link>
          <Link
            onClick={() => setTab("/chat")}
            to={"/chat"}
            className="flex flex-col items-center justify-center p-3 min-w-12 min-h-12 text-2xl transition-transform hover:scale-110 active:scale-95"
            title="Chat with friends"
            aria-label="Chat"
          >
            <span className={tab === "/chat" ? "text-blue-500" : "text-gray-600"}>
              {tab === "/chat" ? (
                <IoChatbubbleEllipses />
              ) : (
                <IoChatbubbleEllipsesOutline />
              )}
            </span>
            <span className="text-xs mt-1 font-medium">Chat</span>
          </Link>
          <Link
            onClick={() => setTab("/profile")}
            to={"/profile"}
            className="flex flex-col items-center justify-center p-3 min-w-12 min-h-12 text-2xl transition-transform hover:scale-110 active:scale-95"
            title="My Profile"
            aria-label="Profile"
          >
            <span className={tab === "/profile" || tab === "/account" ? "text-blue-500" : "text-gray-600"}>
              {tab === "/profile" || tab === "/account" ? (
                <RiAccountCircleFill />
              ) : (
                <RiAccountCircleLine />
              )}
            </span>
            <span className="text-xs mt-1 font-medium">Profile</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;

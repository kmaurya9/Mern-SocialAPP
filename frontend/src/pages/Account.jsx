import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";
import PostCard from "../components/PostCard";
import Modal from "../components/Modal";
import axios from "axios";
import { Loading } from "../components/Loading";
import { CiEdit } from "react-icons/ci";

const Account = ({ user }) => {
  const navigate = useNavigate();
  const { logoutUser, updateProfilePic, updateProfileName } = UserData();
  const { posts, loading } = PostData();

  // Initialize state properly
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [followersData, setFollowersData] = useState([]);
  const [followingsData, setFollowingsData] = useState([]);
  const [file, setFile] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState("");

  // Get my posts
  let myPosts = [];

  if (user && posts && posts.length > 0) {
    myPosts = posts.filter((post) => post.owner._id === user._id);
  }

  // Load follow data
  async function followData() {
    try {
      const { data } = await axios.get("/api/user/followdata/" + user._id);
      setFollowersData(data.followers);
      setFollowingsData(data.followings);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user) {
      setName(user.name);
      followData();
    }
  }, [user]);

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const changleImageHandler = () => {
    const formdata = new FormData();
    formdata.append("file", file);
    updateProfilePic(user._id, formdata, setFile);
  };

  const UpdateName = () => {
    updateProfileName(user._id, name, setShowInput);
  };

  const logoutHandler = () => {
    logoutUser(navigate);
  };

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>Please log in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-20 pb-20">
      {show && (
        <Modal
          value={followersData}
          title={"Followers"}
          setShow={setShow}
        />
      )}
      {show1 && (
        <Modal
          value={followingsData}
          title={"Followings"}
          setShow={setShow1}
        />
      )}

      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center gap-4">
              <img
                src={user.profilePic?.url}
                alt={user.name}
                className="w-40 h-40 rounded-full border-4 border-blue-500 object-cover"
              />
              <div className="w-full">
                <input
                  type="file"
                  onChange={changeFileHandler}
                  className="block w-full text-sm border border-gray-300 rounded px-2 py-1"
                />
                <button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2 transition"
                  onClick={changleImageHandler}
                >
                  Update Picture
                </button>
              </div>
            </div>

            {/* User Info Section */}
            <div className="flex-1 space-y-4">
              {/* Name */}
              <div>
                <label className="text-gray-600 text-sm font-semibold">Name</label>
                {showInput ? (
                  <div className="flex gap-2 mt-2">
                    <input
                      className="flex-1 border border-gray-300 rounded px-3 py-2"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Name"
                    />
                    <button
                      onClick={UpdateName}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setShowInput(false)}
                      className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-900 font-semibold text-lg">{user.name}</p>
                    <button
                      onClick={() => setShowInput(true)}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <CiEdit size={24} />
                    </button>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-600 text-sm font-semibold">Email</label>
                <p className="text-gray-700 mt-1">{user.email}</p>
              </div>

              {/* Gender */}
              <div>
                <label className="text-gray-600 text-sm font-semibold">Gender</label>
                <p className="text-gray-700 mt-1 capitalize">{user.gender}</p>
              </div>

              {/* Role */}
              <div>
                <label className="text-gray-600 text-sm font-semibold">Role</label>
                <p className="text-gray-700 mt-1 capitalize bg-blue-50 inline-block px-3 py-1 rounded text-blue-800 font-semibold">{user.role}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center cursor-pointer hover:bg-gray-50 p-2 rounded" onClick={() => setShow(true)}>
                  <p className="text-2xl font-bold text-blue-600">{user.followers?.length || 0}</p>
                  <p className="text-gray-600 text-sm">Followers</p>
                </div>
                <div className="text-center cursor-pointer hover:bg-gray-50 p-2 rounded" onClick={() => setShow1(true)}>
                  <p className="text-2xl font-bold text-blue-600">{user.followings?.length || 0}</p>
                  <p className="text-gray-600 text-sm">Following</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{myPosts.length}</p>
                  <p className="text-gray-600 text-sm">Posts</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Posts */}
          <div className="space-y-4">
            {myPosts && myPosts.length > 0 ? (
              myPosts.map((post) => (
                <PostCard key={post._id} value={post} type="post" />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No posts yet</p>
                <p className="text-gray-400 text-sm mt-2">Share your first post to get started</p>
              </div>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={logoutHandler}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;

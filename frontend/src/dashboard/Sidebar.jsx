import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../utils/backendUrl";
import { IoMenuOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";
import toast from "react-hot-toast";

const Sidebar = ({ setComponent }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { profile } = useAuth();
  console.log("proil", profile);

  const handleComopnents = (value) => {
    setComponent(value);
  };

  const handlelogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/user/logout`, {
        withCredentials: true,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  if (profile?.role !== "admin") {
    navigate("/");
  }

  return (
    <>
      <div
        className="sm:hidden fixed top-4 left-4 z-50"
        onClick={() => setShow(!show)}
      >
        <IoMenuOutline className="text-2xl" />
      </div>
      <div
        className={`p-4 w-64 h-full shadow-lg fixed top-0 left-0 bg-gray-50 transition-transform duration-300 transform sm:translate-x-0 ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="sm:hidden absolute top-4 right-4 text-xl cursor-pointer"
          onClick={() => setShow(!show)}
        >
          <FaArrowLeft className="text-2xl" />
        </div>
        <div className="text-center">
          <img
            src={profile?.photo}
            alt=""
            className="w-24 h-24 rounded-full mx-auto"
          />
          <p className="text-lg font-semibold">{profile?.name}</p>
        </div>
        <ul className="space-y-6">
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-black hover:text-white mb-4"
            onClick={() => handleComopnents("")}
          >
            MY BLOGS
          </button>
          <button
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-yellow-500 hover:text-black mb-4"
            onClick={() => handleComopnents("Create Blog")}
          >
            CREATE BLOGS
          </button>
          <button
            onClick={() => handleComopnents("My Profile")}
            className="w-full bg-orange-900 text-white py-2 px-4 rounded-md hover:bg-pink-500  mb-4"
          >
            MY PROFILE
          </button>
          <button
            className="w-full bg-slate-950 text-white py-2 px-4 rounded-md hover:bg-violet-950 hover:text-white mb-4"
            onClick={() => navigate("/")}
          >
            HOME
          </button>
          <button
            className="w-full bg-yellow-800 text-white py-2 px-4 rounded-md hover:bg-orange-500"
            onClick={handlelogout}
          >
            LOGOUT
          </button>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;

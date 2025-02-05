import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/backendUrl";

const Navbar = () => {
  const navigate = useNavigate();
  const { profile, isAutheticated, setIsAutheticated } = useAuth();

  console.log("jjj", isAutheticated);

  const [show, setShow] = useState(false);
  const handlelogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/user/logout`, {
        withCredentials: true,
      });
      if (data.success) {
        toast.success(data.message);
        console.log("pilli", data);
        navigate("/login");

        setIsAutheticated(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full shadow-lg py-2 lg:px-8 bg-white z-50">
        <div className="flex justify-between container items-center mx-auto px-8">
          <div className=" font-bold text-xl">
            GK <span className="text-blue-500">Blog</span>
          </div>
          <div className="hidden md:block">
            <ul className="flex space-x-6 md:space-x-3">
              <Link to="/">HOME</Link>
              <Link to="/blogs">BLOGS</Link>
              <Link to="/creators">CREATORS</Link>
              <Link to="/about">ABOUT</Link>
              <Link to="/contact">CONTACT</Link>
            </ul>
          </div>
          <div
            onClick={() => setShow(!show)}
            className="sm-flex md:hidden relative"
          >
            <FaBars size={24} />
          </div>
          <div className="space-x-2 hidden md:flex">
            {isAutheticated && profile?.role === "admin" ? (
              <Link to="/dashboard">
                <button className="btn bg-blue-500 hover:bg-blue-600 text-white">
                  DASHBOARD
                </button>
              </Link>
            ) : (
              <div></div>
            )}
            {isAutheticated ? (
              <div>
                <button
                  className="btn bg-red-500 hover:bg-blue-600 text-white"
                  onClick={handlelogout}
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className="btn bg-red-500 hover:bg-blue-600 text-white">
                  LOGIN
                </button>
              </Link>
            )}
          </div>
        </div>
        {show && (
          <ul className="flex flex-col p-4">
            <Link to="/">HOME</Link>
            <Link to="/blogs">BLOGS</Link>
            <Link to="/creators">CREATORS</Link>
            <Link to="/about">ABOUT</Link>
            <Link to="/contact">CONTACT</Link>
          </ul>
        )}
      </nav>
    </>
  );
};

export default Navbar;

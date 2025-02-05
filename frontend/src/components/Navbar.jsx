
import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/backendUrl";
import { MdCancel } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { IoMdLogIn } from "react-icons/io";

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

          <div className="space-x-2 flex items-center">
            {isAutheticated && profile?.role === "admin" ? (
              <Link to="/dashboard">
                <button
                  className="btn bg-blue-500 hover:bg-black 
                text-white hidden md:flex"
                >
                  DASHBOARD
                </button>
                <button className="text-xs bg-blue-500  rounded-md px-2 py-2 hover:bg-black sm:hidden text-white">
                  DASHBOARD
                </button>
              </Link>
            ) : (
              <div></div>
            )}
            {isAutheticated ? (
              <div>
                <BiLogOut
                  size={20}
                  className="sm:hidden"
                  onClick={handlelogout}
                />
                <button
                  className="btn bg-red-500 hover:bg-blue-600 text-white hidden md:flex"
                  onClick={handlelogout}
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <div>
                <Link to="/login">
                  <button className="btn bg-red-500 hover:bg-blue-600 text-white">
                    LOGIN
                  </button>
                </Link>
                <Link to="/login" className="sm:hidden">
                  <IoMdLogIn size={20} />
                </Link>
              </div>
            )}
          </div>
        </div>
        <div
          onClick={() => setShow(!show)}
          className="ml-5 pt-2 sm-flex md:hidden relative"
        >
          <FaBars size={15} />
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
        {show && (
          <div
            onClick={() => setShow(!show)}
            className="ml-12 sm-flex md:hidden relative flex justify-end"
          >
            <MdCancel size={20} />
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

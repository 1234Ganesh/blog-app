import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/backendUrl";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",

    password: "",
    role: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);

    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/user/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("gggg", data);

      if (data.success) {
        toast.success(data.message);

        setInput({
          email: "",
          password: "",
          role: "",
        });
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response.data.message || "Please fi;; the required fields"
      );
    }
  };

  const onChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-xl">
        <div className="font-bold text-xl text-center mb-6">
          GK <span className="text-blue-500">Blog</span>
        </div>
        <h1 className="text-black text-xl font-semibold">Register</h1>
        <form onSubmit={submitHandler}>
          <div className="mt-4">
            <input
              type="email"
              name="email"
              value={input.email}
              className="w-full p-2 border rounded-md bg-white"
              placeholder="Your Email"
              onChange={onChangeHandler}
            />
          </div>

          <div className="mt-4">
            <input
              type="password"
              name="password"
              value={input.password}
              className="w-full p-2 border rounded-md"
              onChange={onChangeHandler}
              placeholder="Your Password"
            />
          </div>

          <div className="flex items-center mt-6 mb-4">
            <div className="flex items-center">
              <input
                type="radio"
                className="radio 
              radio-primary me-2"
                value="user"
                name="role"
                onChange={onChangeHandler}
                checked={input.role === "user"}
              />
              <h1 className="text-lg me-4">User</h1>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                className="radio radio-primary me-4"
                name="role"
                onChange={onChangeHandler}
                checked={input.role === "admin"}
                value="admin"
              />
              <h1 className="text-lg me-4">Admin</h1>
            </div>
          </div>
          <div className="mb-4">
            <h1 className="text-center text-lg">
              New User?
              <Link className="text-blue-600" to="/register">
                Register Now
              </Link>
            </h1>
          </div>

          <button className="btn text-white bg-blue-500 w-full hover:bg-blue-600 duration-300">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

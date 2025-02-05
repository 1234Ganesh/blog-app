import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/backendUrl";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    education: "",
    file: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("phone", input.phone);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("education", input.education);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/user/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(data.success);
      toast.success(data.message);

      navigate("/login");
      setInput({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "",
        education: "",
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const onChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onChangeFileHadler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
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
              type="text"
              name="name"
              value={input.name}
              className="w-full p-2 border rounded-md bg-white"
              placeholder="Your FullName"
              onChange={onChangeHandler}
            />
          </div>
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
              type="number"
              name="phone"
              value={input.phone}
              className="w-full p-2 border rounded-md"
              onChange={onChangeHandler}
              placeholder="Your PhoneNumber"
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

          <select
            className="w-full p-2 mt-4 border rounded-md"
            value={input.education}
            onChange={onChangeHandler}
            name="education"
          >
            <option value="" disabled>
              Selcted your Education
            </option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
            <option value="MBA">MBA</option>
            <option value="BBA">BBA</option>
            <option value="BCOM">BCOM</option>
            <option value="BA">BA</option>
            <option value="BTECH">BTECH</option>
            <option value="MTECH">MTECH</option>

            <option value="OTHER">OTHER</option>

            <option value="">BSC</option>
          </select>
          <div className="mt-4">
            <input
              type="file"
              accept="image/*"
              onChange={onChangeFileHadler}
              className="w-full border p-2 rounded-md"
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
              Already registered?
              <Link className="text-blue-600" to="/login">
                Login Now
              </Link>
            </h1>
          </div>

          <button className="btn text-white bg-blue-500 w-full hover:bg-blue-600 duration-300">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

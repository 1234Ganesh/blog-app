import React from "react";
import { FaPhone } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { z } from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState({});

  const loginSchema = z.object({
    name: z.string().min(3, "The Field is required"),
    email: z
      .string()
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "The Field is required"
      ),
    message: z.string().min(2, "The Field is required"),
  });

  const onChangeHadler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formData);

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const errorField = result.error.formErrors.fieldErrors;
      setError(errorField);
      return;
    } else {
      setError("");
    }
    const form = new FormData();
    form.append("access_key", "27cb3fec-37c9-46e3-adcc-00120f2a61a9");
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("message", formData.message);
    try {
      const res = await axios.post("https://api.web3forms.com/submit", form);
      toast.success("Message send successsfully");
      console.log(res);
    } catch (error) {
      toast.error("An error some occured");
      console.log(error);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full shadow-xl bg-white p-8 rounded-lg max-w-4xl">
        <div className="text-center">
          <h1 className="text-gray-800 text-xl font-semibold">Contact</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 my-8 gap-6">
          <div>
            <div className="mb-4">
              <h1 className="text-lg">Send us a message</h1>
            </div>
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  onChange={onChangeHadler}
                  value={formData.name}
                  placeholder="YOUR NAME"
                  className="w-full p-2 border rounded-md bg-white mb-2"
                />
                <p className="text-red-600 font-semibold">
                  {error && error.name}
                </p>
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onChangeHadler}
                  placeholder="YOUR email"
                  className="w-full p-2 border rounded-md bg-white mb-2"
                />
                <p className="text-red-600 font-semibold">
                  {error && error.email}
                </p>
              </div>
              <div className="mb-4">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={onChangeHadler}
                  className="w-full p-2 bg-white border border-black rounded-md mb-2"
                  rows="4"
                ></textarea>
                <p className="text-red-600 font-semibold">
                  {error && error.message}
                </p>
              </div>
              <button className="w-full bg-blue-600 text-white text-center p-2 rounded-lg">
                Submit
              </button>
            </form>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="mb-4">
              <h1 className="text-lg"></h1> Contact information
            </div>
            <div className="flex items-center gap-2 mb-4">
              <FaPhone />
              <h1> +919829325968</h1>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <MdOutlineEmail />
              <h1>help@ganeshblog.com</h1>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt />
              <h1>Delhi,NCR India</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

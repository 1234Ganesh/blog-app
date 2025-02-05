import axios from "axios";
import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/backendUrl";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [input, setInput] = useState({
    title: "",
    category: "",
    about: "",
    file: null,
    blogImage: "",
  });

  useEffect(() => {
    const updateData = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/blogs/single-blog/${id}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        console.log("ghabshh", data);
        toast.success(data.message);
        setInput({
          title: data?.blog?.title || "",
          category: data?.blog?.category || "",
          about: data?.blog?.about || "",
          blogImage: data?.blog?.blogImage || "",
          file: null,
        });
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    };
    updateData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("category", input.category);
    formData.append("about", input.about);
    formData.append("blogImage", input.blogImage);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const { data } = await axios.put(
        `${BACKEND_URL}/api/blogs/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const onChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onChangeFileHadler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };
  const dataaa = "gaesg";
  console.log(dataaa);
  return (
    <div>
      <div className="h-screen flex items-center justify-center my-16">
        <div className="w-full max-w-2xl bg-white rounded-lg p-8 shadow-xl">
          <h1 className="text-black text-xl font-semibold">Update Blog</h1>
          <form onSubmit={handleUpdate}>
            <select
              className="w-full p-2 mt-4 border rounded-md"
              value={input.category}
              onChange={onChangeHandler}
              name="category"
            >
              <option value="" disabled>
                Selcted your Education
              </option>
              <option value="Devotion">Devotion</option>
              <option value="Sports">Sports</option>
              <option value="Coding">Coding</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>

              <option value="OTHER">OTHER</option>

              <option value="">BSC</option>
            </select>
            <div className="mt-4">
              <input
                type="text"
                name="title"
                value={input.title}
                className="w-full p-2 border rounded-md bg-white"
                placeholder="Blog Title name"
                onChange={onChangeHandler}
              />
            </div>

            {input.blogImage && (
              <div className="mt-4">
                <img
                  src={input.blogImage}
                  alt="Blog"
                  className="w-full h-60 object-cover rounded-md"
                />
              </div>
            )}

            <div className="mt-4">
              <input
                type="file"
                accept="image/*"
                onChange={onChangeFileHadler}
                className="w-full border p-2 rounded-md"
              />
            </div>
            <div className="mt-4">
              <textarea
                type="text"
                name="about"
                value={input.about}
                className="w-full p-2 border rounded-md"
                onChange={onChangeHandler}
                placeholder="Blog des"
                rows="5"
              ></textarea>
            </div>

            <button className="btn text-white bg-blue-500 w-full hover:bg-blue-600 duration-300">
              UPDATE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;

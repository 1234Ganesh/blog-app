import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const Devotional = () => {
  const { blogs } = useAuth();
  const devotionBlog = blogs?.filter((blog) => blog.category === "Devotional");
  return (
    <>
      <div className="mt-16">
        <h1 className="text-xl font-semibold pb-2">Devotional</h1>
        <div className="container mx-auto  grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 my-5">
          {devotionBlog && devotionBlog.length > 0 ? (
            devotionBlog.map((blog, index) => {
              return (
                <Link
                  to={`/blog/${blog._id}`}
                  key={index}
                  className="bg-white rounded-md hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 shadow-lg"
                >
                  <div className="relative">
                    <img
                      src={blog.blogImage}
                      alt=""
                      className="w-full h-56 object-cover"
                    />
                    <div></div>
                    <h1 className="absolute bottom-4 text-white left-4 hover:text-yellow-400 font-semibold">
                      {blog.title}
                    </h1>
                  </div>
                  <div className="p-6 flex items-center">
                    <img
                      src={blog?.adminPhoto}
                      alt=""
                      className="w-12 h-12 rounded-full border-2 border-yellow-400"
                    />
                    <div className="ml-4">
                      <p className="text-lg font-semibold text-gray-800">
                        {blog?.adminName}
                      </p>
                      <p className="text-xs text-green-400">New</p>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="w-full flex justify-center items-center">
              <span className="loading loading-ball loading-xs"></span>
              <span className="loading loading-ball loading-sm"></span>
              <span className="loading loading-ball loading-md"></span>
              <span className="loading loading-ball loading-lg"></span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Devotional;

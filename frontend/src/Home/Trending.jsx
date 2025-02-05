import React from "react";
import { useAuth } from "../context/AuthProvider";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

const Trending = () => {
  const { blogs } = useAuth();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div>
      <h1 className="text-xl text-semibold pb-2">Trending</h1>
      <Carousel responsive={responsive}>
        {blogs && blogs.length > 0 ? (
          blogs.map((element, index) => {
            return (
              <div className="p-4 bg-white border border-gray-400 rounded-lg shadow-md mx-2">
                <Link to={`blog/${element._id}`} key={index}>
                  <div className="relative">
                    <img
                      src={element.blogImage}
                      alt=""
                      className="w-full h-56 object-cover"
                    />
                    <div></div>
                    <h1 className="absolute bottom-4 text-white left-4 hover:text-yellow-400 font-semibold">
                      {element.title}
                    </h1>
                  </div>
                  <div className="p-6 flex items-center">
                    <img
                      src={element.adminPhoto}
                      alt=""
                      className="w-12 h-12 rounded-full border-2 border-yellow-400"
                    />
                    <div className="ml-4">
                      <p className="text-lg font-semibold text-gray-800">
                        {element.adminName}
                      </p>
                      <p className="text-xs text-green-400">New</p>
                    </div>
                  </div>
                </Link>
              </div>
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
      </Carousel>
    </div>
  );
};

export default Trending;

import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-10 bg-white shadow-lg rounded-2xl">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mt-2">Oops! Page not found.</p>
        <p className="text-gray-500 mt-4">
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3
            rounded-lg text-lg font-medium hover:bg-blue-700 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

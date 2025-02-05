import React from "react";
import { useAuth } from "../context/AuthProvider";

const MyProfile = () => {
  const { profile } = useAuth();
  console.log("usenr", profile);
  return (
    <div className="flex justify-center items-center h-screen md:ml-12 md:p-10">
      <div className="shadow-lg bg-white rounded-lg md:ml-40 md:p-6">
        <img
          src={profile.photo}
          className="w-full lg:w-60 sm:w-50 sm:h-50 lg:h-56 object-cover"
        />
        <div className="text-center p-4">
          <h1 className="text-black text-semibold">{profile.name}</h1>
          <p className="text-gray-400 text-sm p-2">{profile.email}</p>
          <p className="text-gray-400 text-sm p-2">{profile.phone}</p>
          <p className="text-gray-400 text-sm p-2">{profile.role}</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

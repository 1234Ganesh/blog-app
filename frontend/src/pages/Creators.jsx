import React, { useState } from "react";
import { BACKEND_URL } from "../utils/backendUrl";
import { useEffect } from "react";
import axios from "axios";

const Creators = () => {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      const { data } = await axios.get(`${BACKEND_URL}/api/user/admins`, {
        withCredentials: true,
      });
      console.log("creator", data);

      setCreators(data.adminsAll);
    };
    fetchAdmins();
  }, []);
  return (
    <div className="my-14 px-6 py-6 mb-40">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {creators && creators.length > 0 ? (
          creators.map((creator) => {
            return (
              <div className="shadow-lg bg-white rounded-lg">
                <img
                  src={creator.photo}
                  className="w-full h-56 md:h-40 lg:h-40 object-cover"
                />

                <div className="text-center p-4">
                  <h1 className="text-black text-semibold">{creator.name}</h1>
                  <p className="text-gray-400 text-sm p-2">{creator.email}</p>
                  <p className="text-gray-400 text-sm p-2">{creator.phone}</p>
                  <p className="text-gray-400 text-sm p-2">{creator.role}</p>
                </div>
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
      </div>
    </div>
  );
};

export default Creators;

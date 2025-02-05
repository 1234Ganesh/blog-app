import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../utils/backendUrl";
import { Link } from "react-router-dom";

const Creator = () => {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      const { data } = await axios.get(`${BACKEND_URL}/api/user/admins`, {
        withCredentials: true,
      });

      setAdmin(data.adminsAll);
    };
    fetchAdmins();
  }, []);
  return (
    <div className="container mx-auto p-4 mt-14">
      <h1 className="text-xl font semibold mb-4">Popular Creators</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {admin && admin.length > 0 ? (
          admin.slice(0, 4).map((element) => {
            return (
              <div
                key={element._id}
                className="flex justify-center items-center"
              >
                <Link to={`/`}>
                  <div>
                    <img
                      src={element.photo}
                      alt=""
                      className="w-[250px] h-[250px] md:w-40 rounded-full md:h-40 object-cover items-center shadow-lg border border-black"
                    />

                    <div className="text-center items-center py-3">
                      <p className="text-gray-600 text-lg">{element.name}</p>
                      <p>{element.role}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Creator;

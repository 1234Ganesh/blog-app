import React, { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";
import { BACKEND_URL } from "../utils/backendUrl";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState();
  const [profile, setProfile] = useState();
  const [isAutheticated, setIsAutheticated] = useState(false);

  useEffect(() => {
    const fetchProfie = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/user/my-profile`, {
          withCredentials: true,
        });
        console.log("Profile", data);
        setProfile(data.user);
        setIsAutheticated(true);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/blogs/all-blogs`);

        setBlogs(data.allBlogs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
    fetchProfie();
  }, []);
  return (
    <div>
      <AuthContext.Provider value={{ blogs, profile, isAutheticated }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export const useAuth = () => useContext(AuthContext);

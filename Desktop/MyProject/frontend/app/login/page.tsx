"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from 'axios';
import { getLocalStorgeToken } from "../../components/getToken";



const LoginPage: React.FC = () => {
  
  const token = getLocalStorgeToken();
  useEffect(() => {
    if (token) {
      window.location.href = "/home";
    }
}, [token]);

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    side: "",
    username: ""
  });

 

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     if (isLogin) {
  //       const response = await axios.post("https://api-three-murex.vercel.app/api/login", formData);
  //       const { token } = response.data;
  //       // Handle successful login
  //       localStorage.setItem("token", token);
  //       console.log(response.data);
  //       window.location.reload();
  //     } else {
  //       const response = await axios.post("https://api-three-murex.vercel.app/api/admin/signup", formData);
  //       window.location.reload();
  //       console.log(response.data);
  //     }
  //   } catch (error) {
  //     // Handle error
  //     console.error("API Error:");
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let response;
      if (isLogin) {
        response = await axios.post("https://api-three-murex.vercel.app/api/login", formData);
      } else {
        response = await axios.post("https://api-three-murex.vercel.app/api/admin/signup", formData);
      }
      const { token } = response.data;
      if (token) {
        try {
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
          }
        } catch (error) {
          console.error('Error while setting token in localStorage:', error);
        }
      } else {
        try {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Error while removing token from localStorage:', error);
        }
      }
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 bg-white rounded-lg shadow-red-600"
      >
        <h2 className="text-2xl mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="flex flex-col">
              <label htmlFor="username" className="mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          )}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          {!isLogin && (
          <div className="flex flex-col">
            <label htmlFor="side" className="mb-1">
              Side
            </label>
            <select
              id="side"
              name="side"
              value={formData.side}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="" disabled>--Please choose an option--</option>
              <option value="groom">Groom</option>
              <option value="bride">Bride</option>
            </select>
          </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={handleToggleForm}
            className="ml-1 text-blue-500 hover:underline"
          >
            {isLogin ? "Sign up here" : "Login here"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;

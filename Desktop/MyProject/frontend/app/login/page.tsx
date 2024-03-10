'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form className="space-y-4">
          {!isLogin && (
            <div className="flex flex-col">
              <label htmlFor="username" className="mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
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
              className="border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button
            type="button"
            onClick={handleToggleForm}
            className="ml-1 text-blue-500 hover:underline"
          >
            {isLogin ? 'Sign up here' : 'Login here'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;

"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { getLocalStorgeToken } from "../../components/getToken";

const LoginPage: React.FC = () => {
  const token = getLocalStorgeToken();
  useEffect(() => {
    if (token) {
      window.location.href = "/gallery";
    }
  }, [token]);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    side: "",
    username: "",
  });

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({ email: "", password: "", side: "", username: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      let response;
      if (isLogin) {
        response = await axios.post(
          "https://api-three-murex.vercel.app/api/login",
          formData
        );
      } else {
        response = await axios.post(
          "https://api-three-murex.vercel.app/api/admin/signup",
          formData
        );
      }
      const { token } = response.data;
      if (token) {
        if (typeof window !== "undefined") {
          localStorage.setItem("token", token);
        }
      } else {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
        }
      }
      window.location.href = "/gallery";
    } catch (err) {
      setError("Something went wrong. Please check your details and try again.");
      console.error("API Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-rose-50 via-pink-50/40 to-purple-50/60 flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-pink-200 opacity-25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-200 opacity-25 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-pink-100 opacity-20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="overflow-hidden rounded-3xl border border-pink-200 bg-white shadow-2xl shadow-pink-100">
          {/* Top gradient accent strip */}
          <div className="h-1.5 w-full bg-gradient-to-r from-pink-500 via-purple-400 to-pink-400" />

          <div className="px-8 py-10">
            {/* Logo / brand */}
            <div className="mb-8 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-4xl">💍</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.45 }}
                className="mt-2 font-heading text-3xl font-bold"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-500 to-pink-400">
                  You and Me
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="mt-1 text-sm text-gray-400 font-body"
              >
                {isLogin ? "Welcome back — sign in to continue" : "Join the wedding album"}
              </motion.p>
            </div>

            {/* Tab toggle */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mb-8 flex rounded-xl bg-pink-50 p-1"
            >
              {["Login", "Sign Up"].map((tab) => {
                const active = tab === "Login" ? isLogin : !isLogin;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setIsLogin(tab === "Login")}
                    className="relative flex-1 rounded-lg py-2 text-sm font-semibold transition-colors duration-200"
                  >
                    {active && (
                      <motion.div
                        layoutId="tab-pill"
                        className="absolute inset-0 rounded-lg bg-white shadow-sm border border-pink-100"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span
                      className={`relative z-10 transition-colors duration-200 ${
                        active ? "text-pink-600" : "text-gray-400"
                      }`}
                    >
                      {tab}
                    </span>
                  </button>
                );
              })}
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="popLayout">
                {/* Username — signup only */}
                {!isLogin && (
                  <motion.div
                    key="username"
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <label className="mb-1.5 block text-sm font-medium text-gray-600">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Your name"
                      required={!isLogin}
                      className="w-full rounded-xl border border-pink-200 bg-pink-50/40 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none transition-all focus:border-pink-400 focus:bg-white focus:ring-2 focus:ring-pink-200"
                    />
                  </motion.div>
                )}

                {/* Email */}
                <motion.div key="email" layout>
                  <label className="mb-1.5 block text-sm font-medium text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-pink-200 bg-pink-50/40 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none transition-all focus:border-pink-400 focus:bg-white focus:ring-2 focus:ring-pink-200"
                  />
                </motion.div>

                {/* Password */}
                <motion.div key="password" layout>
                  <label className="mb-1.5 block text-sm font-medium text-gray-600">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full rounded-xl border border-pink-200 bg-pink-50/40 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none transition-all focus:border-pink-400 focus:bg-white focus:ring-2 focus:ring-pink-200"
                  />
                </motion.div>

                {/* Side — signup only */}
                {!isLogin && (
                  <motion.div
                    key="side"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <label className="mb-1.5 block text-sm font-medium text-gray-600">
                      Which side are you from?
                    </label>
                    <select
                      name="side"
                      value={formData.side}
                      onChange={handleChange}
                      required={!isLogin}
                      className="w-full rounded-xl border border-pink-200 bg-pink-50/40 px-4 py-2.5 text-sm text-gray-700 outline-none transition-all focus:border-pink-400 focus:bg-white focus:ring-2 focus:ring-pink-200 appearance-none"
                    >
                      <option value="" disabled>Select your side</option>
                      <option value="groom">🤵 Groom&apos;s side</option>
                      <option value="bride">👰 Bride&apos;s side</option>
                    </select>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error message */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-500"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 py-3 text-sm font-semibold text-white shadow-md shadow-pink-200 transition-opacity hover:opacity-95 disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    {isLogin ? "Signing in…" : "Creating account…"}
                  </span>
                ) : (
                  isLogin ? "Sign In" : "Create Account"
                )}
              </motion.button>
            </form>

            {/* Toggle hint */}
            <p className="mt-6 text-center text-sm text-gray-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={handleToggleForm}
                className="ml-1 font-semibold text-pink-500 hover:text-pink-600 transition-colors"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>
        </div>

        {/* Subtle footer note */}
        <p className="mt-5 text-center text-xs text-gray-400">
          13 April 2024 &mdash; A day to remember forever 💕
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;

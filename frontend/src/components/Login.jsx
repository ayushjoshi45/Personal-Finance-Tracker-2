import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "./globalContext";
import ThemeToggle from "./ThemeToggle";

const Login = () => {
  const navigate = useNavigate();
  const { setUser: setGlobalUser } = useGlobalContext();

  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `/api/v1/user/login`,
        formState,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      toast.success("Login Successful!");
      localStorage.setItem("user", JSON.stringify(res.data));
      setGlobalUser(res.data);
      navigate("/dashboard");
      console.log(res);
    } catch (error) {
      console.log(error.response?.data);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
    setFormState({
      username: "",
      password: "",
    });
  };

  return (
    <div className="auth-page min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>
      <div className="auth-glow auth-glow-1 pointer-events-none"></div>
      <div className="auth-glow auth-glow-2 pointer-events-none"></div>

      <div className="glass-panel max-w-md w-full rounded-3xl p-8 md:p-10 space-y-8 flex flex-col justify-center items-center relative z-10 shadow-2xl">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-extrabold tracking-tight theme-heading bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="theme-subtext text-sm">
            Sign in to manage your personal finance tracker
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-6 w-full">
          <div className="space-y-1">
            <label className="text-xs font-semibold theme-label uppercase tracking-wider" htmlFor="username">
              Username
            </label>
            <input
              value={formState.username}
              onChange={(e) => setFormState({ ...formState, username: e.target.value })}
              placeholder="Enter your username"
              className="custom-input w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-200"
              required
              id="username"
              type="text"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold theme-label uppercase tracking-wider" htmlFor="password">
                Password
              </label>
              <a className="text-xs theme-link hover:underline transition" href="#">
                Forgot password?
              </a>
            </div>
            <input
              value={formState.password}
              onChange={(e) => setFormState({ ...formState, password: e.target.value })}
              placeholder="Enter your password"
              className="custom-input w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-200"
              required
              id="password"
              type="password"
            />
          </div>

          <button
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-[0.98] rounded-xl shadow-lg shadow-indigo-600/20 text-white font-semibold transition-all duration-200"
            type="submit"
          >
            Sign In
          </button>
        </form>

        <div className="text-center text-sm theme-subtext">
          Don't have an account?{" "}
          <Link to="/signup" className="theme-link hover:underline font-medium transition">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

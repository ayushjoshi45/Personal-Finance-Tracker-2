import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "./globalContext";
import ThemeToggle from "./ThemeToggle";

const Signup = () => {
  const [formState, setFormState] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  
  const navigate = useNavigate();
  const { setUser } = useGlobalContext();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
   
    if (!formState.fullName || !formState.username || !formState.password || !formState.confirmPassword || !formState.gender) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formState.password !== formState.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(
        `/api/v1/user/signup`,
        formState,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      
      if (res.data.success) {
        const userData = {
          _id: res.data._id,
          username: res.data.username,
          fullName: res.data.fullName,
          profilePhoto: res.data.profilePhoto,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        toast.success("Account created! Welcome aboard.");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Signup failed. Please try again.");
    }

    // Reset the form after submission
    setFormState({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  return (
    <div className="auth-page min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>
      {/* Decorative blurred glow circles */}
      <div className="auth-glow auth-glow-1 pointer-events-none"></div>
      <div className="auth-glow auth-glow-2 pointer-events-none"></div>

      <div className="glass-panel w-full max-w-md rounded-3xl p-8 md:p-10 space-y-6 flex flex-col justify-center items-center relative z-10 shadow-2xl">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-extrabold tracking-tight theme-heading bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="theme-subtext text-sm">
            Sign up to track your daily income and expenses
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="flex flex-col w-full space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold theme-label uppercase tracking-wider">
              Full Name
            </label>
            <input
              value={formState.fullName}
              onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
              placeholder="Your full name"
              className="custom-input w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-200"
              type="text"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold theme-label uppercase tracking-wider">
              Username
            </label>
            <input
              value={formState.username}
              onChange={(e) => setFormState({ ...formState, username: e.target.value })}
              placeholder="Choose a username"
              className="custom-input w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-200"
              type="text"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold theme-label uppercase tracking-wider">
              Password
            </label>
            <input
              value={formState.password}
              onChange={(e) => setFormState({ ...formState, password: e.target.value })}
              placeholder="Create a password"
              className="custom-input w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-200"
              type="password"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold theme-label uppercase tracking-wider">
              Confirm Password
            </label>
            <input
              value={formState.confirmPassword}
              onChange={(e) => setFormState({ ...formState, confirmPassword: e.target.value })}
              placeholder="Confirm your password"
              className="custom-input w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-200"
              type="password"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold theme-label uppercase tracking-wider" htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              value={formState.gender}
              onChange={(e) => setFormState({ ...formState, gender: e.target.value })}
              className="theme-select w-full rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-200 cursor-pointer"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-[0.98] rounded-xl shadow-lg shadow-indigo-600/20 text-white font-bold transition-all duration-200 mt-2"
            type="submit"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center text-sm theme-subtext">
          Already have an account?{" "}
          <Link className="theme-link hover:underline font-medium transition" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

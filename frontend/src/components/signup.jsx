import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formState, setFormState] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  
  const navigate = useNavigate();

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
        toast.success(res.data.message || "Account created successfully!");
        navigate("/login"); 
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#0c0a1a] via-[#05040a] to-[#0d091e] relative overflow-hidden">
      {/* Decorative blurred glow circles */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-600/10 blur-[100px] pointer-events-none"></div>

      <div className="glass-panel w-full max-w-md rounded-3xl p-8 md:p-10 space-y-6 flex flex-col justify-center items-center relative z-10 border border-white/5 shadow-2xl">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-extrabold tracking-tight text-white bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-gray-400 text-sm">
            Sign up to track your daily income and expenses
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="flex flex-col w-full space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
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
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
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
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
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
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
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
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider" htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              value={formState.gender}
              onChange={(e) => setFormState({ ...formState, gender: e.target.value })}
              className="w-full bg-[#110e1a] border border-white/10 rounded-xl px-4 py-2.5 text-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-200 cursor-pointer"
            >
              <option value="" className="bg-[#110e1a]">Select Gender</option>
              <option value="male" className="bg-[#110e1a]">Male</option>
              <option value="female" className="bg-[#110e1a]">Female</option>
              <option value="other" className="bg-[#110e1a]">Other</option>
            </select>
          </div>

          <button
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-[0.98] rounded-xl shadow-lg shadow-indigo-600/20 text-white font-bold transition-all duration-200 mt-2"
            type="submit"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link className="text-indigo-400 hover:text-indigo-300 hover:underline font-medium transition" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

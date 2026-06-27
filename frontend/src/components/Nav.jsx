import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import avatar from "../assets/avatar.png";
import { signout, dashboard, money, expenses } from "../utils/Icons";
import axios from "axios";
import toast from "react-hot-toast";
import { useGlobalContext } from "../components/globalContext";
import ThemeToggle from "./ThemeToggle";

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser: setGlobalUser } = useGlobalContext();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`/api/v1/user/logout`);
      toast.success(res.data?.message || "Logged out successfully");
    } catch (error) {
      console.log(error);
    } finally {
      // Always clear local session states even if api fails
      localStorage.removeItem("user");
      setGlobalUser(null);
      navigate("/login");
    }
  };

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: dashboard },
    { name: "Income", path: "/income", icon: money },
    { name: "Expenses", path: "/expenses", icon: expenses },
  ];

  return (
    <nav className="w-full h-full glass-panel rounded-3xl flex flex-col justify-between gap-8 p-6 md:p-8 theme-nav shadow-2xl relative overflow-hidden">
      {/* Upper profile section */}
      <div className="flex items-center justify-between gap-4 py-4 border-b theme-border">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={user?.profilePhoto || avatar}
              alt="Avatar"
              className="w-14 h-14 rounded-full border-2 border-indigo-500/50 shadow-md object-cover"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[var(--bg-page)] rounded-full"></span>
          </div>
          <div>
            <h2 className="font-bold text-lg theme-heading tracking-wide">
              {user?.fullName || "Guest User"}
            </h2>
            <p className="text-xs theme-subtext font-medium">Personal Account</p>
          </div>
        </div>
        <ThemeToggle />
      </div>

      {/* Nav Menu Items */}
      <div className="flex flex-col gap-3 flex-1 mt-4">
        {menuItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 font-medium text-sm border cursor-pointer ${
                active
                  ? "bg-indigo-600/20 border-indigo-500/30 text-indigo-400 shadow-md shadow-indigo-600/5"
                  : "bg-transparent border-transparent theme-subtext hover:theme-heading hover:bg-white/5"
              }`}
            >
              <span className={`text-lg ${active ? "text-indigo-400" : "text-gray-400"}`}>
                {item.icon}
              </span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer logout section */}
      <button
        onClick={logoutHandler}
        className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border border-transparent theme-subtext hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 transition-all duration-300 font-medium text-sm mt-auto cursor-pointer"
      >
        <span className="text-lg">{signout}</span>
        <span>Logout</span>
      </button>
    </nav>
  );
}

export default Nav;

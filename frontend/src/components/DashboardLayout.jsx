import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Nav from "./Nav";
import { useGlobalContext } from "./globalContext";

const DashboardLayout = () => {
  const { user } = useGlobalContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row gap-6 p-4 md:p-6 bg-[#030206] relative">
      {/* Floating blur shapes in background */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-pink-500/5 blur-[120px] pointer-events-none"></div>

      {/* Sidebar navigation */}
      <div className="w-full lg:w-[320px] flex-shrink-0 relative z-20">
        <Nav />
      </div>
      
      {/* Main dashboard content panel */}
      <div className="flex-1 glass-panel rounded-3xl p-4 md:p-8 overflow-y-auto max-h-[85vh] lg:max-h-[calc(100vh-3rem)] relative z-10 border border-white/5 shadow-xl">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;

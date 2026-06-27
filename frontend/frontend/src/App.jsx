import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Income from "./components/Income";
import Expenses from "./components/Expenses";
import Signup from "./components/Signup";
import Login from "./components/Login";
import DashboardLayout from "./components/DashboardLayout";
import { useGlobalContext } from "./components/globalContext";

function App() {
  const { user } = useGlobalContext();

  return (
    <Routes>
      {/* Root redirect depending on auth */}
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
      
      {/* Auth screens */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protected dashboard screens with shared sidebar layout */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expenses" element={<Expenses />} />
      </Route>

      {/* Catch-all fallback redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

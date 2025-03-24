import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Signup from "./pages/signup"; // ✅ Ensure correct file name

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} allowedRoles={["teacher", "admin"]} />} />
      <Route path="/admin-dashboard" element={<ProtectedRoute component={AdminDashboard} allowedRoles={["admin"]} />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

// ✅ Protected Route Component
const ProtectedRoute = ({ component: Component, allowedRoles }: { component: React.FC; allowedRoles: string[] }) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const tokenPayload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    if (!allowedRoles.includes(tokenPayload.role)) {
      return <Navigate to="/login" />;
    }
    return <Component />;
  } catch {
    return <Navigate to="/login" />;
  }
};

export default App;

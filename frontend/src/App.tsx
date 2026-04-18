import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import { AuthContext } from "./context/auth-context";

export default function App() {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" replace />} />
      <Route path="/login" element={!token ? <Login /> : <Navigate to="/" replace />} />
      <Route path="/register" element={!token ? <Register /> : <Navigate to="/" replace />} />
    </Routes>
  );
}

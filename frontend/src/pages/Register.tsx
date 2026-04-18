import { useState } from "react";
import { api } from "../api/client";
import { setToken } from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    setToken(res.data.token);
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-semibold text-slate-900">Register</h2>

        <div className="space-y-4">
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>

        <p className="mt-4 text-sm text-slate-600">
          Already have an account?{" "}
          <Link className="font-medium text-indigo-600 hover:text-indigo-700" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

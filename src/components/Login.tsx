import { useState } from "react";
import toast from 'react-hot-toast'
import api from '../lib/axios';

export default function Login({ onLogin, goRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await api.get('/sanctum/csrf-cookie'); // get CSRF

      const res = await api.post("/api/auth/login", {
        email,
        password
      });

      const data = res.data;

      toast.success(data.message);
      onLogin();

    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
};

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 bg-white rounded-xl shadow w-96 space-y-4">
        <h2 className="text-xl font-bold">Login</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full px-4 py-3
            bg-slate-50
            border border-slate-200
            rounded-xl
            text-sm text-slate-700
            placeholder:text-slate-400

            focus:outline-none
            focus:ring-4 focus:ring-indigo-500/10
            focus:border-indigo-400
            focus:bg-white

            transition-all duration-200
            shadow-sm hover:shadow-md
          "
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full px-4 py-3
            bg-slate-50
            border border-slate-200
            rounded-xl
            text-sm text-slate-700
            placeholder:text-slate-400

            focus:outline-none
            focus:ring-4 focus:ring-indigo-500/10
            focus:border-indigo-400
            focus:bg-white

            transition-all duration-200
            shadow-sm hover:shadow-md
          "
        />

        <button onClick={handleLogin} className="w-full rounded-xl bg-indigo-600 text-white p-2">
          Login
        </button>

        <p className="text-sm">
          No account?{" "}
          <span className="text-indigo-600 cursor-pointer" onClick={goRegister}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
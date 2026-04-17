import { useState } from "react";

export default function Register({ goLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registered successfully");
      goLogin();
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 bg-white rounded-xl shadow w-96 space-y-4">
        <h2 className="text-xl font-bold">Register</h2>

        <input 
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
          placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input 
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
          placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input 
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
          type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <button onClick={handleRegister} className="w-full rounded-xl bg-indigo-600 text-white p-2">
          Register
        </button>

        <p className="text-sm">
          Already have account?{" "}
          <span className="text-indigo-600 cursor-pointer" onClick={goLogin}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
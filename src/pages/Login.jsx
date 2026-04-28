import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const stored = JSON.parse(localStorage.getItem("userAccount"));

    if (!stored || stored.email !== email || stored.password !== password) {
      alert("Invalid credentials");
      return;
    }

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-cream pt-28 flex items-center justify-center px-6">

      <div className="bg-cream p-8 rounded-3xl border border-gold shadow-xl w-full max-w-md">

        <h1 className="font-heading text-2xl mb-6">
          Welcome Back
        </h1>

        <input
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-olive text-white py-3 rounded-lg"
        >
          Log In
        </button>

      </div>
    </div>
  );
}
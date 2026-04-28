import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    desired: []
  });

  const desiredOptions = [
    "Restaurants",
    "Beaches",
    "Nightlife",
    "Mountains",
    "Cafes",
    "Museums"
  ];

  const toggleDesired = (item) => {
    setForm((prev) => ({
      ...prev,
      desired: prev.desired.includes(item)
        ? prev.desired.filter((d) => d !== item)
        : [...prev.desired, item]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔒 simple validation
    if (!form.email || !form.password || !form.phone) {
      alert("Please fill required fields");
      return;
    }

    localStorage.setItem("userAccount", JSON.stringify(form));

    // simulate email verification
    setTimeout(() => {
      alert("Account created successfully!");
      navigate("/quiz");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-cream pt-28 flex items-center justify-center px-6">

      <form
        onSubmit={handleSubmit}
        className="bg-cream p-8 rounded-3xl shadow-xl border border-gold w-full max-w-md space-y-4"
      >

        <h2 className="text-2xl font-heading text-center mb-4">
          Create Account
        </h2>

        {/* NAME */}
        <div className="flex gap-2">
          <input
            placeholder="First Name"
            className="w-1/2 p-3 border rounded-lg"
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          <input
            placeholder="Last Name"
            className="w-1/2 p-3 border rounded-lg"
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </div>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* PHONE */}
        <input
          type="tel"
          placeholder="Mobile Number"
          className="w-full p-3 border rounded-lg"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        {/* ADDRESS */}
        <textarea
          placeholder="Address (optional)"
          className="w-full p-3 border rounded-lg"
          rows="2"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        {/* DESIRED PLACES */}
        <div>
          <p className="text-sm font-body mb-2">
            Desired Places (optional)
          </p>

          <div className="flex flex-wrap gap-2">
            {desiredOptions.map((item) => {
              const selected = form.desired.includes(item);

              return (
                <button
                  type="button"
                  key={item}
                  onClick={() => toggleDesired(item)}
                  className={`px-3 py-1 rounded-full text-sm
                    ${
                      selected
                        ? "bg-magenta text-white"
                        : "bg-gold text-gray"
                    }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-olive text-white py-3 rounded-lg font-semibold"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-magenta cursor-pointer"
          >
            Log in
          </span>
        </p>

      </form>
    </div>
  );
}
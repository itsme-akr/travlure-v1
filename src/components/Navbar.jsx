import { NavLink, useNavigate } from "react-router-dom";


export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 w-full z-50 bg-cream/95 backdrop-blur-xl border-b border-gray-200">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3 md:py-4">

        {/* Logo */}
        <div
          onClick={() => {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src="/logo.png"
            alt="Travlure"
            className="w-8 h-8 md:w-10 md:h-10"
          />
          <span className="font-heading text-lg tracking-wide">
            Travlure
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-magenta" : "text-gray-700 hover:text-magenta"
            }
          >
            Discover
          </NavLink>

          <NavLink
            to="/places"
            className={({ isActive }) =>
              isActive ? "text-magenta" : "text-gray-700 hover:text-magenta"
            }
          >
            My Places
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "text-magenta" : "text-gray-700 hover:text-magenta"
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "text-magenta" : "text-gray-700 hover:text-magenta"
            }
          >
            Settings
          </NavLink>

        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">

          {/* Secondary CTA */}
          <button
            onClick={() => navigate("/login")}
            className="text-sm font-semibold text-black hover:text-magenta transition"
          >
            Log In
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => navigate("/signup")}
            className="bg-olive text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gold transition shadow-sm hover:scale-105 active:scale-95"
          >
            Sign Up
          </button>

        </div>

      </div>
    </div>
  );
}
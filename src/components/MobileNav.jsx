import { NavLink } from "react-router-dom";
import { FiCompass, FiHeart, FiUser, FiSettings } from "react-icons/fi";

export default function MobileNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around items-center py-2 md:hidden z-50">

      <NavItem to="/" icon={<FiCompass />} label="Discover" />
      <NavItem to="/places" icon={<FiHeart />} label="My Places" />
      <NavItem to="/profile" icon={<FiUser />} label="Profile" />
      <NavItem to="/settings" icon={<FiSettings />} label="Settings" />

    </div>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center text-xs ${
          isActive ? "text-magenta" : "text-gray-500"
        }`
      }
    >
      <div className="text-lg">{icon}</div>
      <span>{label}</span>
    </NavLink>
  );
}
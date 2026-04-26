import { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const clearAll = () => {
    localStorage.clear();
    alert("All data cleared");

    window.location.href = "/";
  };

  return (
    <div className="min-h-screen pt-28 pb-20 max-w-3xl mx-auto bg-cream px-6 py-10">

      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-6">

        <h1 className="text-2xl font-heading mb-6">
          Settings
        </h1>

        {/* Notifications */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-700">
            Enable Notifications
          </span>

          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
        </div>

        {/* Clear Data */}
        <button
          onClick={clearAll}
          className="w-full mb-4 bg-gray-100 py-2 rounded-lg"
        >
          Clear App Data
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full bg-magenta text-white py-2 rounded-lg"
        >
          Log Out
        </button>

      </div>

    </div>
  );
}
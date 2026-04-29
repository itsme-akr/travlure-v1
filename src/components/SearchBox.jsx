import { useState } from "react";

export default function SearchBox({ onSearch, onOpenFilters }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
  onSearch((prev) => ({
    ...prev,
    query,
  }));
  // 🔥 SAVE TO LOCALSTORAGE
  const existing = JSON.parse(localStorage.getItem("recentSearches")) || [];

  const updated = [newFilters, ...existing].slice(0, 5); // max 5

  localStorage.setItem("recentSearches", JSON.stringify(updated));

  onSearch(newFilters);

};

  return (
    <div className="mt-6 flex justify-center px-2">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-3 flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full max--2-2xl">

        {/* INPUT */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What are you looking for?"
          className="flex-1 px-4 py-2 bg-transparent outline-none text-gray-900 placeholder-gray-400"
        />

        {/* FILTER BUTTON */}
       <div className="flex gap-2 w-full md:w-auto">
  <button
    onClick={onOpenFilters}
    className="flex-1 md:flex-none text-sm text-gray-600 hover:text-magenta"
  >
    Filters
  </button>

  <button
    onClick={handleSearch}
    className="flex-1 md:w-auto bg-olive px-6 py-2 rounded-full text-white font-medium hover:bg-gold transition"
  >
    Find →
  </button>
</div>

      </div>
    </div>
  );
}
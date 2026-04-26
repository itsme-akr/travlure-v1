export default function RecentSearches({ onSearch }) {
  const searches =
    JSON.parse(localStorage.getItem("recentSearches")) || [];

  if (searches.length === 0) {
    return (
      <p className="text-center text-gray-400">
        No recent searches yet
      </p>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
      {searches
        .filter((s) => s && typeof s === "object") // 🔥 FIX
        .map((s, i) => (
          <div
            key={i}
            onClick={() => onSearch(s)}
            className="bg-white rounded-xl p-4 shadow hover:shadow-md cursor-pointer"
          >
            <p className="text-sm font-medium">
              {s?.query || "Explore"}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              {s?.location?.city ||
                s?.location?.zip ||
                "Anywhere"}
            </p>
          </div>
        ))}
    </div>
  );
}
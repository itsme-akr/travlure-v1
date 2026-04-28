import { useSave } from "../context/SaveContext";
import PlaceCard from "../components/PlaceCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyPlaces() {
  const { collections } = useSave();
  const [recent, setRecent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecent(stored);
  }, []);

  return (
    <div className="min-h-screen  bg-cream pt-24 px-6">

      <h1 className="text-3xl font-heading mb-2">
        My Collections
      </h1>

      <p className="text-gray-500 mb-8">
        Your curated collection & search history
      </p>

      {/* 🔥 RECENT SEARCHES */}
      <div className="mb-10">
        <h2 className="text-lg font-heading mb-4">
          Recent Searches
        </h2>

        <button
          onClick={() => navigate("/")}
          className="mb-8 bg-olive text-white px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] hover:bg-gold active:scale-[0.97] transition"
        >
          + Discover Places
        </button>

        {recent.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No recent searches
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recent.map((r, i) => (
              <div
                key={i}
                onClick={() => {
                  localStorage.setItem(
                    "activeSearch",
                    JSON.stringify(r)
                  );
                  window.location.href = "/";
                }}
                className="bg-white p-4 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition"
              >
                <p className="text-sm font-body">
                  {r.query || "Explore"}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {r.location?.city ||
                    r.location?.zip ||
                    "Anywhere"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ❤️ COLLECTIONS */}
      {Object.keys(collections).length === 0 ? (
        <p className="text-gray-400">
          No saved places yet.
        </p>
      ) : (
        Object.entries(collections).map(([name, places]) => (
          <div key={name} className="mb-10">

            <h2 className="text-xl font-semibold mb-4">
              {name}
            </h2>

            {places.length === 0 ? (
              <p className="text-gray-400 text-sm">
                No places in this collection
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {places.map((place, index) => (
                  <PlaceCard key={index} place={place} />
                ))}
              </div>
            )}

          </div>
        ))
      )}
      
    </div>
  );
}
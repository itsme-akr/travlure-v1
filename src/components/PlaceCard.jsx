import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSave } from "../context/SaveContext";


export default function PlaceCard({ place }) {
  const navigate = useNavigate();

  const {
    addToCollection,
    removeFromAllCollections,
    isSavedAnywhere,
  } = useSave();

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isSavedAnywhere(place));
  }, [place, isSavedAnywhere]);

  const toggleSave = () => {
    if (saved) {
      removeFromAllCollections(place);
      alert("Removed from My Places");
    } else {
      addToCollection("Favorites", place);
      alert("Added to My Places");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-[1.02] hover:shadow-2xl transition duration-300 group">

      <div className="relative">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
        />

        <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 text-xs font-semibold rounded-md shadow">
          {place.price}
        </div>

        <button
          onClick={toggleSave}
          className="absolute top-3 right-3 text-lg"
        >
          {saved ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">
          {place.name}
        </h3>

        <p className="text-xs text-magenta font-medium mb-2">
          {place.type}
        </p>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {place.description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">
            📍 {place.location.city}, {place.location.state}
          </span>

          <button
            onClick={() =>
              navigate(`/place/${place.name}`, { state: place })
            }
            className="text-sm font-medium text-magenta hover:underline"
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}
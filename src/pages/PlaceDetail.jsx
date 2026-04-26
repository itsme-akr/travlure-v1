import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function PlaceDetail() {
  const { state: place } = useLocation();
  const navigate = useNavigate();

  // ✅ Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!place) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No data found</p>
      </div>
    );
  }

  const mapQuery = place.location?.lat && place.location?.lng
    ? `${place.location.lat},${place.location.lng}`
    : `${place.location?.city || ""},${place.location?.state || ""}`;

  return (
    <div className="min-h-screen pb-20 max-w-3xl mx-auto bg-cream pt-20">

      {/* 🔙 Back */}
      <button
        onClick={() => navigate(-1)}
        className="ml-6 mb-4 text-sm text-gray-600"
      >
        ← Back
      </button>

      {/* 🔥 HERO IMAGE */}
      <div className="w-full h-[400px]">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 🔥 CONTENT */}
      <div className="max-w-5xl mx-auto px-6 py-8">

        <h1 className="text-3xl font-bold mb-2">
          {place.name}
        </h1>

        <p className="text-lg font-semibold text-yellow-600 mb-1">
          ⭐ {place.rating || "4.0"} Rating
        </p>

        <p className="text-magenta font-medium mb-4">
          {place.type} • {place.price}
        </p>

        <p className="text-gray-700 mb-6">
          {place.description}
        </p>

        {/* 🔥 INFO GRID */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Location</h3>
            <p className="text-gray-600">
              {place.location?.city}, {place.location?.state}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Ambiance</h3>
            <p>Vibrant, Social</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Best For</h3>
            <p>Friends, Night Out</p>
          </div>

        </div>

        {/* 🔥 MAP SECTION */}
        <div className="mt-12 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            📍 Location
          </h2>

          <iframe
            width="100%"
            height="300"
            className="rounded-xl mt-4"
            loading="lazy"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
          ></iframe>
        </div>

      </div>
    </div>
  );
}
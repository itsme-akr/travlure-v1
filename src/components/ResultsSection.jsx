import { useState } from "react";
import PlaceCard from "./PlaceCard";
import RecommendationSection from "./RecommendationSection";

export default function ResultsSection({ filters, fromQuiz }) {
  const [showAll, setShowAll] = useState(false);

  const allPlaces = [
    {
      name: "The Ivy Rooftop",
      type: "Cocktail Bar",
      price: "$$$",
      location: {
        city: "New York",
        state: "NY",
      },
      description: "Trendy rooftop with skyline views.",
      image: "https://images.unsplash.com/photo-1622758235004-51977c5863f5",
    },
    {
      name: "Cafe Lumière",
      type: "Food & Drink",
      price: "$$",
      location: {
        city: "San Francisco",
        state: "CA",
      },
      rating: 4.6,
      description: "Cozy café perfect for evening chill.",
      image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8",
    },
    {
      name: "Velvet Lounge",
      type: "Party",
      price: "$$$$",
      location: {
        city: "Los Angeles",
        state: "CA",
      },
      rating: 4.7,
      description: "Luxury nightlife experience.",
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
    },
    {
      name: "City Museum",
      type: "Cultural",
      price: "$",
      location: {
        city: "Chicago",
        state: "IL",
      },
      rating: 4.2,
      description: "Explore art and history.",
      image: "https://images.unsplash.com/photo-1491156855053-9cdff72c7f85",
    },
    {
      name: "Sunset Harbor",
      type: "Scenic Spot",
      price: "$$",
      location: {
        city: "Miami",
        state: "FL",
      },
      rating: 4.5,
      description: "Relaxing waterfront views with vibrant sunsets.",
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
    },
    {
      name: "The Book Nook",
      type: "Cafe & Books",
      price: "$$$",
      location: {
        city: "Seattle",
        state: "WA",
      },
      rating: 4.4,
      description: "Quiet reading café with artisanal coffee.",
      image: "https://images.unsplash.com/photo-1558210834-473f430c09ac",
    },
  ];

  const query = filters?.query?.toLowerCase() || "";
  const categories = filters?.categories || [];
  const price = filters?.price || [];

  const filtered = allPlaces.filter((place) => {
    return (
      (!query || place.name.toLowerCase().includes(query)) &&
      (categories.length === 0 || categories.includes(place.type)) &&
      (price.length === 0 || price.includes(place.price))
    );
  });

  const visiblePlaces = showAll ? filtered : filtered.slice(0, 6);

  return (
    <>
      <RecommendationSection filters={filters} places={allPlaces} />

      <div className="bg-cream -mt-10 pt-16 pb-16 px-6">
        <h2 className="text-3xl font-heading text-center mb-8">
          {fromQuiz ? "Discover Our Favorites" : noFilters ? "Discover Our Favorites" : "Search Results"}
        </h2>

        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <p>No exact matches found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {visiblePlaces.map((place, index) => (
                <PlaceCard key={index} place={place} />
              ))}
            </div>

            {filtered.length > 6 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="text-magenta"
                >
                  {showAll ? "Show Less ▲" : "View More ▼"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
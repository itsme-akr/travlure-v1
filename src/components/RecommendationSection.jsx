import PlaceCard from "./PlaceCard";

export default function RecommendationSection({ filters, places }) {
  const profile =
    JSON.parse(localStorage.getItem("userProfile")) || {};

  const query = filters?.query?.toLowerCase() || "";
  const categories = filters?.categories || [];
  const price = filters?.price || [];
  const city = filters?.city?.toLowerCase() || "";

  const scored = places.map((place) => {
    let score = 0;
    let reasons = [];

    // 🔥 Filter matches
    if (categories.includes(place.type)) {
      score += 2;
      reasons.push(`Matches your interest in ${place.type}`);
    }

    if (price.includes(place.price)) {
      score += 2;
      reasons.push(`Fits your budget (${place.price})`);
    }

    if (city && place.location.toLowerCase().includes(city)) {
      score += 1;
      reasons.push(`Located in ${place.location}`);
    }

    if (query && place.name.toLowerCase().includes(query)) {
      score += 1;
      reasons.push(`Matches your search`);
    }

    // 🔥 Profile match

    const vibeMap = {
      Chill: ["Food & Drink", "Cafe"],
      Luxury: ["Cocktail Bar"],
      Party: ["Party", "Bar"],
      Cultural: ["Cultural", "Museum"]
    };

    if (
      profile.vibe && vibeMap[profile.vibe]?.includes(place.type)
    ) {
      score += 3;
      reasons.push(`Matches your ${profile.vibe} vibe`);
    }

    return { ...place, score, reasons };
  });

  const recommended = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (recommended.every((p) => p.score === 0)) return null;

  return (
    <div className="bg-cream pt-20 pb-10 px-6">

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl text-center font-heading">
          Recommended for You
        </h2>
        <p className="text-sm font-body text-gray-500">
          Based on your preferences and search
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {recommended.map((place, index) => (
          <div key={index} className="relative">

            {/* 🔥 Reason Tag */}
            {place.reasons.length > 0 && (
              <div className="absolute top-10 left-2 z-10 bg-magenta/90 text-white text-xs px-3 py-1 rounded-full shadow">
                {place.reasons[0]}
              </div>
            )}

            <PlaceCard place={place} />
          </div>
        ))}
      </div>

    </div>
  );
}
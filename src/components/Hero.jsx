import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";

export default function Hero({ onSearch, onOpenFilters }) {
  const navigate = useNavigate();

  const images = [
    "/hero/hero2.jpg",
    "/hero/hero1.jpg",
    "/hero/hero3.jpg",
    "/hero/hero4.jpg",
    "/hero/hero-1.jpg",
  ];

  // 👇 clone first image at end
  const extendedImages = [...images, images[0]];

  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // 👇 handle seamless reset
  useEffect(() => {
    if (index === images.length) {
      setTimeout(() => {
        setTransition(false); // remove animation
        setIndex(0);          // jump to real first
      }, 700); // match duration

      setTimeout(() => {
        setTransition(true); // restore animation
      }, 750);
    }
  }, [index, images.length]);

  return (
    <div className="relative w-full h-[95vh] overflow-hidden">

      {/* 🔥 SLIDER */}
      <div className="overflow-hidden absolute inset-0">
        <div
          className={`flex h-full ${
            transition ? "transition-transform duration-700 ease-in-out" : ""
          }`}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {extendedImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* 🔥 Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

      {/* 🔥 Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">

        <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">
          Your Personal Concierge
        </h1>

        <p className="text-gray-200 text-body mb-6 max-w-xl">
          Discover restaurants, bars, and hidden gems tailored to your vibe.
        </p>

        <button
          onClick={() => navigate("/quiz")}
          className="bg-olive px-6 py-3 rounded-xl text-white font-semibold hover:bg-gold transition hover:scale-105 hover:shadow-lg mb-10"
        >
          Take Quiz to Start
        </button>

        <div className="w-full max-w-4xl">
          <SearchBox
            onSearch={onSearch}
            onOpenFilters={onOpenFilters}
          />
        </div>
      </div>

      {/* 🔥 Dots */}
      <div className="absolute bottom-6 w-full flex justify-center gap-2 z-10">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              i === index % images.length
                ? "bg-white scale-110"
                : "bg-white/40"
            }`}
          />
        ))}
      </div>

    </div>
  );
}
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Hero from "../components/Hero";
import ResultsSection from "../components/ResultsSection";
import ExploreMore from "../components/ExploreMore";
import FilterPanel from "../components/FilterPanel";
import RecentSearches from "../components/RecentSearches";

export default function Discover() {
  const [filters, setFilters] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [recent, setRecent] = useState([]);

  const resultsRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Skip first filters set (from profile)
  const isInitialFiltersSet = useRef(true);

  useEffect(() => {
    if (!filters || !resultsRef.current) return;

    // 🚫 Skip first system-triggered filters
    if (isInitialFiltersSet.current) {
      isInitialFiltersSet.current = false;
      return;
    }

    // ✅ Scroll only for user-triggered changes
    const yOffset = -100;
    const y =
      resultsRef.current.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }, [filters]);

  // 🔒 Safe parser
  const safeParse = (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  };

  // 👤 Load profile
  useEffect(() => {
    const parsed = safeParse("userProfile");

    if (!parsed) {
      if (window.location.pathname !== "/quiz") {
        setTimeout(() => navigate("/quiz"), 500);
      }
      return;
    }

    setProfile(parsed);

    // 🚫 This will NOT trigger scroll now
    setFilters({
      query: "",
      categories: [],
      ambiance: [],
      price: Array.isArray(parsed?.budget) ? parsed.budget : [],
      location: {},
    });
  }, []);

  // 🕘 Load recent searches
  useEffect(() => {
    const stored = safeParse("recentSearches") || [];
    const cleaned = stored.filter((s) => s && typeof s === "object");
    setRecent(cleaned);
  }, []);

  // 💾 Save search
  const saveSearch = (newFilters) => {
    if (!newFilters || typeof newFilters !== "object") return;

    const existing = safeParse("recentSearches") || [];

    const cleaned = existing.filter(
      (s) => s && typeof s === "object"
    );

    const updated = [
      newFilters,
      ...cleaned.filter(
        (s) => JSON.stringify(s) !== JSON.stringify(newFilters)
      ),
    ].slice(0, 5);

    localStorage.setItem(
      "recentSearches",
      JSON.stringify(updated)
    );

    setRecent(updated);
  };

  // 🎯 Detect quiz-based results
  const isFromQuiz = profile && !filters?.query;

  return (
    <div>
      {/* 🔍 HERO */}
      <section className="h-screen">
        <Hero
          onSearch={(newFilters) => {
            setFilters(newFilters);
            saveSearch(newFilters);
          }}
          onOpenFilters={() => setShowFilters(true)}
        />
      </section>

      {/* 📊 RESULTS */}
      {filters && (
        <div ref={resultsRef}>
          <ResultsSection 
            filters={filters} 
            fromQuiz={isFromQuiz} 
          />
        </div>
      )}

      {/* 🎛 FILTER PANEL */}
      {showFilters && (
        <FilterPanel
          onClose={() => setShowFilters(false)}
          onApply={(newFilters) => {
            const merged = {
              ...filters,
              ...newFilters,
            };

            setFilters(merged);
            saveSearch(merged);
          }}
        />
      )}

      {/* 🕘 RECENT SEARCHES */}
      {recent.length > 0 && (
        <div className="bg-cream px-6 pb-16 space-y-16">
          <div className="max-w-6xl mx-auto mb-10">
            <h3 className="text-xl font-heading mb-4">
              Your Recent Searches
            </h3>
            <div className="w-[70px] h-[3px] bg-gold mt-2"></div>

            <RecentSearches
              onSearch={(search) => {
                if (!search || typeof search !== "object") return;
                setFilters(search);
                saveSearch(search);
              }}
            />
          </div>
        </div>
      )}

      {/* 🔽 EXPLORE */}
      <ExploreMore />
    </div>
  );
}
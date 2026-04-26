import { useState } from "react";

export default function FilterPanel({ onClose, onApply }) {
  const [mode, setMode] = useState("city");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [zip, setZip] = useState("");

  const [categories, setCategories] = useState([]);
  const [ambiance, setAmbiance] = useState([]);
  const [price, setPrice] = useState([]);

  const categoryOptions = ["Food & Drink", "Cocktail Bar", "Party", "Cultural"];
  const ambianceOptions = ["Chill", "Happy Hour", "Vibrant", "Family"];
  const priceOptions = ["$", "$$", "$$$", "$$$$"];

  const toggle = (item, list, setList, limit) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else if (list.length < limit) {
      setList([...list, item]);
    }
  };

  const renderChips = (options, list, setList, limit) =>
    options.map((opt) => {
      const selected = list.includes(opt);

      return (
        <button
          key={opt}
          onClick={() => toggle(opt, list, setList, limit)}
          className={`px-3 py-1 rounded-full text-xs ${
            selected
              ? "bg-magenta text-white"
              : "bg-white border border-gray-300"
          }`}
        >
          {opt}
        </button>
      );
    });

  // ✅ APPLY
  const handleApply = () => {
    onApply({
      categories,
      ambiance,
      price,
      location:
        mode === "zip"
          ? { zip }
          : { city, state: stateVal },
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

      <div className="bg-[#F4EDE2] w-full max-w-3xl rounded-3xl p-6 shadow-2xl relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4 text-black">
          Refine your search
        </h2>

        {/* LOCATION */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2 text-black">Location</p>

          <div className="flex gap-4 mb-2 text-black">
            <label>
              <input
                type="radio"
                checked={mode === "city"}
                onChange={() => setMode("city")}
              />{" "}
              City & State
            </label>

            <label>
              <input
                type="radio"
                checked={mode === "zip"}
                onChange={() => setMode("zip")}
              />{" "}
              Zip Code
            </label>
          </div>

          {mode === "city" ? (
            <div className="grid grid-cols-3 gap-2">
              <input
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="col-span-2 p-3 bg-white border border-gray-300 rounded-xl text-gray-900"
              />
              <input
                placeholder="State"
                value={stateVal}
                onChange={(e) => setStateVal(e.target.value)}
                className="p-3 bg-white border border-gray-300 rounded-xl text-gray-900"
              />
            </div>
          ) : (
            <input
              placeholder="Zip Code"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="w-full p-3 bg-white border border-gray-300 rounded-xl text-gray-900"
            />
          )}
        </div>

        {/* FILTERS */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm font-semibold mb-2 text-black">Category</p>
            <div className="flex flex-wrap gap-2">
              {renderChips(categoryOptions, categories, setCategories, 2)}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2 text-black">Ambiance</p>
            <div className="flex flex-wrap gap-2">
              {renderChips(ambianceOptions, ambiance, setAmbiance, 2)}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2 text-black">Price</p>
            <div className="flex flex-wrap gap-2">
              {renderChips(priceOptions, price, setPrice, 4)}
            </div>
          </div>
        </div>

        {/* APPLY */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleApply}
            className="bg-olive px-5 py-2 rounded-xl text-white"
          >
            Apply Filters
          </button>
        </div>

      </div>
    </div>
  );
}
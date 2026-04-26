import { createContext, useContext, useEffect, useState } from "react";

const SaveContext = createContext();

export const SaveProvider = ({ children }) => {
  const [collections, setCollections] = useState({});

  // 🔄 LOAD FROM STORAGE
  useEffect(() => {
    const stored = localStorage.getItem("collections");
    if (stored) {
      setCollections(JSON.parse(stored));
    } else {
      // ✅ Default collection
      setCollections({
        Favorites: [],
      });
    }
  }, []);

  // 💾 SAVE TO STORAGE
  useEffect(() => {
    localStorage.setItem("collections", JSON.stringify(collections));
  }, [collections]);

  // ➕ ADD PLACE
  const addToCollection = (collectionName, place) => {
    setCollections((prev) => {
      const existing = prev[collectionName] || [];

      // prevent duplicate
      if (existing.some((p) => p.name === place.name)) return prev;

      return {
        ...prev,
        [collectionName]: [place, ...existing],
      };
    });
  };

  // ❌ REMOVE FROM ONE COLLECTION
  const removeFromCollection = (collectionName, place) => {
    setCollections((prev) => ({
      ...prev,
      [collectionName]: (prev[collectionName] || []).filter(
        (p) => p.name !== place.name
      ),
    }));
  };

  // ❌ REMOVE FROM ALL COLLECTIONS (important)
  const removeFromAllCollections = (place) => {
    setCollections((prev) => {
      const updated = {};

      for (const key in prev) {
        updated[key] = prev[key].filter(
          (p) => p.name !== place.name
        );
      }

      return updated;
    });
  };

  // 🔍 CHECK IF SAVED ANYWHERE
  const isSavedAnywhere = (place) => {
    return Object.values(collections).some((list) =>
      list.some((p) => p.name === place.name)
    );
  };

  // ➕ CREATE NEW COLLECTION
  const createCollection = (name) => {
    setCollections((prev) => {
      if (prev[name]) return prev;

      return {
        ...prev,
        [name]: [],
      };
    });
  };

  // 🗑 DELETE COLLECTION
  const deleteCollection = (name) => {
    setCollections((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  };

  return (
    <SaveContext.Provider
      value={{
        collections,
        addToCollection,
        removeFromCollection,
        removeFromAllCollections,
        isSavedAnywhere,
        createCollection,
        deleteCollection,
      }}
    >
      {children}
    </SaveContext.Provider>
  );
};

export const useSave = () => useContext(SaveContext);
import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export function useFilter() {
  return useContext(FilterContext);
}

export function FilterProvider({ children }) {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedArtist, setSelectedArtist] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  return (
    <FilterContext.Provider value={{
      filter, setFilter,
      search, setSearch,
      selectedFormat, setSelectedFormat,
      selectedGenre, setSelectedGenre,
      selectedArtist, setSelectedArtist,
      priceRange, setPriceRange
    }}>
      {children}
    </FilterContext.Provider>
  );
}

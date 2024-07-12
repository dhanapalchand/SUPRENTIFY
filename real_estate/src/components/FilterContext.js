import React, { createContext, useState } from 'react';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [showFilterBar, setShowFilterBar] = useState(false);

  const toggleFilterBar = () => {
    setShowFilterBar(prevState => !prevState);
  };

  return (
    <FilterContext.Provider value={{ showFilterBar, toggleFilterBar }}>
      {children}
    </FilterContext.Provider>
  );
};

import React from 'react';
import { createContext, useContext, useState } from 'react';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState([]);

  const api = {
    selectedItem,
    setSelectedItem,
  };
  return <DataContext.Provider value={api}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);

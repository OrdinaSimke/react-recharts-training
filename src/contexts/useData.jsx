import React from 'react';
import { createContext, useContext, useState } from 'react';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState([]);
  const drawerWidth = 240;

  const api = {
    selectedItem,
    setSelectedItem,
    drawerWidth,
  };
  return <DataContext.Provider value={api}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);

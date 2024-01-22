import React from 'react';
import { createContext, useContext, useState } from 'react';
import * as d3 from 'd3';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const drawerWidth = 240;
  const navbarHeight = 44;
  const locale = d3.formatLocale({
    decimal: ',',
    thousands: '.',
    grouping: [3],
    currency: ['€\u00a0', ''],
  });

  const api = {
    selectedItem,
    setSelectedItem,
    drawerWidth,
    navbarHeight,
    locale,
  };
  return <DataContext.Provider value={api}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);

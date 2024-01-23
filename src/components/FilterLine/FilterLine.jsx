import React from 'react';
import { useData } from 'contexts/useData';
import { Chip, Stack } from '@mui/material';

export const FilterLine = (props) => {
  const { selectedItem, setSelectedItem } = useData();

  const handleDelete = () => {
    setSelectedItem({ type: null, id: null });
  };

  const text = `${selectedItem.type} ${
    selectedItem.type === 'user' ? selectedItem.id : selectedItem.prov
  }`;

  return (
    <Stack direction="row" spacing={1} sx={{ height: '100%' }}>
      {selectedItem.type !== null && (
        <Chip label={text} variant="outlined" onDelete={handleDelete} />
      )}
    </Stack>
  );
};

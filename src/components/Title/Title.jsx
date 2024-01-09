import React, { useState } from 'react';

export const Title = (props) => {
  const { value } = props;
  const [isBlue, setIsBlue] = useState(false);

  const updateTitle = () => {
    setIsBlue(!isBlue);
  };

  return (
    <h1
      style={{ textAlign: 'center', color: isBlue ? 'blue' : 'red' }}
      onClick={updateTitle}
    >
      {value}
    </h1>
  );
};

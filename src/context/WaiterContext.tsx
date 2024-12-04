import React, { createContext, useContext, useState } from 'react';

type WaiterContextType = {
  waiterColors: { [key: string]: string };
  setWaiterColors: (colors: { [key: string]: string }) => void;
};

const initialWaiterColors = {};

export const WaiterContext = createContext<WaiterContextType>({
  waiterColors: initialWaiterColors,
  setWaiterColors: () => {},
});

export const WaiterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [waiterColors, setWaiterColors] = useState<{ [key: string]: string }>(
    initialWaiterColors,
  );

  return (
    <WaiterContext.Provider value={{ waiterColors, setWaiterColors }}>
      {children}
    </WaiterContext.Provider>
  );
};

export const useWaiterContext = () => useContext(WaiterContext);

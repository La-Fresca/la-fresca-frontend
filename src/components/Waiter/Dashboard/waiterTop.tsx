import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useUsers } from '@/api/useUser';
import { useWaiterContext } from '@/context/WaiterContext';

const WaiterTop: React.FC = () => {
  const { getWaiterById } = useUsers();
  const { waiterColors, setWaiterColors } = useWaiterContext();
  const colours = [
    '#ff7171',
    '#b9b037',
    '#37b939',
    '#4e4ee3',
    '#e34ecd',
    '#e3914e',
  ];

  const { data: waiters = [], isLoading } = useQuery({
    queryKey: ['waiters'],
    queryFn: getWaiterById,
    staleTime: 5000,
  });

  useEffect(() => {
    if (waiters.length > 0) {
      const colorMap = waiters.reduce(
        (acc, waiter, index) => ({
          ...acc,
          [waiter.id]: colours[index % colours.length],
        }),
        {},
      );
      console.log('Setting colors in WaiterTop:', colorMap);
      setWaiterColors(colorMap);
    }
  }, [waiters, setWaiterColors]);

  // Add debug logs
  console.log('Current waiterColors in WaiterTop:', waiterColors);
  console.log('Current waiters:', waiters);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex items-center space-x-4 p-4">
      {waiters.map((waiter, index) => (
        <div key={waiter.id} className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: colours[index % colours.length] }}
          />
          <span className="text-gray-800 dark:text-gray-200">
            {`${waiter.firstName} ${waiter.lastName}`}
          </span>
        </div>
      ))}
    </div>
  );
};

export default WaiterTop;

import React from 'react';

const waiterColorMap: Record<string, string> = {
  'Waiter 1': 'red',
  'Waiter 2': 'green',
  'Waiter 3': 'blue',
  'Waiter 4': 'yellow',
  'Waiter 5': 'purple',
};

const WaiterColorLegend: React.FC = () => {
  return (
    <div className="flex items-center space-x-4 p-4">
      {Object.entries(waiterColorMap).map(([waiter, color]) => (
        <div 
          key={waiter} 
          className="flex items-center space-x-2"
        >
          <div 
            className="w-4 h-4 rounded-full" 
            style={{ backgroundColor: color }} 
          />
          <span className="text-gray-800">{waiter}</span>
        </div>
      ))}
    </div>
  );
};

export default WaiterColorLegend;

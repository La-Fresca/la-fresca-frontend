import React from 'react';

const WaiterTop: React.FC = () => {
  return (
    <div className="flex space-x-10">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-yellow-500 border-2"></div>
        <span>Waiter 01</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-violet-900 border-2"></div>
        <span>Waiter 02</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-red-500 border-2"></div>
        <span>Waiter 03</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-blue-500 border-2"></div>
        <span>Waiter 04</span>
      </div>  
    </div>
  );
};

export default WaiterTop;

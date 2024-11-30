import React from 'react';
import StockList from '@/components/TopLevelManager/Stock/Tables/NextTables/InventoryList';

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
      <StockList />
    </div>
  );
};

export default Dashboard;

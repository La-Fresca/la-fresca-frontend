import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@components/Waiter/Header/index';
import Sidebar from '@components/Waiter/Sidebar/index';
import { WaiterProvider } from '@/context/WaiterContext';

const WaiterLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Add console log to verify provider mounting
  console.log('WaiterLayout mounted');

  return (
    <WaiterProvider>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <div className="flex h-screen overflow-hidden">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
    </WaiterProvider>
  );
};

export default WaiterLayout;

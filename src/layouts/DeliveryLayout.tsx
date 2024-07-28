import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@components/BranchManager/Header/index';
import Sidebar from '@components/BranchManager/Sidebar/index';
import { BottomNav } from '@/components/UI/BottomNav';
import MoblieTopNav from '@/components/UI/TopNav';

const DeliveryLayout: React.FC = () => {

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <MoblieTopNav />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="w-screen mx-0 min-w-screen-2xl p-0 md:p-0 2xl:p-0">
              <Outlet />
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
          <BottomNav/>
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DeliveryLayout;

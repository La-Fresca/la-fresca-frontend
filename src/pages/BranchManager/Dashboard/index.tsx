import React from 'react';
import ChartThree from '@components/BranchManager/Charts/ChartThree';
import ChartFour from '@/components/BranchManager/Charts/ChartFour';
import ChartFive from '@/components/BranchManager/Charts/ChartFive';
import TableOne from '@/components/BranchManager/Tables/TableOne';
import ChartSix from '@/components/BranchManager/Charts/ChartSix';

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartFour />
        <ChartThree />
        <ChartFive />
        <TableOne />
        <ChartSix />
      </div>
    </>
  );
};

export default Dashboard;

import React from 'react';
import ChartThree from '@components/TopLevelManager/Charts/ChartThree';
import ChartFour from '@/components/TopLevelManager/Charts/ChartFour';
import ChartFive from '@/components/TopLevelManager/Charts/ChartFive';
import TableOne from '@/components/TopLevelManager/Tables/TableOne';
import ChartSix from '@/components/TopLevelManager/Charts/ChartSix';
import DropDown from '@/components/TopLevelManager/BranchDropdown';
import { useParams } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { branchId } = useParams<{ branchId: string }>();
  return (
    <>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <DropDown id={branchId} />
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

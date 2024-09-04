import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface CardDataStatsProps {
  title: string;
  total: string;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  children,
}) => {
  return (
    <Link
      to=""
      className="rounded-2xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
    >
      <div className="flex items-center overflow-hidden">
        <div className="bg-[#ffffff18] h-[100px] flex items-center justify-center w-[120px] rounded-l-2xl border-r border-stroke shadow-default dark:border-strokedark">
          <div className="flex h-15 w-15 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            {children}
          </div>
        </div>    

        <div className="grid w-[100%] pl-4">
          <span className="text-lg font-medium">{title}</span>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {total}
          </h4>
        </div>
      </div>
    </Link>
  );
};

export default CardDataStats;

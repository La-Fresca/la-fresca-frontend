import React from 'react';
import CardDataStats from '@components/SystemAdmin/CardDataStats';

function restore(){
  alert("Restore started")
}

function backup(){
  alert("Backup started")
}

const Sales: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <a onClick={backup} className='cursor-pointer'>
          <CardDataStats
            title=""
            total="Backup System"
            rate=""

          >
            <img src='/public/restore.png' />
          </CardDataStats>
        </a>
        <a onClick={restore} className='cursor-pointer'>
          <CardDataStats title="last backup : 2024/03/02" total="Restore System" rate="" >
            <img src="/public/backup.png" />
          </CardDataStats>
        </a>


      </div>


      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <TableTwo />
      </div> */}
    </>
  );
};

export default Sales;

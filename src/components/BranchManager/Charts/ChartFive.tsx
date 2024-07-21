import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const options = {
  chart: {
    height: 350,
    type: 'radialBar' as const,
  },
  plotOptions: {
    radialBar: {
      dataLabels: {
        name: {
          fontSize: '22px',
        },
        value: {
          fontSize: '16px',
        },
        total: {
          show: true,
          label: 'Total',
          formatter: function (w: any) {
            // By default this function returns the average of all series.
            return '85%';
          },
        },
      },
    },
  },
  labels: ['Food', 'Café', 'Sales'],
};

const series = [85, 85, 92];

const ChartFive: React.FC = () => {
  return (
    <div className="col-span-12 rounded-3xl border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Your Rating
        </h4>
        <p className="text-sm font-medium text-white mt-2">
          rating by food, café and sales
        </p>
      </div>

      <div className="mt-16">
        <ReactApexChart
          options={options}
          series={series}
          type="radialBar"
          height={350}
        />
      </div>
      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3 mt-12">
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#F6C243]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> By Food </span>
              <span> 65% </span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#D9A725]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> By Cafe </span>
              <span> 34% </span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#E5B76D]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> By Sales </span>
              <span> 45% </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartFive;

import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const options = {
  chart: {
    type: 'line' as const,
    height: 350,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: '#fff', // Text color for dark mode
  },
  colors: ['#FFD700', '#FFA500'], // Custom colors for dark mode
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth' as const,
  },
  xaxis: {
    categories: ['01', '02', '03', '04', '05', '06'],
    labels: {
      style: {
        colors: ['#fff'], // X-axis label color for dark mode
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: ['#fff'], // Y-axis label color for dark mode
      },
    },
  },
  grid: {
    borderColor: '#555', // Grid color for dark mode
  },
  legend: {
    position: 'bottom' as const, // Update the position value to one of the valid options
    labels: {
      colors: '#fff', // Legend text color for dark mode
    },
  },
};

const series = [
  {
    name: 'Last 6 days',
    data: [30, 40, 35, 50, 49, 60],
  },
  {
    name: 'Last Week',
    data: [20, 30, 25, 40, 39, 50],
  },
];

const ChartSix: React.FC = () => {
  return (
    <div className="col-span-12 rounded-3xl border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 flex justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Order
          </h4>
          <p className="text-2xl text-black dark:text-white">2.568</p>
          <p className="text-sm font-medium text-red-500 dark:text-red-400">
            <span>↓</span> 2.1% vs last week
          </p>
          <p className="text-sm font-medium text-meta-3">
            Sales from 1-6 Dec, 2020
          </p>
        </div>
        <div>
          <button className="bg-primary text-white rounded-lg px-4 py-2">
            View Report
          </button>
        </div>
      </div>

      <div>
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default ChartSix;

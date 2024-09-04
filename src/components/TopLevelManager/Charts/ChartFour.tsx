import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const options: ApexOptions = {
  colors: ['#FFD700', '#FFA500'], // Dark yellowish colors
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'bar',
    height: 350,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: '25%',
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: '25%',
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last',
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ],
    labels: {
      style: {
        colors: '#f7fafc', // Light text color for x-axis
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: '#f7fafc', // Light text color for y-axis
      },
    },
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Satoshi',
    fontWeight: 500,
    fontSize: '14px',
    markers: {
      radius: 99,
    },
    labels: {
      colors: '#f7fafc', // Light text color for legend
    },
  },
  fill: {
    opacity: 1,
  },
};

interface ChartFourState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartFour: React.FC = () => {
  const [state, setState] = useState<ChartFourState>({
    series: [
      {
        name: 'Last 12 days',
        data: [44, 55, 41, 67, 22, 43, 65, 32, 33, 52, 13, 44],
      },
      {
        name: 'Previous Month',
        data: [13, 23, 20, 8, 13, 27, 15, 28, 37, 29, 26, 22],
      },
    ],
  });

  return (
    <div className="col-span-12 rounded-3xl border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Revenue
          </h4>
          <p className="text-lg text-white mt-3 font-bold">RS 7,852.00</p>
          <p className="text-sm font-medium text-meta-3">
            <span className="text-success">▲ 2.1%</span> vs last week
          </p>
          <p className="text-sm font-medium mt-3">
            <span className="text-white">Sales from 1-12 Dec, 2020</span>
          </p>
        </div>
        <button className="bg-primary text-white py-1 px-4 rounded-lg h-10">
          View Report
        </button>
      </div>

      <div>
        <div id="chartFour">
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartFour;

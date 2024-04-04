import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const options = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#e33030', '#3C50E0', '#fff000', '#99ff33','#3056D3'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight',
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 5,
    colors: '#fff',
    strokeColors: ['#e33030', '#3056D3', '#fff000', '#99ff33','#3056D3'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: [
      'Sep',
      'Oct',
      'Nov',
      'Dec',
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 100,
  },
};



const ChartOne = () => {
  const [state, setState] = useState({
    series: [
      {
        name: 'Red Bags',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
      },
      {
        name: 'Blue Bags',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
      },
      {
        name: 'Yellow Bags',
        data: [10, 47, 12, 88, 63, 27, 93, 71, 6, 85, 14, 73],
      },
      {
        name: 'White Bags',
        data: [55, 18, 42, 69, 27, 84, 33, 96, 58, 77, 10, 49],
      },
      
       
    ],
  });

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-3">
          
           <div className="flex min-w-40">
              <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-meta-6">
                <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-meta-6"></span>
              </span>
              <div className="w-full">
                <p className="font-semibold text-meta-6">Yellow Bags</p>
                <p className="text-xs font-medium whitespace-nowrap"></p>
              </div>
          </div>
          
          <div className="flex min-w-40">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-meta-1">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-meta-1"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-meta-1">Red Bags</p>
              <p className="text-xs font-medium whitespace-nowrap"></p>
            </div>
         </div>
                      <div className="flex min-w-40">
         
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Blue Bags</p>
              <p className="text-xs font-medium whitespace-nowrap"></p>
              </div>
              </div>
           
       <div className="flex min-w-40">
              <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-black">
                <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-black"></span>
              </span>
              <div className="w-full">
                <p className="font-semibold text-black">White Bags</p>
                <p className="text-xs font-medium whitespace-nowrap"></p>
              </div>
          </div>
           <div className="flex min-w-40">
              <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-teal-600">
                <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-teal-600"></span>
              </span>
              <div className="w-full">
                <p className="font-semibold text-teal-600">Cytotoxic Bags</p>
                <p className="text-xs font-medium whitespace-nowrap"></p>
              </div>
          </div>

          

      
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              Day
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Week
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Month
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;

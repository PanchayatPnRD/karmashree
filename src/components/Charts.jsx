import ReactApexChart from "react-apexcharts";
import { useState } from "react";

const Charts = ({className}) => {

  const [state, setState] = useState({
    series: [
      {
        name: "Work Engated",
        data: [168, 385, 201, 298, 187, 195, 291],
      },
      {
        name: "Mandays Generated",
        data: [16, 80, 115, 212, 290, 310, 112],
      },
    ],
  });

  const options = {
    colors: ["#3C50E0", "#fa9b48"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "line",
      height: 350,

      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      line: {
        columnWidth: "80%",
        // endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 5,
      curve: "smooth",
    },
    xaxis: {
      categories: ["1 May 2024", "2 May 2024", "3 May 2024", "4 May 2024", "5 May 2024", "6 May 2024", "7 May 2024"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "inter",

      markers: {
        radius: 99,
      },
    },
    // yaxis: {
    //   title: false,
    // },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      // type: "gradient",
      // gradient: {
      //   shadeIntensity: 1,
      //   opacityFrom: 0.7,
      //   opacityTo: 0.9,
      //   colorStops: [
      //     {
      //       offset: 0,
      //       color: "#EB656F",
      //       opacity: 1,
      //     },
      //     {
      //       offset: 20,
      //       color: "#FAD375",
      //       opacity: 1,
      //     },
      //     {
      //       offset: 60,
      //       color: "#61DBC3",
      //       opacity: 1,
      //     },
      //     {
      //       offset: 100,
      //       color: "#95DA74",
      //       opacity: 1,
      //     },
      //   ],
      // },
      type: "solid",
    },

    tooltip: {
      x: {
        show: false,
      },
      // y: {
      //   formatter: function (val) {
      //     return val;
      //   },
      // },
    },
  };
  return (
    <div className={className}>
      <ReactApexChart
        options={options}
        series={state.series}
        type="line"
        height={350}
        width={1000}
      />
    </div>
  );
};

export default Charts;

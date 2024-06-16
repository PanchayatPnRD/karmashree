import ReactApexChart from "react-apexcharts";
import { useState, useMemo, useEffect } from "react";

const Charts = ({ data, className }) => {
  console.log(data, "data");

  const Months = useMemo(() => {
    const arr = data?.map((e) => e.month);
    return arr ? arr : [];
  }, [data]);

  const Works = useMemo(() => {
    const arr = data?.map((e) => e.engaged);
    return arr ? arr : [];
  }, [data]);

  const Mandays = useMemo(() => {
    const arr = data?.map((e) => e.mandays);
    return arr ? arr : [];
  }, [data]);

  console.log(Months);

  const [state, setState] = useState({
    series: [
      {
        name: "Worker Engaged",
        data: Works,
      },
      {
        name: "Mandays Generated",
        data: Mandays,
      },
    ],
  });

  useEffect(() => {
    setState({
      series: [
        {
          name: "Worker Engaged",
          data: Works,
        },
        {
          name: "Mandays Generated",
          data: Mandays,
        },
      ],
    });
  }, [data])

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
      categories: Months,
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
      <h1 className="text-xl tracking-tight font-bold pt-2 w-full text-center">
        Last 7 Days Progress
      </h1>
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

import React from "react";
import FusionCharts from "fusioncharts";
import Maps from "fusioncharts/fusioncharts.maps";
import WestBengal from "fusionmaps/maps/fusioncharts.westbengal";
import ReactFC from "react-fusioncharts";

// Resolves charts dependancy
ReactFC.fcRoot(FusionCharts, Maps, WestBengal);

const WestBengalMap = () => {
  const dataSource = {
    chart: {
      // caption: "West Bengal Map",
      // subcaption: "Click on a district to view more details",
      canvasBorderThickness: 10,
      canvasBorderColor:"#020",
      numbersuffix: "%",
      canvasBorderColor: "#fff",
      fillColor: "#29c3be",
      includevalueinlabels: "1",
      labelsepchar: ": ",
      entityFillHoverColor: "#23a19d",
      theme: "fusion-3d",
    },
    // colorrange: {
    //   minvalue: "0",
    //   code: "#FFE0B2",
    //   gradient: "1",
    //   color: [
    //     { maxvalue: "25", code: "#FFD74D" },
    //     { maxvalue: "50", code: "#FB8C00" },
    //     { maxvalue: "75", code: "#E65100" },
    //     { maxvalue: "100", code: "#BF360C" },
    //   ],
    // },
    data: [
      { id: "IN.WB.BR", value: "45" },
      { id: "IN.WB.BK", value: "30" },
      { id: "IN.WB.BN", value: "60" },
      // Add more district data here
    ],
  };

  const chartConfigs = {
    type: "map/westbengal",
    width: "700",
    height: "310",
    dataFormat: "json",
    dataSource: dataSource,
  };

  return <ReactFC {...chartConfigs} />;
};

export default WestBengalMap;

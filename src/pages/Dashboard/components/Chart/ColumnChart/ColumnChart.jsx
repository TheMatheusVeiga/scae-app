import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
} from "recharts";

import Theme from "../../../../../style/theme";

const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
  return (
    <text
      x={x + width / 2}
      y={y}
      fill="#666"
      textAnchor="start"
      dy={-6}
      style={{ fontFamily: "Verdana" }}
      fontSize={14}
    >{`${value}`}</text>
  );
};

function ColumnChart({ chart, axisX, axisY, XLabel, YLabel, sizeX }) {
  const chartData = [
    {
      device_id: 1,
      changes: 211,
    },
    {
      device_id: 42,
      changes: 1,
    },
    {
      device_id: 5,
      changes: 4,
    },
    {
      device_id: 4,
      changes: 2,
    },
    {
      device_id: 2,
      changes: 27,
    },
    {
      device_id: 41,
      changes: 12,
    },
    {
      device_id: 6,
      changes: 5,
    },
    {
      device_id: 40,
      changes: 2,
    },
    {
      device_id: 3,
      changes: 2,
    },
    {
      device_id: 11,
      changes: 2,
    },
  ];

  return (
    <BarChart width={sizeX} height={500} data={chart}>
      <Bar
        type="monotone"
        dataKey={axisY}
        fill={Theme.secondary}
        label={renderCustomBarLabel}
      />
      <CartesianGrid stroke="#f1f1f1" />
      <XAxis fontFamily="Verdana" fontSize={12} dataKey={axisX}>
        <Label value={XLabel} offset={-5} position="insideBottom" />
      </XAxis>
      <YAxis
        label={{
          value: YLabel,
          angle: -90,
          position: "insideLeft",
        }}
      />
      <Tooltip />
    </BarChart>
  );
}

export default ColumnChart;

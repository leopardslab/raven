import React from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  ResponsiveContainer,
  Bar,
} from "recharts";
import _ from "lodash";
import { toMiliseconds } from "../../utils/common";

const getRuns = (runs) => {
  return !_.isEmpty(runs)
    ? Object.keys(runs).map((key) => {
        return { name: key, value: toMiliseconds(runs[key]) };
      })
    : [];
};

function SpaceTimeGraph({ runs }) {
  let Runs = getRuns(runs && runs.Data);

  return (
    <ResponsiveContainer height={Runs.length * 48} width="100%">
      <BarChart
        data={Runs}
        margin={{ top: 10, right: 50, left: 50, bottom: 10 }}
        layout="vertical"
        barCategoryGap="25%"
        barGap={2}
      >
        <CartesianGrid horizontal={false} stroke="#b3b3b3" strokeWidth={0.5} />
        <XAxis
          type="number"
          axisLine={false}
          stroke="#b3b3b3"
          strokeWidth={0.5}
        />
        <YAxis type="category" dataKey={"name"} width={40} />
        <Bar
          dataKey="value"
          animationDuration={1000}
          label={{ position: "right", backgroundColor: "#fff" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SpaceTimeGraph;

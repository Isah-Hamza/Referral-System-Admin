import React, { useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';

const colors = [
  '#b9af7b', '#093a61', '#5a0128', '#e19f93', '#31fa43', 
  '#0de11c', '#ec40fd', '#d3fbdf', '#43b97a', '#45323e', 
  '#27c537', '#421f0f', '#209d2e', '#904533', '#01f8b2', 
  '#6a61c8', '#2c30c5', '#35a04f', '#016f21', '#e0e2ee'
]

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function NoShowPieChart({ payload }){

  const [activeIndex, setActiveIndex] = useState(0);


  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={200} height={200} >
          <Pie
            activeIndex={activeIndex}
            // activeShape={renderActiveShape}
            data={payload}
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={100}
            fill={"#8884d8"}
            dataKey="count"
            onMouseEnter={onPieEnter}
            label={true}
          >
            {payload?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} values={entry?.count} />
            ))}
            </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
}

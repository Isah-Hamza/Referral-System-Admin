import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { curveCardinal } from 'd3-shape';

const data = [
  {
    name: 'Radiology',
    uv: 10,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Laboratory',
    uv: 110,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Endoscopy',
    uv: 10,
    pv: 9800,
    amt: 2290,
  },
  
];

const cardinal = curveCardinal.tension(0.2);

export default class SampleAreaChart extends PureComponent {

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="red" fill="#ff0000" fillOpacity={0.05} />
          {/* <Area type={cardinal} dataKey="uv" stroke="red" fill="#ff0000" fillOpacity={0.05} /> */}
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

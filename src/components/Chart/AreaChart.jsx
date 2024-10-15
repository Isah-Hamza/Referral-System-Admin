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


export default function SampleAreaChart({payload = []}) {
  // const data = payload.map(item => {
  //   if(item.department_name == 'Laboratory Services'){
  //     return {...item, department_name:"Lab"};
  //   }
  //   return item
  // });

  const data = [payload[1], payload[0], payload[2]];

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
          <XAxis fontSize={14} fontWeight={600} dataKey="department_name" />
          <YAxis fontSize={12} fontWeight={600} axisLine={false} />
          <Tooltip />
          <Area type="monotone" fontSize={12} dataKey="missed_appointments" stroke="red" fill="#ff0000" fillOpacity={0.05} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
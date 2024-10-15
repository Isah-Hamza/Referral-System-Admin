import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function MultipleBarChart({payload}) {
    
    const data = [
      {
        name: 'Jan',
        uv: 4000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: 'Feb',
        uv: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: 'Mar',
        uv: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: 'Apr',
        uv: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: 'May',
        uv: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        name: 'Jun',
        uv: 2390,
        pv: 3800,
        amt: 2500,
      },
      {
        name: 'Jul',
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
    ];
  
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={payload}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis fontSize={12} fontWeight={600} dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar radius={[10,10,0,0]} dataKey="referrals" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar radius={[10,10,0,0]} dataKey="appointments" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
          <Bar radius={[10,10,0,0]} dataKey="payment_made" fill="#22aa9d" activeBar={<Rectangle fill="purple" stroke="red" />} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

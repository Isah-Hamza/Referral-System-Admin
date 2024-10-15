import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function MultipleBarChartWeekly({payload}) {

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
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar radius={[10,10,0,0]} dataKey="total_appointments" label="Total" fill="#00C49F" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar radius={[10,10,0,0]} dataKey="completed_appointments" fill="#2490eb" activeBar={<Rectangle fill="gold" stroke="purple" />} />
          <Bar radius={[10,10,0,0]} dataKey="cancelled_appointments" fill="#94a3b8" activeBar={<Rectangle fill="purple" stroke="red" />} />
        </BarChart>
      </ResponsiveContainer>
    );
}

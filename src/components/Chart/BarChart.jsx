import React, { PureComponent } from 'react';
import { BarChart as RechartBarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function BarChart({ data:payload , test, type}){
  const data = [
    {
      name: 'Jan',
      uv: 4000,
      pv: payload?.Jan,
      amt: 2400,
    },
    {
      name: 'Feb',
      uv: 3000,
      pv: payload?.Feb,
      amt: 2210,
    },
    {
      name: 'Mar',
      uv: 2000,
      pv: payload?.Mar,
      amt: 2290,
    },
    {
      name: 'Apr',
      uv: 2780,
      pv: payload?.Apr,
      amt: 2000,
    },
    {
      name: 'May',
      uv: 1890,
      pv: payload?.May,
      amt: 2181,
    },
    {
      name: 'Jun',
      uv: 2390,
      pv: payload?.Jun,
      amt: 2500,
    },
    {
      name: 'Jul',
      uv: 3490,
      pv: payload?.Jul,
      amt: 2100,
    },
    {
      name: 'Aug',
      uv: 2000,
      pv: payload?.Aug,
      amt: 2290,
    },
    {
      name: 'Sep',
      uv: 2780,
      pv: payload?.Sep,
      amt: 2000,
    },
    {
      name: 'Oct',
      uv: 1890,
      pv: payload?.Oct,
      amt: 2181,
    },
    {
      name: 'Nov',
      uv: 1890,
      pv: payload?.Nov,
      amt: 2181,
    },
    {
      name: 'Dec',
      uv: 1890,
      pv: payload?.Dec,
      amt: 2181,
    },
  ];

  const weeklyData = [
    {
      name: 'Mon',
      uv: 4000,
      pv: payload?.Mon,
      amt: 2400,
    },
    {
      name: 'Tue',
      uv: 3000,
      pv: payload?.Tue,
      amt: 2210,
    },
    {
      name: 'Wed',
      uv: 2000,
      pv: payload?.Wed,
      amt: 2290,
    },
    {
      name: 'Thu',
      uv: 2780,
      pv: payload?.Thu,
      amt: 2000,
    },
    {
      name: 'Fri',
      uv: 1890,
      pv: payload?.fri,
      amt: 2181,
    },
    {
      name: 'Sat',
      uv: 2390,
      pv: payload?.Sat,
      amt: 2500,
    },
    {
      name: 'Sun',
      uv: 2390,
      pv: payload?.Sun,
      amt: 2500,
    },
  ];

  const testData = [
    {
      name: 'Mon',
      uv: 4000,
      pv: payload?.Jan,
      amt: 2400,
    },
    {
      name: 'Tue',
      uv: 3000,
      pv: payload?.Feb,
      amt: 2210,
    },
    {
      name: 'Wed',
      uv: 2000,
      pv: payload?.Mar,
      amt: 2290,
    },
    {
      name: 'Thu',
      uv: 2780,
      pv: payload?.Apr,
      amt: 2000,
    },
    {
      name: 'Fri',
      uv: 1890,
      pv: payload?.May,
      amt: 2181,
    },
    {
      name: 'Sat',
      uv: 2390,
      pv: payload?.Jun,
      amt: 2500,
    },
    // {
    //   name: 'Jul',
    //   uv: 3490,
    //   pv: payload?.Jul,
    //   amt: 2100,
    // },
    // {
    //   name: 'Aug',
    //   uv: 2000,
    //   pv: payload?.Aug,
    //   amt: 2290,
    // },
    // {
    //   name: 'Sep',
    //   uv: 2780,
    //   pv: payload?.Sep,
    //   amt: 2000,
    // },
    // {
    //   name: 'Oct',
    //   uv: 1890,
    //   pv: payload?.Oct,
    //   amt: 2181,
    // },
    // {
    //   name: 'Nov',
    //   uv: 1890,
    //   pv: payload?.Nov,
    //   amt: 2181,
    // },
    // {
    //   name: 'Dec',
    //   uv: 1890,
    //   pv: payload?.Dec,
    //   amt: 2181,
    // },
  ];

    return (
      <ResponsiveContainer width={'100%'} height={'100%'}>
        <RechartBarChart
          width={500}
          height={300}
          data={test ? testData : type=='weekly' ? weeklyData : data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="1" />
          <XAxis fontWeight={700} fontSize={12} dataKey="name" />
          <YAxis units={'k'}  fontWeight={700} fontSize={12} />
          <Tooltip />
          {/* <Legend /> */}
          <Bar 
            background={'#ff0000'}
            style={{ }}
            // capHeight={400}

            dataKey="pv"  
            barSize={22}
            fill="#18100F" 
            activeBar={<Rectangle  stroke="blue" />} 
            radius={[10,10,0,0]}
            />
        </RechartBarChart>
      </ResponsiveContainer>
    );
}

import React, { Component } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const data = [
  { name: 'JavaScript', value: 400 },
  { name: 'Java', value: 300 },
  { name: 'Python', value: 400 },
  { name: 'Ruby', value: 300 },
  { name: 'C', value: 300 },
  { name: 'C++', value: 200 },
  { name: 'C#', value: 300 },
  { name: 'Elixir', value: 400 },
  { name: 'CSS', value: 300 },
  { name: 'HTML', value: 200 }
];
const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#000',
  '#432',
  '#782',
  '#745',
  '#808',
  '#243'
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)} %`}
    </text>
  );
};

class LanguageUsageChart extends Component {
  render() {
    return (
      <PieChart width={350} height={300} onMouseEnter={this.onPieEnter}>
        <Pie
          cx="50%"
          cy="50%"
          data={data}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={90}
          fill="#8884d8"
        >
          {data.map((entry, index) =>
            <Cell fill={COLORS[index % COLORS.length]} />
          )}
        </Pie>

        <Legend />
      </PieChart>
    );
  }
}

export default LanguageUsageChart;

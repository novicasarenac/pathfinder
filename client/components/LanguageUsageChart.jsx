/* eslint no-mixed-operators: "off" */

import React, { Component } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import utils from '../utils';

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent
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
      {percent < 0.02 ? '' : `${(percent * 100).toFixed(0)} %`}
    </text>
  );
};

class LanguageUsageChart extends Component {
  languageStats() {
    return Object.keys(this.props.data).map(key => ({
      name: key,
      value: this.props.data[key]
    }));
  }

  render() {
    return (
      <PieChart width={360} height={310} onMouseEnter={this.onPieEnter}>
        <Pie
          cx="50%"
          cy="50%"
          data={this.languageStats()}
          dataKey="value"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={95}
          fill="#8884d8"
        >
          {this.languageStats().map(entry =>
            (<Cell
              key={entry.name}
              fill={utils.getColorForLanguage(entry.name)}
            />)
          )}
        </Pie>

        <Legend iconType="circle" />
      </PieChart>
    );
  }
}

export default LanguageUsageChart;

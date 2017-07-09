/* eslint no-mixed-operators: "off" */

import React, { Component } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import GithubLanguageColors from '../utils/githubLanguageColors';

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
      {`${(percent * 100).toFixed(0)} %`}
    </text>
  );
};

class LanguageUsageChart extends Component {
  languageStats() {
    return Object.entries(this.props.data).map((language, percentage) => ({
      name: language,
      value: percentage
    }));
  }

  render() {
    const githubColors = new GithubLanguageColors();

    return (
      <PieChart width={350} height={300} onMouseEnter={this.onPieEnter}>
        <Pie
          cx="50%"
          cy="50%"
          data={this.languageStats()}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={90}
          fill="#8884d8"
        >
          {this.props.data.map(entry =>
            <Cell fill={githubColors.getColorForLanguage(entry.name)} />
          )}
        </Pie>

        <Legend />
      </PieChart>
    );
  }
}

export default LanguageUsageChart;

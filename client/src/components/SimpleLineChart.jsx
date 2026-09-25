import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';


function IncomeExpenseChart({data}) {

  return (
    <div style={{ width: '100%', height: 400 }}>
      {
        data ? (
          <ResponsiveContainer width={"100%"} height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" textAnchor="end" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9' }} itemStyle={{ color: '#f1f5f9' }} />
              <Legend wrapperStyle={{ color: '#94a3b8' }} />
              <Line strokeWidth={3} type="monotone" dataKey="income" stroke="#34d399" activeDot={{ r: 8 }} />
              <Line strokeWidth={3} type="monotone" dataKey="expense" stroke="#f43f5e" />
            </LineChart>
          </ResponsiveContainer>
        )
          :
          (
            <p style={{ textAlign: 'center', marginTop: 150 }}>An error has occurred. </p>
          )
      }

    </div>

  );
}

export default IncomeExpenseChart;

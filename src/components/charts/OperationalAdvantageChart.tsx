import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

interface OperationalAdvantageChartProps {
  isDark?: boolean;
}

// Concrete operational metrics:
// - 2.8x assets monitored
// - 3.6x faster response
// - -62% cost per analysis
// - 2.4x analyst capacity
const OPERATIONAL_BENCHMARK = [
  { metric: 'Ativos Monitorados', tradicional: 1.0, elleva: 2.8, display: '2,8x' },
  { metric: 'Velocidade de Resposta', tradicional: 1.0, elleva: 3.6, display: '3,6x' },
  { metric: 'Custo por Análise', tradicional: 1.0, elleva: 0.38, display: '-62%' },
  { metric: 'Capacidade / Analista', tradicional: 1.0, elleva: 2.4, display: '2,4x' },
];

export const OperationalAdvantageChart: React.FC<OperationalAdvantageChartProps> = ({ isDark = false }) => {
  const textColor = isDark ? '#8E9995' : '#4E5653';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';

  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={OPERATIONAL_BENCHMARK}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          barGap={6}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis
            dataKey="metric"
            tick={{ fill: textColor, fontSize: 10 }}
            axisLine={{ stroke: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: textColor, fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            domain={[0, 4]}
          />
          <Tooltip
            formatter={(val: any, name: string) => [
              `${val}x`,
              name === 'tradicional' ? 'Tradicional' : 'Elleva',
            ]}
            contentStyle={{
              backgroundColor: isDark ? '#0A0D0F' : '#FFFFFF',
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              borderRadius: '4px',
              fontSize: '11px',
              color: isDark ? '#F5F7F6' : '#0A0D0C',
            }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{ paddingBottom: '8px', fontSize: '10px' }}
          />
          <Bar
            name="Tradicional (Base 1.0)"
            dataKey="tradicional"
            fill={isDark ? '#8E9995' : '#4E5653'}
            radius={[2, 2, 0, 0]}
          />
          <Bar
            name="Elleva"
            dataKey="elleva"
            fill="#189890"
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

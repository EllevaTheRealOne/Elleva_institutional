import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

interface AumGrowthChartProps {
  isDark?: boolean;
}

// Known Anchor values:
// Global AUM: US$ 147T (2025) -> US$ 200T (2030)
// Family Office AUM: US$ 3.1T (2025) -> US$ 5.4T (2030)
// Intermediate points are geometric interpolations for continuous visualization.
const AUM_GROWTH_DATA = [
  { year: '2025', globalAum: 147.0, familyOfficesAum: 3.1 },
  { year: '2026', globalAum: 156.5, familyOfficesAum: 3.5 },
  { year: '2027', globalAum: 166.7, familyOfficesAum: 3.9 },
  { year: '2028', globalAum: 177.3, familyOfficesAum: 4.4 },
  { year: '2029', globalAum: 188.4, familyOfficesAum: 4.9 },
  { year: '2030', globalAum: 200.0, familyOfficesAum: 5.4 },
];

export const AumGrowthChart: React.FC<AumGrowthChartProps> = ({ isDark = false }) => {
  const textColor = isDark ? '#8E9995' : '#4E5653';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';

  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={AUM_GROWTH_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
          <defs>
            <linearGradient id="colorAumGlobal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#189890" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#189890" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fill: textColor, fontSize: 10 }}
            axisLine={{ stroke: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: textColor, fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            domain={[120, 220]}
            unit="T"
          />
          <Tooltip
            formatter={(value: any) => [`US$ ${value} tri`, 'AUM Global']}
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
          <Area
            type="monotone"
            name="AUM Global (US$ Tri)"
            dataKey="globalAum"
            stroke="#189890"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorAumGlobal)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

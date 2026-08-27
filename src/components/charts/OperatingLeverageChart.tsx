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

interface OperatingLeverageChartProps {
  isDark?: boolean;
}

// Illustrative operational leverage model comparing Autonomous Capital Infrastructure vs Traditional Manual Scaling
const OPERATING_DATA = [
  { scale: '1x Mandatos', manualCost: 20, ellevaEfficiency: 92, manualBandwidth: 25 },
  { scale: '2x Mandatos', manualCost: 38, ellevaEfficiency: 94, manualBandwidth: 42 },
  { scale: '5x Mandatos', manualCost: 72, ellevaEfficiency: 97, manualBandwidth: 60 },
  { scale: '10x Mandatos', manualCost: 118, ellevaEfficiency: 98, manualBandwidth: 75 },
  { scale: '25x Mandatos', manualCost: 240, ellevaEfficiency: 99, manualBandwidth: 82 },
  { scale: '50x Mandatos', manualCost: 490, ellevaEfficiency: 99.5, manualBandwidth: 86 },
];

export const OperatingLeverageChart: React.FC<OperatingLeverageChartProps> = ({ isDark = false }) => {
  const secondaryColor = isDark ? '#8E9995' : '#4E5653';
  const textColor = isDark ? '#8E9995' : '#4E5653';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';

  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={OPERATING_DATA} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
          <defs>
            <linearGradient id="colorElleva" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#189890" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#189890" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorManual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={secondaryColor} stopOpacity={0.15} />
              <stop offset="95%" stopColor={secondaryColor} stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis
            dataKey="scale"
            tick={{ fill: textColor, fontSize: 10 }}
            axisLine={{ stroke: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: textColor, fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            domain={[0, 100]}
          />
          <Tooltip
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
            name="Eficiência Elleva (%)"
            dataKey="ellevaEfficiency"
            stroke="#189890"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorElleva)"
          />
          <Area
            type="monotone"
            name="Capacidade Manual (%)"
            dataKey="manualBandwidth"
            stroke={secondaryColor}
            strokeWidth={1.5}
            strokeDasharray="4 4"
            fillOpacity={1}
            fill="url(#colorManual)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

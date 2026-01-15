import React from 'react';
import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { ChartDataPoint } from '../../types';
import { formatCurrency } from '../../lib/utils';

interface CryptoChartProps {
    data: ChartDataPoint[];
    color?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-ios-black/90 backdrop-blur-md px-3 py-2 rounded-lg shadow-xl border border-white/10">
                <p className="text-caption text-ios-gray-300 mb-0.5">{label}</p>
                <p className="text-body font-bold text-white">
                    {formatCurrency(payload[0].value)}
                </p>
            </div>
        );
    }
    return null;
};

const CryptoChart: React.FC<CryptoChartProps> = ({ data, color = '#F59E0B' }) => {
    return (
        <div className="w-full h-[250px] animate-fade-in">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: '#8E8E93' }}
                        dy={10}
                        minTickGap={20}
                    />
                    <YAxis hide domain={['auto', 'auto']} />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: '3 3' }} />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke={color}
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CryptoChart;

import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import Card from '../ui/Card';
import { ChartDataPoint } from '../../types';
import { formatCurrency } from '../../lib/utils';

interface PointsChartProps {
    data: ChartDataPoint[];
}

/**
 * Points trend chart with minimalist iOS styling
 */
const PointsChart: React.FC<PointsChartProps> = ({ data }) => {
    return (
        <Card className="p-5">
            <h3 className="text-title-3 font-semibold text-ios-black mb-4">Points Trend</h3>

            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="pointsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#000000" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#E5E5EA"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="date"
                        stroke="#6E6E73"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />

                    <YAxis
                        stroke="#6E6E73"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #D1D1D6',
                            borderRadius: '12px',
                            padding: '12px',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                        }}
                        labelStyle={{
                            color: '#000000',
                            fontWeight: 600,
                            marginBottom: '4px',
                        }}
                        itemStyle={{
                            color: '#6E6E73',
                            fontSize: '13px',
                        }}
                        formatter={(value: number, name: string) => {
                            if (name === 'points') {
                                return [value.toLocaleString('en-IN'), 'Points'];
                            }
                            return [formatCurrency(value), 'Value'];
                        }}
                    />

                    <Area
                        type="monotone"
                        dataKey="points"
                        stroke="#000000"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#pointsGradient)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default PointsChart;

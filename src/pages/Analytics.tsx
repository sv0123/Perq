import React from 'react';
import Card from '../components/ui/Card';
import {
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Area,
    AreaChart
} from 'recharts';
import { formatCurrency } from '../lib/utils';
import { TrendingUp, Award, Target, Download, Zap, CreditCard as CardIcon, ShoppingBag, Plane, Coffee, Fuel, Globe } from 'lucide-react';
import Button from '../components/ui/Button';
// End of imports

/**
 * Analytics page with detailed insights and visualizations
 */
const Analytics: React.FC = () => {

    // Calculate analytics data
    const categoryData = [
        { category: 'Shopping', points: 45000, value: 11250, color: '#FF6B6B', icon: <ShoppingBag size={14} /> },
        { category: 'Travel', points: 32000, value: 8000, color: '#4ECDC4', icon: <Plane size={14} /> },
        { category: 'Dining', points: 28000, value: 7000, color: '#FFD93D', icon: <Coffee size={14} /> },
        { category: 'Fuel', points: 18000, value: 4500, color: '#1A73E8', icon: <Fuel size={14} /> },
        { category: 'Online', points: 25000, value: 6250, color: '#6C5CE7', icon: <Globe size={14} /> },
    ];

    const monthlyTrend = [
        { month: 'Jul', earned: 28000, redeemed: 5000 },
        { month: 'Aug', earned: 32000, redeemed: 8000 },
        { month: 'Sep', earned: 35000, redeemed: 6000 },
        { month: 'Oct', earned: 38000, redeemed: 10000 },
        { month: 'Nov', earned: 42000, redeemed: 7000 },
        { month: 'Dec', earned: 45000, redeemed: 9000 },
    ];

    const totalEarned = monthlyTrend.reduce((sum, m) => sum + m.earned, 0);
    const totalRedeemed = monthlyTrend.reduce((sum, m) => sum + m.redeemed, 0);
    const netGain = totalEarned - totalRedeemed;

    return (
        <div className="min-h-screen bg-ios-gray-50 page-transition pb-20">
            <div className="ios-container py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-large-title font-bold text-ios-black mb-2">Analytics</h1>
                        <p className="text-body text-ios-gray-600">
                            Detailed insights into your rewards program
                        </p>
                    </div>
                    <Button variant="secondary" className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-100">
                        <Download className="w-5 h-5 mr-2" />
                        Export Data
                    </Button>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                    <Card className="p-6 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-400/0 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                        <div className="flex items-center gap-3 mb-4 relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-900/20">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-subhead font-medium text-gray-500">Total Earned</h3>
                                <p className="text-title-2 font-bold text-ios-black">
                                    {totalEarned.toLocaleString('en-IN')}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-green-600 font-medium text-footnote bg-green-50 w-fit px-2 py-1 rounded-full">
                            <Zap className="w-3 h-3 fill-current" />
                            <span>{formatCurrency(totalEarned / 4)} value generated</span>
                        </div>
                    </Card>

                    <Card className="p-6 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/0 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                        <div className="flex items-center gap-3 mb-4 relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-900/20">
                                <Award className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-subhead font-medium text-gray-500">Total Redeemed</h3>
                                <p className="text-title-2 font-bold text-ios-black">
                                    {totalRedeemed.toLocaleString('en-IN')}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-blue-600 font-medium text-footnote bg-blue-50 w-fit px-2 py-1 rounded-full">
                            <CardIcon className="w-3 h-3" />
                            <span>{formatCurrency(totalRedeemed / 4)} redeemed</span>
                        </div>
                    </Card>

                    <Card className="p-6 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/0 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                        <div className="flex items-center gap-3 mb-4 relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-900/20">
                                <Target className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-subhead font-medium text-gray-500">Net Gain</h3>
                                <p className="text-title-2 font-bold text-ios-black">
                                    {netGain.toLocaleString('en-IN')}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-purple-600 font-medium text-footnote bg-purple-50 w-fit px-2 py-1 rounded-full">
                            <TrendingUp className="w-3 h-3" />
                            <span>{formatCurrency(netGain / 4)} potential value</span>
                        </div>
                    </Card>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Category Breakdown */}
                    <Card className="p-6">
                        <h3 className="text-title-3 font-bold text-ios-black mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
                            Spending Distribution
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="points"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                        border: 'none',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                                        padding: '12px',
                                    }}
                                    formatter={(value: number) => [
                                        value.toLocaleString('en-IN') + ' pts',
                                        'Points',
                                    ]}
                                />
                                <Legend
                                    verticalAlign="middle"
                                    align="right"
                                    layout="vertical"
                                    iconType="circle"
                                    formatter={(value, _entry: any) => (
                                        <span className="text-caption font-medium text-gray-600 ml-1">{value}</span>
                                    )}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>

                    {/* Monthly Trend */}
                    <Card className="p-6">
                        <h3 className="text-title-3 font-bold text-ios-black mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-green-500 rounded-full"></span>
                            Earning History
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={monthlyTrend}>
                                <defs>
                                    <linearGradient id="colorEarned" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorRedeemed" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                                <YAxis
                                    stroke="#9CA3AF"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                                />
                                <Tooltip
                                    cursor={{ stroke: '#E5E7EB', strokeWidth: 2 }}
                                    contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                        border: 'none',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                                        padding: '12px',
                                    }}
                                    formatter={(value: number) => value.toLocaleString('en-IN') + ' pts'}
                                />
                                <Legend />
                                <Area type="monotone" dataKey="earned" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorEarned)" />
                                <Area type="monotone" dataKey="redeemed" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#colorRedeemed)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Card>
                </div>

                {/* Insights Cards */}
                <h2 className="text-title-2 font-bold text-ios-black mb-5">Smart Insights</h2>
                {/* Dynamic Insights Calculation */}
                {(() => {
                    // Find category with max points
                    const bestCategory = [...categoryData].sort((a, b) => b.points - a.points)[0];

                    // Calculate growth (Last month vs First month)
                    const firstMonth = monthlyTrend[0].earned;
                    const lastMonth = monthlyTrend[monthlyTrend.length - 1].earned;
                    const growthRate = ((lastMonth - firstMonth) / firstMonth) * 100;

                    return (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 hover:shadow-lg transition-all duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-2xl">
                                        🎯
                                    </div>
                                    <div>
                                        <h3 className="text-body font-bold text-green-800 mb-1">
                                            Top Category: {bestCategory.category}
                                        </h3>
                                        <p className="text-footnote text-green-700/80 leading-relaxed">
                                            <span className="font-semibold">{bestCategory.category}</span> generates {(bestCategory.points / totalEarned * 100).toFixed(0)}% of your earnings.
                                            Focus on this category to maximize your distinct rewards.
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 hover:shadow-lg transition-all duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-2xl">
                                        💡
                                    </div>
                                    <div>
                                        <h3 className="text-body font-bold text-amber-800 mb-1">
                                            Optimization Tip
                                        </h3>
                                        <p className="text-footnote text-amber-700/80 leading-relaxed">
                                            You can save an additional <span className="font-bold">₹5,000/month</span> by utilizing specific category multipliers.
                                            Check our recommendations in the Dashboard.
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 hover:shadow-lg transition-all duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-2xl">
                                        📊
                                    </div>
                                    <div>
                                        <h3 className="text-body font-bold text-blue-800 mb-1">
                                            Redemption Rate
                                        </h3>
                                        <p className="text-footnote text-blue-700/80 leading-relaxed">
                                            You've redeemed <span className="font-bold">{((totalRedeemed / totalEarned) * 100).toFixed(1)}%</span> of earned points.
                                            Industry average is 35%. Great job utilizing your rewards!
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 hover:shadow-lg transition-all duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-2xl">
                                        🚀
                                    </div>
                                    <div>
                                        <h3 className="text-body font-bold text-purple-800 mb-1">
                                            Growth Trend
                                        </h3>
                                        <p className="text-footnote text-purple-700/80 leading-relaxed">
                                            Your points earning has increased by <span className="font-bold">{growthRate.toFixed(0)}%</span> over the last 6 months. Keep up the
                                            excellent card usage strategy!
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    );
                })()}
            </div>
        </div>
    );
};

export default Analytics;

import React, { useState } from 'react';
import StatsCard from '../components/dashboard/StatsCard';
import CreditCardDisplay from '../components/dashboard/CreditCardDisplay';
import ExpiryAlerts from '../components/dashboard/ExpiryAlerts';
import PointsChart from '../components/dashboard/PointsChart';
import Button from '../components/ui/Button';
import { useCardManagement } from '../hooks/useCardManagement';
import {
    mockPointsTrend,
    mockExpiryAlerts,
    calculateTotalStats,
} from '../data/mockData';
import { formatCurrency, formatNumber } from '../lib/utils';
import {
    Wallet,
    TrendingUp,
    Clock,
    Sparkles,
    Search,
    ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Dashboard page - main overview with statistics and insights
 */
const Dashboard: React.FC = () => {
    const { cards } = useCardManagement();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const stats = calculateTotalStats(cards);

    // Filter cards based on search
    const filteredCards = cards.filter(
        (card) =>
            card.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.cardType.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.cardholderName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAutoRedeem = (_alertId: string) => {
        // Mock auto-redeem functionality
        alert('Auto-redeem feature coming soon!');
    };

    return (
        <div className="min-h-screen bg-ios-gray-50 page-transition">
            <div className="ios-container py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-large-title font-bold text-ios-black mb-2">
                        Welcome back! 👋
                    </h1>
                    <p className="text-body text-ios-gray-600">
                        Here's your rewards overview for today
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ios-gray-400" />
                        <input
                            type="text"
                            placeholder="Search cards by bank, type, or holder..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-ios-white border border-ios-gray-200 rounded-ios-lg text-body text-ios-black placeholder-ios-gray-400 focus:border-ios-black focus:ring-2 focus:ring-ios-black transition-all duration-200"
                        />
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    <StatsCard
                        title="Total Points"
                        value={formatNumber(stats.totalPoints)}
                        subtitle={`${stats.totalPoints.toLocaleString('en-IN')} points`}
                        icon={Wallet}
                        trend={{ value: 12.5, isPositive: true }}
                    />
                    <StatsCard
                        title="Total Value"
                        value={formatCurrency(stats.totalValue)}
                        subtitle="Estimated worth"
                        icon={TrendingUp}
                        trend={{ value: 8.3, isPositive: true }}
                    />
                    <StatsCard
                        title="Expiring Soon"
                        value={formatNumber(stats.pointsExpiringSoon)}
                        subtitle="Next 30 days"
                        icon={Clock}
                        trend={{ value: 3.2, isPositive: false }}
                    />
                    <StatsCard
                        title="Points Saved"
                        value={formatNumber(stats.pointsSaved)}
                        subtitle="Through optimization"
                        icon={Sparkles}
                        trend={{ value: 15.7, isPositive: true }}
                    />
                </div>

                {/* Main Content - 2 Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Left Column - Charts */}
                    <div className="lg:col-span-2 space-y-6">
                        <PointsChart data={mockPointsTrend} />

                        {/* Quick Actions */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            <button
                                onClick={() => navigate('/cards')}
                                className="group relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-left tap-feedback transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-1"
                            >
                                <div className="relative z-10 h-full flex flex-col">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <Wallet className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                                        Manage Cards
                                    </h3>
                                    <p className="text-sm text-white/80 font-medium leading-relaxed mb-4">
                                        Add or edit your credit cards
                                    </p>
                                    <div className="mt-auto flex items-center justify-end">
                                        <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>

                            <button
                                onClick={() => navigate('/marketplace')}
                                className="group relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-left tap-feedback transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/30 hover:-translate-y-1"
                            >
                                <div className="relative z-10 h-full flex flex-col">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <TrendingUp className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                                        Marketplace
                                    </h3>
                                    <p className="text-sm text-white/80 font-medium leading-relaxed mb-4">
                                        Trade points with others
                                    </p>
                                    <div className="mt-auto flex items-center justify-end">
                                        <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>

                            <button
                                onClick={() => navigate('/crypto')}
                                className="group relative overflow-hidden bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl p-6 text-left tap-feedback transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-1"
                            >
                                <div className="relative z-10 h-full flex flex-col">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <Sparkles className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                                        Convert to Crypto
                                    </h3>
                                    <p className="text-sm text-white/80 font-medium leading-relaxed mb-4">
                                        Exchange for cryptocurrency
                                    </p>
                                    <div className="mt-auto flex items-center justify-end">
                                        <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Expiry Alerts */}
                    <div className="lg:col-span-1">
                        <ExpiryAlerts alerts={mockExpiryAlerts} onAutoRedeem={handleAutoRedeem} />
                    </div>
                </div>

                {/* Credit Cards Preview */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-title-2 font-bold text-ios-black">Your Cards</h2>
                        <Button variant="ghost" size="sm" onClick={() => navigate('/cards')}>
                            View All
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>

                    {filteredCards.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCards.slice(0, 3).map((card) => (
                                <div key={card.id} className="transform transition-all duration-300 hover:scale-105">
                                    <CreditCardDisplay card={card} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-ios-white rounded-ios-lg border border-ios-gray-200">
                            <p className="text-body text-ios-gray-500">
                                {searchQuery ? 'No cards found matching your search.' : 'No credit cards added yet.'}
                            </p>
                            <Button variant="primary" className="mt-4" onClick={() => navigate('/cards')}>
                                {searchQuery ? 'Clear Search' : 'Add Your First Card'}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

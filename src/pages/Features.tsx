import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import AIOptimizer from '../components/features/AIOptimizer';
import PointsStaking from '../components/features/PointsStaking';
import AchievementsWidget from '../components/features/AchievementsWidget';
import FamilyPooling from '../components/features/FamilyPooling';
import {
    mockOptimizationTips,
    stakingOptions,
    mockAchievements,
    OptimizationTip,
    StakingOption
} from '../data/uniqueFeatures';
import { useCardManagement } from '../hooks/useCardManagement';
import { calculateTotalStats } from '../data/mockData';
import { Sparkles, Users, Shield, Zap, TrendingUp, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';

/**
 * Perq Plus page - showcase market-differentiating premium features
 */
const Features: React.FC = () => {
    const { cards } = useCardManagement();
    const navigate = useNavigate();
    const stats = calculateTotalStats(cards);

    // Simulate user state (persisted in session for demo)
    const [isMember, setIsMember] = useState<boolean>(() => {
        return localStorage.getItem('isPerqPlusMember') === 'true';
    });
    const [isUpgrading, setIsUpgrading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const showSuccess = (message: string) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleUpgrade = () => {
        setIsUpgrading(true);
        // Simulate payment processing
        setTimeout(() => {
            setIsMember(true);
            localStorage.setItem('isPerqPlusMember', 'true');
            setIsUpgrading(false);
            showSuccess('Welcome to Perq Plus! All premium features are now unlocked.');
        }, 2000);
    };

    const handleTakeAction = (tip: OptimizationTip) => {
        if (!isMember) return;
        showSuccess(`Action taken: ${tip.action}. Potential savings: ₹${tip.potentialSavings?.toLocaleString('en-IN')}`);
        if (tip.actionLink) {
            setTimeout(() => navigate(tip.actionLink!), 1500);
        }
    };

    const handleStake = (option: StakingOption) => {
        if (!isMember) return;
        const earnings = Math.floor(stats.totalPoints * (option.interestRate / 100));
        showSuccess(`Successfully staked ${stats.totalPoints.toLocaleString('en-IN')} points! You'll earn ${earnings.toLocaleString('en-IN')} bonus points.`);
    };

    return (
        <div className="min-h-screen bg-ios-gray-50 page-transition pb-20">
            <div className="ios-container py-8">
                {/* Hero Section */}
                <div className="mb-10 text-center relative">
                    <div className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 transition-all duration-500",
                        isMember
                            ? "bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900 shadow-lg shadow-yellow-400/20"
                            : "bg-gradient-to-r from-ios-gray-800 to-black text-white"
                    )}>
                        {isMember ? <CheckCircle className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                        <span className="text-sm font-bold tracking-wide">
                            {isMember ? "PERQ PLUS MEMBER" : "PREMIUM FEATURES"}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-ios-black mb-4 tracking-tight">
                        {isMember ? "Maximize Your Potential" : "Unlock Perq Plus"}
                    </h1>
                    <p className="text-lg text-ios-gray-600 max-w-2xl mx-auto leading-relaxed">
                        {isMember
                            ? "You have full access to our most advanced reward optimization tools."
                            : "Join the elite tier of rewards optimization. Multiply your points value, automate earnings, and access exclusive liquidity pools."}
                    </p>

                    {!isMember && (
                        <div className="mt-8">
                            <Button
                                onClick={handleUpgrade}
                                disabled={isUpgrading}
                                className="bg-ios-black text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 min-w-[200px]"
                            >
                                {isUpgrading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                                        Activating...
                                    </span>
                                ) : (
                                    "Upgrade Now - ₹999/yr"
                                )}
                            </Button>
                            <p className="text-xs text-gray-400 mt-3 font-medium">30-day money-back guarantee • Cancel anytime</p>
                        </div>
                    )}
                </div>

                {/* Feature Highlights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                    <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/20">
                            <Zap className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-title-3 font-bold text-ios-black mb-2">AI Optimizer</h3>
                        <p className="text-footnote text-ios-gray-600">
                            Smart algorithms that automatically detect the best card for every purchase.
                        </p>
                    </Card>

                    <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
                            <TrendingUp className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-title-3 font-bold text-ios-black mb-2">Points Staking</h3>
                        <p className="text-footnote text-ios-gray-600">
                            Earn up to 20% APY by staking your unused reward points.
                        </p>
                    </Card>

                    <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
                            <Users className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-title-3 font-bold text-ios-black mb-2">Family Pooling</h3>
                        <p className="text-footnote text-ios-gray-600">
                            Combine points with family for 25% better redemption value.
                        </p>
                    </Card>

                    <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative group overflow-hidden">
                        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-500/20">
                            <Shield className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-title-3 font-bold text-ios-black mb-2">Points Insurance</h3>
                        <p className="text-footnote text-ios-gray-600 mb-3">
                            Complete protection against point devaluation and expiry.
                        </p>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => isMember && showSuccess("Insurance activated! Your points are safe.")} // Simplified for this snippet, fully implemented below
                            className="w-full mt-2"
                            disabled={!isMember}
                        >
                            Get Insurance
                        </Button>
                    </Card>
                </div>

                {/* Main Features Interface */}
                <div className="space-y-8 relative">
                    {/* Lock Overlay for Non-Members */}
                    {!isMember && (
                        <div className="absolute inset-0 z-30 bg-ios-gray-50/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-3xl border border-white/20">
                            <div className="bg-ios-black text-white p-4 rounded-full shadow-2xl mb-4 animate-bounce">
                                <Sparkles className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-ios-black mb-2">Pro Features Locked</h3>
                            <p className="text-gray-500 mb-6 text-center max-w-md">
                                Upgrade to Perq Plus to access AI Optimization, Points Staking, and Family Pooling.
                            </p>
                            <Button
                                onClick={handleUpgrade}
                                disabled={isUpgrading}
                                className="bg-ios-black text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
                            >
                                {isUpgrading ? "Unlocking..." : "Unlock All Features"}
                            </Button>
                        </div>
                    )}

                    <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-6", !isMember && "opacity-50 pointer-events-none filter blur-sm")}>
                        {/* AI Optimizer */}
                        <AIOptimizer tips={mockOptimizationTips} onTakeAction={handleTakeAction} />

                        {/* Points Staking */}
                        <PointsStaking
                            options={stakingOptions}
                            totalPoints={stats.totalPoints}
                            onStake={handleStake}
                        />
                    </div>

                    {/* Achievements */}
                    <div className={cn(!isMember && "opacity-50 pointer-events-none filter blur-sm")}>
                        <AchievementsWidget achievements={mockAchievements} />
                    </div>

                    {/* Family Pooling */}
                    <div className={cn(!isMember && "opacity-50 pointer-events-none filter blur-sm")}>
                        <FamilyPooling userPoints={stats.totalPoints} />
                    </div>
                </div>

                {/* Additional Features Coming Soon */}
                <div className="mt-12">
                    <Card variant="elevated" className="p-8 text-center bg-gradient-to-br from-ios-gray-50 to-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 bg-blue-100 text-blue-700 text-xs font-bold rounded-bl-xl uppercase tracking-wider">
                            Roadmap 2026
                        </div>
                        <Sparkles className="w-12 h-12 text-violet-600 mx-auto mb-4" />
                        <h2 className="text-title-2 font-bold text-ios-black mb-3">More Innovation Coming Soon</h2>
                        <p className="text-body text-ios-gray-600 mb-6 max-w-2xl mx-auto">
                            We're constantly developing new features to give you the ultimate rewards experience.
                            Stay tuned for instant liquidity, smart redemption routing, and more!
                        </p>
                        <Button variant="primary" size="lg" className="bg-violet-600 hover:bg-violet-700 text-white border-none">
                            Join Waitlist for Early Access
                        </Button>
                    </Card>
                </div>

                {/* Success Toast */}
                {successMessage && (
                    <div className="fixed bottom-8 right-8 bg-black/90 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 animate-slide-in">
                        <CheckCircle className="w-6 h-6 flex-shrink-0 text-green-400" />
                        <p className="text-sm font-medium">{successMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Features;

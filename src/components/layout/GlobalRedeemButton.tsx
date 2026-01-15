import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, X, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import { useCardManagement } from '../../hooks/useCardManagement';
import { calculateTotalStats } from '../../data/mockData';

/**
 * Global Redeem Button - Accessible from anywhere in the app
 */
const GlobalRedeemButton: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const { cards } = useCardManagement();
    const stats = calculateTotalStats(cards);
    const navigate = useNavigate();

    const quickRedemptions = [
        {
            id: '1',
            title: 'Amazon Gift Card',
            points: 2500,
            value: '₹500',
            icon: '🛒',
            savings: 'Best Value',
        },
        {
            id: '2',
            title: 'Flight Booking',
            points: 5000,
            value: '₹1,250',
            icon: '✈️',
            savings: '25% Bonus',
        },
        {
            id: '3',
            title: 'Hotel Voucher',
            points: 4000,
            value: '₹1,000',
            icon: '🏨',
            savings: 'Popular',
        },
        {
            id: '4',
            title: 'Cashback',
            points: 1000,
            value: '₹200',
            icon: '💰',
            savings: 'Instant',
        },
    ];

    const handleQuickRedeem = (option: any) => {
        if (stats.totalPoints < option.points) {
            alert(`You need ${option.points.toLocaleString('en-IN')} points. You have ${stats.totalPoints.toLocaleString('en-IN')} points.`);
            return;
        }
        setShowModal(false);
        navigate('/marketplace');
    };

    return (
        <>
            {/* Floating Redeem Button */}
            <button
                onClick={() => setShowModal(true)}
                className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                title="Redeem Points"
            >
                <Gift className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" />
                {stats.totalPoints > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center animate-pulse">
                        {stats.totalPoints > 9999 ? '9K+' : Math.floor(stats.totalPoints / 1000) + 'K'}
                    </span>
                )}
            </button>

            {/* Redemption Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-6 text-white relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-20 translate-x-20"></div>
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-16 -translate-x-16"></div>
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Gift className="w-6 h-6" />
                                        <h2 className="text-title-2 font-bold">Redeem Your Points</h2>
                                    </div>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div>
                                        <p className="text-sm opacity-90">Available Points</p>
                                        <p className="text-3xl font-bold">{stats.totalPoints.toLocaleString('en-IN')}</p>
                                    </div>
                                    <div className="flex-1"></div>
                                    <div className="text-right">
                                        <p className="text-sm opacity-90">Estimated Value</p>
                                        <p className="text-2xl font-bold">₹{Math.floor(stats.totalPoints * 0.25).toLocaleString('en-IN')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto max-h-[60vh]">
                            {/* Quick Redemption Options */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Sparkles className="w-5 h-5 text-violet-600" />
                                    <h3 className="text-title-3 font-bold text-ios-black">Quick Redemption</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {quickRedemptions.map((option) => {
                                        const canRedeem = stats.totalPoints >= option.points;
                                        return (
                                            <div
                                                key={option.id}
                                                className={`p-4 rounded-xl border-2 transition-all duration-200 ${canRedeem
                                                    ? 'border-violet-200 bg-violet-50 hover:border-violet-400 hover:shadow-lg cursor-pointer'
                                                    : 'border-gray-200 bg-gray-50 opacity-60'
                                                    }`}
                                                onClick={() => canRedeem && handleQuickRedeem(option)}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="text-4xl">{option.icon}</div>
                                                    <div className="flex-1">
                                                        <div className="flex items-start justify-between mb-1">
                                                            <h4 className="text-body font-bold text-ios-black">{option.title}</h4>
                                                            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-semibold">
                                                                {option.savings}
                                                            </span>
                                                        </div>
                                                        <p className="text-footnote text-ios-gray-600 mb-2">
                                                            {option.points.toLocaleString('en-IN')} points = {option.value}
                                                        </p>
                                                        {canRedeem ? (
                                                            <div className="flex items-center gap-1 text-violet-600 text-sm font-medium">
                                                                <span>Redeem Now</span>
                                                                <ArrowRight className="w-4 h-4" />
                                                            </div>
                                                        ) : (
                                                            <p className="text-xs text-red-600">
                                                                Need {(option.points - stats.totalPoints).toLocaleString('en-IN')} more points
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="bg-blue-50 rounded-xl p-4 text-center">
                                    <TrendingUp className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                                    <p className="text-caption text-ios-gray-600">Total Value</p>
                                    <p className="text-title-3 font-bold text-ios-black">
                                        ₹{Math.floor(stats.totalValue).toLocaleString('en-IN')}
                                    </p>
                                </div>
                                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                                    <Gift className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
                                    <p className="text-caption text-ios-gray-600">Points Saved</p>
                                    <p className="text-title-3 font-bold text-ios-black">
                                        {stats.pointsSaved.toLocaleString('en-IN')}
                                    </p>
                                </div>
                                <div className="bg-amber-50 rounded-xl p-4 text-center">
                                    <Sparkles className="w-5 h-5 text-amber-600 mx-auto mb-2" />
                                    <p className="text-caption text-ios-gray-600">Available</p>
                                    <p className="text-title-3 font-bold text-ios-black">
                                        {stats.totalPoints.toLocaleString('en-IN')}
                                    </p>
                                </div>
                            </div>

                            {/* Call to Action */}
                            <div className="bg-gradient-to-r from-violet-50 to-purple-50 border-2 border-violet-200 rounded-xl p-6 text-center">
                                <Gift className="w-12 h-12 text-violet-600 mx-auto mb-3" />
                                <h4 className="text-title-3 font-bold text-ios-black mb-2">
                                    Explore Full Marketplace
                                </h4>
                                <p className="text-body text-ios-gray-600 mb-4">
                                    Discover 100+ redemption options including travel, shopping, dining, and more!
                                </p>
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={() => {
                                        setShowModal(false);
                                        navigate('/marketplace');
                                    }}
                                >
                                    Browse All Options
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GlobalRedeemButton;

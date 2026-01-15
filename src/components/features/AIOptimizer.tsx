import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { OptimizationTip } from '../../data/uniqueFeatures';
import { TrendingUp, Shield, Zap, ArrowRight, X, CheckCircle, AlertCircle } from 'lucide-react';

interface AIOptimizerProps {
    tips: OptimizationTip[];
    onTakeAction: (tip: OptimizationTip) => void;
}

/**
 * AI-powered points optimization widget - Fully functional end-to-end
 */
const AIOptimizer: React.FC<AIOptimizerProps> = ({ tips, onTakeAction }) => {
    const [selectedTip, setSelectedTip] = useState<OptimizationTip | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showAllTips, setShowAllTips] = useState(false);
    const [processingTip, setProcessingTip] = useState<string | null>(null);
    const [completedTips, setCompletedTips] = useState<Set<string>>(new Set());

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'error';
            case 'medium': return 'warning';
            case 'low': return 'info';
            default: return 'default';
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'savings': return Shield;
            case 'earning': return TrendingUp;
            case 'redemption': return Zap;
            case 'protection': return Shield;
            default: return TrendingUp;
        }
    };

    const getPriorityIcon = (priority: string) => {
        switch (priority) {
            case 'high': return AlertCircle;
            case 'medium': return Zap;
            case 'low': return TrendingUp;
            default: return Zap;
        }
    };

    const totalSavings = tips
        .filter(tip => !completedTips.has(tip.id))
        .reduce((sum, tip) => sum + (tip.potentialSavings || 0), 0);

    const activeTips = tips.filter(tip => !completedTips.has(tip.id));
    const displayedTips = showAllTips ? activeTips : activeTips.slice(0, 3);

    const handleAction = (tip: OptimizationTip) => {
        setSelectedTip(tip);
        setShowModal(true);
    };

    const confirmAction = async () => {
        if (selectedTip) {
            setProcessingTip(selectedTip.id);
            setShowModal(false);

            // Simulate processing
            await new Promise(resolve => setTimeout(resolve, 800));

            // Execute the action
            onTakeAction(selectedTip);

            // Mark as completed
            setCompletedTips(prev => new Set([...prev, selectedTip.id]));
            setProcessingTip(null);
            setSelectedTip(null);
        }
    };

    const cancelAction = () => {
        setShowModal(false);
        setSelectedTip(null);
    };

    return (
        <>
            <Card variant="elevated" className="overflow-hidden">
                {/* Header with gradient */}
                <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-white relative overflow-hidden">
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Zap className="w-5 h-5" />
                                    <h3 className="text-title-3 font-bold">AI Points Optimizer</h3>
                                </div>
                                <p className="text-sm opacity-90">
                                    {activeTips.length} smart recommendations • Save money automatically
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold">₹{totalSavings.toLocaleString('en-IN')}</div>
                                <div className="text-xs opacity-80">Potential Savings</div>
                            </div>
                        </div>

                        {/* Progress indicator */}
                        {completedTips.size > 0 && (
                            <div className="mt-4 pt-4 border-t border-white/20">
                                <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="w-4 h-4" />
                                    <span>{completedTips.size} action{completedTips.size > 1 ? 's' : ''} completed</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tips List */}
                <div className="p-6 space-y-4">
                    {activeTips.length === 0 ? (
                        <div className="text-center py-8">
                            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                            <h4 className="text-title-3 font-bold text-ios-black mb-2">All Caught Up!</h4>
                            <p className="text-body text-ios-gray-600">
                                You've completed all optimization recommendations. Check back later for new tips!
                            </p>
                        </div>
                    ) : (
                        displayedTips.map((tip) => {
                            const Icon = getCategoryIcon(tip.category);
                            const PriorityIcon = getPriorityIcon(tip.priority);
                            const isProcessing = processingTip === tip.id;

                            return (
                                <div
                                    key={tip.id}
                                    className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 ${isProcessing
                                            ? 'bg-violet-50 border-2 border-violet-300 scale-[0.98]'
                                            : 'bg-ios-gray-50 hover:bg-ios-gray-100 hover:shadow-md'
                                        }`}
                                >
                                    <div className="w-10 h-10 bg-gradient-to-br from-violet-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-5 h-5 text-violet-600" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-body font-semibold text-ios-black">{tip.title}</h4>
                                                {tip.priority === 'high' && (
                                                    <PriorityIcon className="w-4 h-4 text-red-500" />
                                                )}
                                            </div>
                                            <Badge variant={getPriorityColor(tip.priority) as any} className="flex-shrink-0">
                                                {tip.priority}
                                            </Badge>
                                        </div>
                                        <p className="text-footnote text-ios-gray-600 mb-3">{tip.description}</p>

                                        <div className="flex items-center justify-between gap-2">
                                            {tip.potentialSavings && (
                                                <div className="flex items-center gap-1">
                                                    <span className="text-sm font-semibold text-emerald-600">
                                                        Save ₹{tip.potentialSavings.toLocaleString('en-IN')}
                                                    </span>
                                                    {tip.priority === 'high' && (
                                                        <span className="text-xs text-red-600 font-medium">(Urgent)</span>
                                                    )}
                                                </div>
                                            )}
                                            <Button
                                                size="sm"
                                                variant="primary"
                                                onClick={() => handleAction(tip)}
                                                className="ml-auto"
                                                disabled={isProcessing}
                                            >
                                                {isProcessing ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        {tip.action}
                                                        <ArrowRight className="w-3 h-3 ml-1" />
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* View All/View Less Button */}
                {activeTips.length > 3 && (
                    <div className="px-6 pb-6">
                        <Button
                            variant="ghost"
                            className="w-full"
                            onClick={() => setShowAllTips(!showAllTips)}
                        >
                            {showAllTips ? (
                                <>View Less</>
                            ) : (
                                <>
                                    View All {activeTips.length} Recommendations
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </Button>
                    </div>
                )}
            </Card>

            {/* Action Confirmation Modal */}
            {showModal && selectedTip && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in"
                    onClick={cancelAction}
                >
                    <div
                        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-scale-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-title-2 font-bold text-ios-black">Confirm Action</h3>
                            <button
                                onClick={cancelAction}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-ios-gray-100 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="mb-6">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    {(() => {
                                        const Icon = getCategoryIcon(selectedTip.category);
                                        return <Icon className="w-6 h-6 text-violet-600" />;
                                    })()}
                                </div>
                                <div>
                                    <h4 className="text-subhead font-bold text-ios-black mb-1">{selectedTip.title}</h4>
                                    <Badge variant={getPriorityColor(selectedTip.priority) as any}>
                                        {selectedTip.priority} priority
                                    </Badge>
                                </div>
                            </div>

                            <p className="text-body text-ios-gray-700 mb-4">{selectedTip.description}</p>

                            {selectedTip.potentialSavings && (
                                <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4">
                                    <p className="text-caption text-emerald-700 mb-1">Potential Savings</p>
                                    <p className="text-title-2 font-bold text-emerald-600">
                                        ₹{selectedTip.potentialSavings.toLocaleString('en-IN')}
                                    </p>
                                    <p className="text-footnote text-emerald-600 mt-1">
                                        This action will help you maximize your rewards value
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <Button variant="secondary" className="flex-1" onClick={cancelAction}>
                                Cancel
                            </Button>
                            <Button variant="primary" className="flex-1" onClick={confirmAction}>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                {selectedTip.action}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add animation styles */}
            <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
        </>
    );
};

export default AIOptimizer;

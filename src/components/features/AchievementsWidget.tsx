import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Achievement } from '../../data/uniqueFeatures';
import { Trophy, Lock, CheckCircle, Star, Sparkles, Award, X } from 'lucide-react';

interface AchievementsWidgetProps {
    achievements: Achievement[];
}

/**
 * Gamification achievements widget - Fully functional end-to-end
 */
const AchievementsWidget: React.FC<AchievementsWidgetProps> = ({ achievements: initialAchievements }) => {
    const achievements = initialAchievements;
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [claimedAchievements, setClaimedAchievements] = useState<Set<string>>(new Set());
    const [showCelebration, setShowCelebration] = useState(false);
    const [celebrationReward, setCelebrationReward] = useState(0);

    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const totalRewards = achievements
        .filter(a => a.unlocked && claimedAchievements.has(a.id))
        .reduce((sum, a) => sum + a.reward, 0);

    const unclaimedRewards = achievements
        .filter(a => a.unlocked && !claimedAchievements.has(a.id))
        .reduce((sum, a) => sum + a.reward, 0);

    const handleAchievementClick = (achievement: Achievement) => {
        setSelectedAchievement(achievement);
        setShowModal(true);
    };

    const handleClaimReward = (achievement: Achievement) => {
        if (!achievement.unlocked || claimedAchievements.has(achievement.id)) {
            return;
        }

        // Add to claimed
        setClaimedAchievements(prev => new Set([...prev, achievement.id]));

        // Show celebration
        setCelebrationReward(achievement.reward);
        setShowCelebration(true);
        setShowModal(false);

        // Hide celebration after animation
        setTimeout(() => {
            setShowCelebration(false);
        }, 3000);
    };

    const handleClaimAll = () => {
        const unclaimedUnlocked = achievements.filter(
            a => a.unlocked && !claimedAchievements.has(a.id)
        );

        if (unclaimedUnlocked.length === 0) return;

        const totalReward = unclaimedUnlocked.reduce((sum, a) => sum + a.reward, 0);

        // Claim all
        setClaimedAchievements(prev => {
            const newSet = new Set(prev);
            unclaimedUnlocked.forEach(a => newSet.add(a.id));
            return newSet;
        });

        // Show celebration
        setCelebrationReward(totalReward);
        setShowCelebration(true);

        setTimeout(() => {
            setShowCelebration(false);
        }, 3000);
    };

    const getProgressColor = (achievement: Achievement) => {
        const percentage = (achievement.progress / achievement.maxProgress) * 100;
        if (achievement.unlocked) return 'from-amber-500 to-orange-600';
        if (percentage >= 75) return 'from-emerald-500 to-teal-600';
        if (percentage >= 50) return 'from-blue-500 to-indigo-600';
        if (percentage >= 25) return 'from-violet-500 to-purple-600';
        return 'from-ios-gray-400 to-ios-gray-500';
    };

    return (
        <>
            <Card variant="elevated">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                                <Trophy className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-title-3 font-bold text-ios-black">Achievements</h3>
                                <p className="text-footnote text-ios-gray-600">
                                    {unlockedCount}/{achievements.length} unlocked
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-caption text-ios-gray-600">Total Earned</p>
                            <p className="text-title-3 font-bold text-amber-600">
                                {totalRewards.toLocaleString('en-IN')} pts
                            </p>
                        </div>
                    </div>

                    {/* Claim All Button */}
                    {unclaimedRewards > 0 && (
                        <div className="mb-6 p-1 bg-gradient-to-r from-amber-200 to-orange-200 rounded-2xl animate-pulse-slow font-inter">
                            <div className="bg-white rounded-xl p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center animate-bounce-slight">
                                        <Award className="w-6 h-6 text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="text-body font-bold text-ios-black">Unclaimed Rewards</p>
                                        <p className="text-footnote text-ios-gray-600">
                                            You have <span className="font-bold text-amber-600">+{unclaimedRewards.toLocaleString('en-IN')} points</span> waiting to be claimed!
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={handleClaimAll}
                                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-orange-200 transform hover:scale-105 transition-all duration-200"
                                >
                                    <Sparkles className="w-5 h-5 mr-2 animate-spin-slow" />
                                    Claim All Rewards
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Achievements List */}
                    <div className="space-y-3">
                        {achievements.map((achievement) => {
                            const isClaimed = claimedAchievements.has(achievement.id);
                            const canClaim = achievement.unlocked && !isClaimed;
                            const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;

                            return (
                                <div
                                    key={achievement.id}
                                    onClick={() => handleAchievementClick(achievement)}
                                    className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${achievement.unlocked
                                        ? canClaim
                                            ? 'border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 hover:border-amber-400 hover:shadow-lg'
                                            : 'border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50'
                                        : 'border-ios-gray-200 bg-ios-gray-50 hover:border-ios-gray-300'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        {/* Icon */}
                                        <div className={`text-3xl flex-shrink-0 transition-all duration-300 ${achievement.unlocked
                                            ? 'scale-100'
                                            : 'grayscale opacity-40'
                                            }`}>
                                            {achievement.unlocked ? (
                                                <div className="relative">
                                                    {achievement.icon}
                                                    {canClaim && (
                                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
                                                    )}
                                                </div>
                                            ) : (
                                                <Lock className="w-8 h-8 text-ios-gray-400" />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h4 className={`text-body font-bold ${achievement.unlocked ? 'text-ios-black' : 'text-ios-gray-500'
                                                            }`}>
                                                            {achievement.title}
                                                        </h4>
                                                        {achievement.unlocked && (
                                                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                                                        )}
                                                    </div>
                                                    <p className="text-footnote text-ios-gray-600">{achievement.description}</p>
                                                </div>

                                                {/* Reward Badge */}
                                                <div className={`text-sm font-semibold px-3 py-1 rounded-lg flex-shrink-0 ${canClaim
                                                    ? 'bg-amber-500 text-white animate-pulse'
                                                    : isClaimed
                                                        ? 'bg-emerald-100 text-emerald-700'
                                                        : achievement.unlocked
                                                            ? 'bg-amber-100 text-amber-700'
                                                            : 'bg-ios-gray-200 text-ios-gray-600'
                                                    }`}>
                                                    {canClaim ? (
                                                        <span className="flex items-center gap-1">
                                                            <Sparkles className="w-3 h-3" />
                                                            Claim
                                                        </span>
                                                    ) : isClaimed ? (
                                                        '✓ Claimed'
                                                    ) : (
                                                        `+${achievement.reward} pts`
                                                    )}
                                                </div>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="mt-3">
                                                <div className="flex items-center justify-between text-caption text-ios-gray-600 mb-1">
                                                    <span>Progress</span>
                                                    <span>
                                                        {achievement.progress.toLocaleString('en-IN')} / {achievement.maxProgress.toLocaleString('en-IN')}
                                                    </span>
                                                </div>
                                                <div className="h-2 bg-ios-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full transition-all duration-500 bg-gradient-to-r ${getProgressColor(achievement)}`}
                                                        style={{ width: `${progressPercentage}%` }}
                                                    />
                                                </div>
                                                {achievement.unlocked && achievement.unlockedAt && (
                                                    <p className="text-caption text-ios-gray-500 mt-1">
                                                        Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Card>

            {/* Achievement Detail Modal */}
            {showModal && selectedAchievement && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-title-2 font-bold text-ios-black">Achievement Details</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-ios-gray-100"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Achievement Display */}
                        <div className="text-center mb-6">
                            <div className={`text-6xl mb-4 inline-block ${selectedAchievement.unlocked ? 'scale-100' : 'grayscale opacity-40'
                                }`}>
                                {selectedAchievement.unlocked ? (
                                    selectedAchievement.icon
                                ) : (
                                    <Lock className="w-16 h-16 text-ios-gray-400 mx-auto" />
                                )}
                            </div>
                            <h4 className="text-title-2 font-bold text-ios-black mb-2">
                                {selectedAchievement.title}
                            </h4>
                            <p className="text-body text-ios-gray-600 mb-4">
                                {selectedAchievement.description}
                            </p>

                            {/* Progress */}
                            <div className="bg-ios-gray-50 rounded-xl p-4 mb-4">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-ios-gray-600">Progress</span>
                                    <span className="font-semibold text-ios-black">
                                        {selectedAchievement.progress.toLocaleString('en-IN')} / {selectedAchievement.maxProgress.toLocaleString('en-IN')}
                                    </span>
                                </div>
                                <div className="h-3 bg-ios-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-500 bg-gradient-to-r ${getProgressColor(selectedAchievement)}`}
                                        style={{ width: `${(selectedAchievement.progress / selectedAchievement.maxProgress) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Reward */}
                            <div className={`p-4 rounded-xl border-2 ${selectedAchievement.unlocked && !claimedAchievements.has(selectedAchievement.id)
                                ? 'bg-amber-50 border-amber-200'
                                : selectedAchievement.unlocked
                                    ? 'bg-emerald-50 border-emerald-200'
                                    : 'bg-ios-gray-50 border-ios-gray-200'
                                }`}>
                                <p className="text-caption text-ios-gray-600 mb-1">Reward</p>
                                <p className="text-title-2 font-bold text-amber-600">
                                    +{selectedAchievement.reward.toLocaleString('en-IN')} points
                                </p>
                            </div>
                        </div>

                        {/* Action Button */}
                        {selectedAchievement.unlocked && !claimedAchievements.has(selectedAchievement.id) ? (
                            <Button
                                variant="primary"
                                className="w-full"
                                onClick={() => handleClaimReward(selectedAchievement)}
                            >
                                <Award className="w-5 h-5 mr-2" />
                                Claim {selectedAchievement.reward.toLocaleString('en-IN')} Points
                            </Button>
                        ) : claimedAchievements.has(selectedAchievement.id) ? (
                            <div className="w-full py-3 bg-emerald-100 text-emerald-700 rounded-xl font-semibold text-center flex items-center justify-center gap-2">
                                <CheckCircle className="w-5 h-5" />
                                Reward Claimed
                            </div>
                        ) : (
                            <div className="w-full py-3 bg-ios-gray-100 text-ios-gray-600 rounded-xl font-semibold text-center">
                                🔒 Complete to unlock
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Celebration Animation */}
            {showCelebration && (
                <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                    <div className="animate-celebration">
                        <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-6 rounded-2xl shadow-2xl">
                            <div className="flex items-center gap-3">
                                <Trophy className="w-12 h-12" />
                                <div>
                                    <p className="text-lg font-bold">Reward Claimed!</p>
                                    <p className="text-2xl font-bold">+{celebrationReward.toLocaleString('en-IN')} points</p>
                                </div>
                            </div>
                            {/* Confetti effect */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                {[...Array(10)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="absolute text-yellow-300 animate-confetti"
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: '-10px',
                                            animationDelay: `${Math.random() * 0.5}s`,
                                            animationDuration: `${1 + Math.random()}s`
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Animations */}
            <style>{`
        @keyframes celebration {
          0% { transform: scale(0.8) translateY(20px); opacity: 0; }
          50% { transform: scale(1.1) translateY(0); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(500px) rotate(720deg); opacity: 0; }
        }
        .animate-celebration {
          animation: celebration 0.5s ease-out;
        }
        .animate-confetti {
          animation: confetti 1.5s ease-out forwards;
        }
      `}</style>
        </>
    );
};

export default AchievementsWidget;

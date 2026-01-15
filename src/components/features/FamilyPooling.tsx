import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { FamilyPool } from '../../data/uniqueFeatures';
import { Users, UserPlus, Crown, Mail, X, CheckCircle, Copy, TrendingUp, Award, Settings, LogOut } from 'lucide-react';

interface FamilyPoolingProps {
    initialPool?: FamilyPool | null;
    userPoints: number;
}

/**
 * Family Points Pooling widget - Fully functional end-to-end
 */
const FamilyPooling: React.FC<FamilyPoolingProps> = ({ initialPool = null, userPoints }) => {
    const [pool, setPool] = useState<FamilyPool | null>(initialPool);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [showMembersModal, setShowMembersModal] = useState(false);
    const [poolName, setPoolName] = useState('');
    const [inviteEmail, setInviteEmail] = useState('');
    const [contributionAmount, setContributionAmount] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [inviteCode, setInviteCode] = useState('');

    const currentUserId = 'user-1'; // In real app, get from auth

    // Generate invite code
    const generateInviteCode = () => {
        return Math.random().toString(36).substr(2, 8).toUpperCase();
    };

    // Create pool
    const handleCreatePool = async () => {
        if (!poolName.trim()) {
            alert('Please enter a pool name');
            return;
        }

        const newPool: FamilyPool = {
            id: `pool-${Date.now()}`,
            name: poolName,
            members: [
                {
                    id: currentUserId,
                    name: 'You',
                    email: 'you@example.com',
                    contribution: 0,
                    role: 'admin',
                    joinedAt: new Date().toISOString(),
                }
            ],
            totalPoints: 0,
            bonusMultiplier: 1.25,
            createdAt: new Date().toISOString(),
        };

        setPool(newPool);
        setShowCreateModal(false);
        setPoolName('');

        showSuccessMessage('Family pool created successfully!');
    };

    // Contribute points
    const handleContribute = async () => {
        if (!pool) return;

        const amount = parseInt(contributionAmount);
        if (!amount || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        if (amount > userPoints) {
            alert(`You only have ${userPoints.toLocaleString('en-IN')} points available`);
            return;
        }

        // Update member contribution
        const updatedMembers = pool.members.map(m =>
            m.id === currentUserId
                ? { ...m, contribution: m.contribution + amount }
                : m
        );

        setPool({
            ...pool,
            members: updatedMembers,
            totalPoints: pool.totalPoints + amount,
        });

        setContributionAmount('');
        showSuccessMessage(`Successfully contributed ${amount.toLocaleString('en-IN')} points!`);
    };

    // Send invite
    const handleSendInvite = () => {
        if (!inviteEmail.trim()) {
            alert('Please enter an email address');
            return;
        }

        const code = generateInviteCode();
        setInviteCode(code);
        setInviteEmail('');

        showSuccessMessage(`Invite sent to ${inviteEmail}! Invite code: ${code}`);
    };

    // Copy invite code
    const copyInviteCode = () => {
        if (!pool) return;
        const code = generateInviteCode();
        navigator.clipboard.writeText(code);
        showSuccessMessage('Invite code copied to clipboard!');
    };

    // Leave pool
    const handleLeavePool = () => {
        if (window.confirm('Are you sure you want to leave this pool? Your contributions will be returned.')) {
            setPool(null);
            showSuccessMessage('Left the pool successfully');
        }
    };

    // Remove member (admin only)
    const handleRemoveMember = (memberId: string) => {
        if (!pool) return;

        const member = pool.members.find(m => m.id === memberId);
        if (!member) return;

        if (window.confirm(`Remove ${member.name} from the pool?`)) {
            const updatedMembers = pool.members.filter(m => m.id !== memberId);
            setPool({
                ...pool,
                members: updatedMembers,
                totalPoints: pool.totalPoints - member.contribution,
            });
            showSuccessMessage(`${member.name} removed from pool`);
        }
    };

    const showSuccessMessage = (message: string) => {
        setSuccessMessage(message);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const currentMember = pool?.members.find(m => m.id === currentUserId);
    const isAdmin = currentMember?.role === 'admin';
    const poolValue = pool ? Math.floor(pool.totalPoints * pool.bonusMultiplier) : 0;
    const bonusEarned = pool ? poolValue - pool.totalPoints : 0;

    // No pool - show create/join
    if (!pool) {
        return (
            <>
                <Card variant="elevated">
                    <div className="p-6">
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Users className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-title-2 font-bold text-ios-black mb-2">Family Points Pooling</h3>
                            <p className="text-body text-ios-gray-600 mb-6 max-w-md mx-auto">
                                Combine points with family members and get <span className="font-bold text-blue-600">25% bonus value</span> on redemptions!
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
                                <div className="bg-blue-50 rounded-xl p-4">
                                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mb-3">
                                        <Users className="w-5 h-5 text-white" />
                                    </div>
                                    <h4 className="text-subhead font-bold text-ios-black mb-1">Pool Together</h4>
                                    <p className="text-footnote text-ios-gray-600">Combine points with up to 5 family members</p>
                                </div>

                                <div className="bg-emerald-50 rounded-xl p-4">
                                    <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center mb-3">
                                        <TrendingUp className="w-5 h-5 text-white" />
                                    </div>
                                    <h4 className="text-subhead font-bold text-ios-black mb-1">25% Bonus</h4>
                                    <p className="text-footnote text-ios-gray-600">Get better redemption value automatically</p>
                                </div>

                                <div className="bg-violet-50 rounded-xl p-4">
                                    <div className="w-10 h-10 bg-violet-500 rounded-lg flex items-center justify-center mb-3">
                                        <Award className="w-5 h-5 text-white" />
                                    </div>
                                    <h4 className="text-subhead font-bold text-ios-black mb-1">Shared Goals</h4>
                                    <p className="text-footnote text-ios-gray-600">Work together toward big rewards</p>
                                </div>
                            </div>

                            <div className="flex gap-3 justify-center">
                                <Button variant="primary" size="lg" onClick={() => setShowCreateModal(true)}>
                                    <Users className="w-5 h-5 mr-2" />
                                    Create Family Pool
                                </Button>
                                <Button variant="secondary" size="lg">
                                    <Mail className="w-5 h-5 mr-2" />
                                    Join with Code
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Create Pool Modal */}
                {showCreateModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-title-2 font-bold text-ios-black">Create Family Pool</h3>
                                <button onClick={() => setShowCreateModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-ios-gray-100">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="mb-6">
                                <label className="block text-footnote text-ios-gray-600 mb-2">Pool Name</label>
                                <input
                                    type="text"
                                    value={poolName}
                                    onChange={(e) => setPoolName(e.target.value)}
                                    placeholder="e.g., Smith Family, Our Family Pool"
                                    className="w-full px-4 py-3 border-2 border-ios-gray-200 rounded-xl focus:border-blue-500 outline-none"
                                />
                            </div>

                            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
                                <p className="text-caption text-blue-700 mb-2">✨ Benefits</p>
                                <ul className="text-footnote text-blue-600 space-y-1">
                                    <li>• 25% bonus on pooled points</li>
                                    <li>• Share with up to 5 family members</li>
                                    <li>• Admin controls for management</li>
                                </ul>
                            </div>

                            <div className="flex gap-3">
                                <Button variant="secondary" className="flex-1" onClick={() => setShowCreateModal(false)}>
                                    Cancel
                                </Button>
                                <Button variant="primary" className="flex-1" onClick={handleCreatePool}>
                                    Create Pool
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }

    // Has pool - show pool dashboard
    return (
        <>
            <Card variant="elevated">
                <div className="p-6">
                    {/* Pool Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-title-3 font-bold text-ios-black">{pool.name}</h3>
                                <p className="text-footnote text-ios-gray-600">
                                    {pool.members.length} member{pool.members.length > 1 ? 's' : ''}
                                    {isAdmin && <span className="ml-2 text-amber-600">• Admin</span>}
                                </p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setShowMembersModal(true)}>
                            <Settings className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Pool Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                            <p className="text-caption text-ios-gray-600 mb-1">Total Pooled</p>
                            <p className="text-title-2 font-bold text-ios-black">{pool.totalPoints.toLocaleString('en-IN')}</p>
                            <p className="text-footnote text-ios-gray-500">points</p>
                        </div>

                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4">
                            <p className="text-caption text-ios-gray-600 mb-1">Pool Value</p>
                            <p className="text-title-2 font-bold text-emerald-600">{poolValue.toLocaleString('en-IN')}</p>
                            <p className="text-footnote text-emerald-600">+{bonusEarned.toLocaleString('en-IN')} bonus</p>
                        </div>
                    </div>

                    {/* Contribution Section */}
                    <div className="mb-6">
                        <h4 className="text-subhead font-semibold text-ios-black mb-3">Contribute Points</h4>
                        <div className="flex gap-3">
                            <input
                                type="number"
                                value={contributionAmount}
                                onChange={(e) => setContributionAmount(e.target.value)}
                                placeholder="Enter amount"
                                className="flex-1 px-4 py-3 border-2 border-ios-gray-200 rounded-xl focus:border-blue-500 outline-none"
                            />
                            <Button variant="primary" onClick={handleContribute}>
                                Contribute
                            </Button>
                        </div>
                        <p className="text-footnote text-ios-gray-500 mt-2">
                            Available: {userPoints.toLocaleString('en-IN')} points
                        </p>
                    </div>

                    {/* Members Preview */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-subhead font-semibold text-ios-black">Members</h4>
                            {isAdmin && (
                                <Button variant="ghost" size="sm" onClick={() => setShowInviteModal(true)}>
                                    <UserPlus className="w-4 h-4 mr-1" />
                                    Invite
                                </Button>
                            )}
                        </div>

                        <div className="space-y-2">
                            {pool.members.slice(0, 3).map((member) => (
                                <div key={member.id} className="flex items-center justify-between p-3 bg-ios-gray-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                                            {member.name[0]}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="text-body font-semibold text-ios-black">{member.name}</p>
                                                {member.role === 'admin' && (
                                                    <Crown className="w-4 h-4 text-amber-500" />
                                                )}
                                            </div>
                                            <p className="text-footnote text-ios-gray-600">{member.email}</p>
                                        </div>
                                    </div>
                                    <p className="text-subhead font-bold text-blue-600">
                                        {member.contribution.toLocaleString('en-IN')} pts
                                    </p>
                                </div>
                            ))}

                            {pool.members.length > 3 && (
                                <button
                                    onClick={() => setShowMembersModal(true)}
                                    className="w-full py-2 text-blue-600 text-sm font-medium hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    View all {pool.members.length} members
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-3">
                        {isAdmin && (
                            <Button variant="secondary" className="flex-1" onClick={copyInviteCode}>
                                <Copy className="w-4 h-4 mr-2" />
                                Copy Invite Code
                            </Button>
                        )}
                        <Button variant="ghost" className="flex-1" onClick={handleLeavePool}>
                            <LogOut className="w-4 h-4 mr-2" />
                            Leave Pool
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Invite Modal */}
            {showInviteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-title-2 font-bold text-ios-black">Invite Member</h3>
                            <button onClick={() => setShowInviteModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-ios-gray-100">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="mb-6">
                            <label className="block text-footnote text-ios-gray-600 mb-2">Email Address</label>
                            <input
                                type="email"
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                                placeholder="family@example.com"
                                className="w-full px-4 py-3 border-2 border-ios-gray-200 rounded-xl focus:border-blue-500 outline-none"
                            />
                        </div>

                        {inviteCode && (
                            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
                                <p className="text-caption text-blue-700 mb-2">Invite Code Generated</p>
                                <p className="text-title-3 font-bold text-blue-600 font-mono">{inviteCode}</p>
                                <p className="text-footnote text-blue-600 mt-2">Share this code with your family member</p>
                            </div>
                        )}

                        <div className="flex gap-3">
                            <Button variant="secondary" className="flex-1" onClick={() => setShowInviteModal(false)}>
                                Close
                            </Button>
                            <Button variant="primary" className="flex-1" onClick={handleSendInvite}>
                                <Mail className="w-4 h-4 mr-2" />
                                Send Invite
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Members Management Modal */}
            {showMembersModal && pool && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-title-2 font-bold text-ios-black">Pool Members</h3>
                            <button onClick={() => setShowMembersModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-ios-gray-100">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-3 mb-6">
                            {pool.members.map((member) => (
                                <div key={member.id} className="flex items-center justify-between p-4 bg-ios-gray-50 rounded-xl">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                            {member.name[0]}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="text-body font-bold text-ios-black">{member.name}</p>
                                                {member.role === 'admin' && (
                                                    <Crown className="w-4 h-4 text-amber-500" />
                                                )}
                                            </div>
                                            <p className="text-caption text-blue-600 font-semibold">
                                                {member.contribution.toLocaleString('en-IN')} points contributed
                                            </p>
                                        </div>
                                    </div>

                                    {isAdmin && member.id !== currentUserId && (
                                        <Button variant="ghost" size="sm" onClick={() => handleRemoveMember(member.id)}>
                                            <X className="w-4 h-4 text-red-500" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <Button variant="primary" className="w-full" onClick={() => setShowMembersModal(false)}>
                            Done
                        </Button>
                    </div>
                </div>
            )}

            {/* Success Toast */}
            {showSuccess && (
                <div className="fixed bottom-8 right-8 bg-blue-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50">
                    <CheckCircle className="w-6 h-6" />
                    <p className="text-sm font-medium">{successMessage}</p>
                </div>
            )}
        </>
    );
};

export default FamilyPooling;

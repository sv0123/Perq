import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useMarketplace } from '../hooks/useMarketplace';
import { MarketplaceListing } from '../types';
import { formatCurrency, formatRelativeTime, cn } from '../lib/utils';
import { CheckCircle, Plus, X, Filter, DollarSign, CreditCard } from 'lucide-react';

import SuccessAnimation from '../components/ui/SuccessAnimation';

/**
 * P2P Marketplace page for trading reward points
 */
const Marketplace: React.FC = () => {
    const { listings, addListing } = useMarketplace();
    const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
    const [searchQuery, setSearchQuery] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(null);
    const [successData, setSuccessData] = useState<{ show: boolean, message: string, amount: number } | null>(null);

    const filteredListings = listings.filter((listing) => {
        const matchesTab = listing.listingType === activeTab;
        const matchesSearch =
            listing.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            listing.pointsType.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const handleTransactionComplete = () => {
        if (!selectedListing) return;

        setSuccessData({
            show: true,
            message: selectedListing.listingType === 'buy' ? 'Sale Successful!' : 'Purchase Successful!',
            amount: selectedListing.totalPrice
        });

        setSelectedListing(null);
    };

    return (
        <div className="min-h-screen bg-ios-gray-50 page-transition">
            {successData && (
                <SuccessAnimation
                    message={successData.message}
                    amount={successData.amount}
                    subMessage="Transaction completed successfully"
                    onComplete={() => setSuccessData(null)}
                />
            )}

            <div className="ios-container py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-large-title font-bold text-ios-black mb-2">Marketplace</h1>
                        <p className="text-body text-ios-gray-600">
                            Trade reward points securely with verified users
                        </p>
                    </div>
                    <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                        <Plus className="w-5 h-5 mr-2" />
                        Create Offer
                    </Button>
                </div>

                {/* Tabs & Search */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="inline-flex bg-ios-gray-100 rounded-xl p-1 self-start">
                        <button
                            onClick={() => setActiveTab('buy')}
                            className={cn(
                                'px-6 py-2.5 text-body font-medium rounded-lg transition-all duration-200 tap-feedback',
                                activeTab === 'buy'
                                    ? 'bg-white text-ios-black shadow-sm'
                                    : 'text-ios-gray-600 hover:text-ios-black'
                            )}
                        >
                            Buy Offers
                        </button>
                        <button
                            onClick={() => setActiveTab('sell')}
                            className={cn(
                                'px-6 py-2.5 text-body font-medium rounded-lg transition-all duration-200 tap-feedback',
                                activeTab === 'sell'
                                    ? 'bg-white text-ios-black shadow-sm'
                                    : 'text-ios-gray-600 hover:text-ios-black'
                            )}
                        >
                            Sell Offers
                        </button>
                    </div>

                    <div className="flex-1 relative">
                        <Input
                            type="text"
                            placeholder="Search by user or points type..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Listings Grid */}
                {filteredListings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredListings.map((listing) => (
                            <ListingCard
                                key={listing.id}
                                listing={listing}
                                onAction={() => setSelectedListing(listing)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-ios-gray-200 shadow-sm">
                        <div className="w-16 h-16 bg-ios-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Filter className="w-8 h-8 text-ios-gray-400" />
                        </div>
                        <h3 className="text-title-3 font-semibold text-ios-black mb-2">No offers found</h3>
                        <p className="text-body text-ios-gray-500 mb-6 max-w-md mx-auto">
                            No active {activeTab} offers match your criteria. Be the first to create one!
                        </p>
                        <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                            Create {activeTab === 'buy' ? 'Buy' : 'Sell'} Offer
                        </Button>
                    </div>
                )}

                {/* Modals */}
                {showCreateModal && (
                    <CreateOfferModal
                        isOpen={showCreateModal}
                        onClose={() => setShowCreateModal(false)}
                        onSubmit={addListing}
                        initialType={activeTab}
                    />
                )}

                {selectedListing && (
                    <TransactionModal
                        listing={selectedListing}
                        onClose={() => setSelectedListing(null)}
                        onConfirm={handleTransactionComplete}
                    />
                )}
            </div>
        </div>
    );
};

/* --- Sub-Components --- */

const ListingCard: React.FC<{
    listing: MarketplaceListing;
    onAction: () => void;
}> = ({ listing, onAction }) => {
    const isBuy = listing.listingType === 'buy';

    return (
        <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden border border-ios-gray-100">
            {/* Status Badge */}
            <div className={cn(
                "absolute top-0 right-0 px-3 py-1 text-xs font-bold rounded-bl-xl",
                isBuy ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
            )}>
                {isBuy ? 'WANT TO BUY' : 'SELLING'}
            </div>

            <div className="flex items-center gap-3 mb-5">
                <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-md",
                    isBuy ? "bg-gradient-to-br from-green-500 to-emerald-600" : "bg-gradient-to-br from-blue-500 to-indigo-600"
                )}>
                    {listing.userName.charAt(0)}
                </div>
                <div>
                    <div className="flex items-center gap-1.5">
                        <h3 className="text-body font-bold text-ios-black">{listing.userName}</h3>
                        {listing.userVerified && <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-50" />}
                    </div>
                    <p className="text-caption font-medium text-ios-gray-500 flex items-center gap-1">
                        ⭐ {listing.userRating.toFixed(1)} <span className="text-ios-gray-300">|</span> 12 deals
                    </p>
                </div>
            </div>

            <div className="bg-ios-gray-50 rounded-xl p-4 mb-5 border border-ios-gray-200/50">
                <div className="flex justify-between items-end mb-1">
                    <div>
                        <p className="text-caption uppercase tracking-wider font-semibold text-ios-gray-500 mb-1">Points</p>
                        <p className="text-title-3 font-bold text-ios-black">{listing.pointsType}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-title-3 font-bold text-ios-black">{listing.pointsAmount.toLocaleString()}</p>
                    </div>
                </div>
                <div className="w-full h-px bg-ios-gray-200 my-3"></div>
                <div className="flex justify-between items-center">
                    <span className="text-caption font-medium text-ios-gray-500">Rate: ₹{listing.pricePerPoint.toFixed(2)}/pt</span>
                    <span className="text-subhead font-bold text-green-600">{formatCurrency(listing.totalPrice)}</span>
                </div>
            </div>

            <p className="text-footnote text-ios-gray-600 mb-5 line-clamp-2 min-h-[2.5em]">
                {listing.description || "No description provided."}
            </p>

            <button
                onClick={onAction}
                className={cn(
                    "w-full py-3 rounded-xl font-bold text-white transition-all duration-200 shadow-md active:scale-95 flex items-center justify-center gap-2",
                    isBuy
                        ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
                )}
            >
                {isBuy ? <DollarSign className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
                {isBuy ? 'Sell to Buyer' : 'Buy Points'}
            </button>

            <div className="mt-3 text-center">
                <span className="text-caption text-ios-gray-400 font-medium">
                    Posted {formatRelativeTime(listing.createdAt)}
                </span>
            </div>
        </Card>
    );
};

/* --- Create Offer Modal --- */

interface CreateOfferProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (listing: Omit<MarketplaceListing, 'id' | 'userId' | 'createdAt' | 'userName' | 'userVerified' | 'userRating'>) => void;
    initialType: 'buy' | 'sell';
}

const CreateOfferModal: React.FC<CreateOfferProps> = ({ onClose, onSubmit, initialType }) => {
    const [type, setType] = useState<'buy' | 'sell'>(initialType);
    const [formData, setFormData] = useState({
        pointsType: '',
        pointsAmount: '',
        pricePerPoint: '',
        description: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const amount = parseInt(formData.pointsAmount);
        const rate = parseFloat(formData.pricePerPoint);

        if (!amount || !rate || !formData.pointsType) return;

        onSubmit({
            listingType: type,
            pointsType: formData.pointsType,
            pointsAmount: amount,
            pricePerPoint: rate,
            totalPrice: amount * rate,
            description: formData.description
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="bg-ios-gray-50 px-6 py-4 flex items-center justify-between border-b border-ios-gray-100">
                    <h2 className="text-title-3 font-bold text-ios-black">Create New Offer</h2>
                    <button onClick={onClose} className="p-2 hover:bg-ios-gray-200 rounded-full transition-colors">
                        <X className="w-5 h-5 text-ios-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="flex bg-ios-gray-100 p-1 rounded-xl mb-6">
                        <button
                            type="button"
                            onClick={() => setType('buy')}
                            className={cn("flex-1 py-2 rounded-lg text-sm font-semibold transition-all", type === 'buy' ? "bg-white shadow-sm text-green-700" : "text-ios-gray-500")}
                        >
                            I Want to Buy
                        </button>
                        <button
                            type="button"
                            onClick={() => setType('sell')}
                            className={cn("flex-1 py-2 rounded-lg text-sm font-semibold transition-all", type === 'sell' ? "bg-white shadow-sm text-blue-700" : "text-ios-gray-500")}
                        >
                            I Want to Sell
                        </button>
                    </div>

                    <Input
                        label="Points Type"
                        placeholder="e.g. HDFC, Amex, Miles"
                        value={formData.pointsType}
                        onChange={e => setFormData({ ...formData, pointsType: e.target.value })}
                        required
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Amount"
                            type="number"
                            placeholder="5000"
                            value={formData.pointsAmount}
                            onChange={e => setFormData({ ...formData, pointsAmount: e.target.value })}
                            required
                        />
                        <Input
                            label="Rate (₹/pt)"
                            type="number"
                            step="0.01"
                            placeholder="0.45"
                            value={formData.pricePerPoint}
                            onChange={e => setFormData({ ...formData, pricePerPoint: e.target.value })}
                            required
                        />
                    </div>

                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <div className="flex justify-between items-center text-blue-900">
                            <span className="font-medium">Total Value</span>
                            <span className="text-xl font-bold">
                                {formatCurrency((parseInt(formData.pointsAmount) || 0) * (parseFloat(formData.pricePerPoint) || 0))}
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-ios-gray-700 mb-1">Description (Optional)</label>
                        <textarea
                            className="w-full h-24 p-3 bg-ios-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 resize-none text-body"
                            placeholder="Add details about expiry or transfer method..."
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full py-3.5 bg-ios-black text-white font-bold rounded-xl hover:shadow-lg active:scale-95 transition-all"
                        >
                            Post Offer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

/* --- Transaction Modal --- */

const TransactionModal: React.FC<{
    listing: MarketplaceListing;
    onClose: () => void;
    onConfirm: () => void;
}> = ({ listing, onClose, onConfirm }) => {
    const isBuy = listing.listingType === 'buy';

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="p-6 text-center">
                    <div className={cn(
                        "w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4",
                        isBuy ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                    )}>
                        {isBuy ? <DollarSign className="w-10 h-10" /> : <CreditCard className="w-10 h-10" />}
                    </div>

                    <h2 className="text-title-2 font-bold text-ios-black mb-2">
                        {isBuy ? 'Confirm Sale' : 'Purchase Points'}
                    </h2>
                    <p className="text-body text-ios-gray-600 mb-6">
                        You are about to {isBuy ? 'sell' : 'buy'} <span className="font-bold text-ios-black">{listing.pointsAmount.toLocaleString()} {listing.pointsType}</span> points from {listing.userName}.
                    </p>

                    <div className="bg-ios-gray-50 rounded-xl p-4 mb-6 text-left">
                        <div className="flex justify-between mb-2">
                            <span className="text-ios-gray-500">Price per point</span>
                            <span className="font-medium">₹{listing.pricePerPoint.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-ios-gray-500">Service Fee</span>
                            <span className="font-medium">₹0.00</span>
                        </div>
                        <div className="h-px bg-ios-gray-200 my-2"></div>
                        <div className="flex justify-between text-lg font-bold text-ios-black">
                            <span>Total</span>
                            <span>{formatCurrency(listing.totalPrice)}</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={onConfirm}
                            className="w-full py-3.5 bg-ios-black text-white font-bold rounded-xl hover:shadow-lg active:scale-95 transition-all"
                        >
                            Confirm {isBuy ? 'Sale' : 'Purchase'}
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full py-3.5 text-ios-gray-600 font-semibold rounded-xl hover:bg-ios-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Marketplace;

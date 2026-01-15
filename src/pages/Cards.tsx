import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import CreditCardDisplay from '../components/dashboard/CreditCardDisplay';
import { useCardManagement } from '../hooks/useCardManagement';
import { CreditCard } from '../types';
import { Plus, X, Filter } from 'lucide-react';
import { validateCardNumber } from '../lib/utils';

/**
 * Cards management page with CRUD operations
 */
const Cards: React.FC = () => {
    const { cards, addCard, updateCard, deleteCard } = useCardManagement();
    const [showModal, setShowModal] = useState(false);
    const [editingCard, setEditingCard] = useState<CreditCard | null>(null);
    const [filterType, setFilterType] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter cards
    const filteredCards = cards.filter((card) => {
        const matchesSearch =
            card.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.cardType.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.cardholderName.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter = filterType === 'all' || card.cardType === filterType;

        return matchesSearch && matchesFilter;
    });

    // Get unique card types for filter
    const cardTypes = Array.from(new Set(cards.map((card) => card.cardType)));

    const handleSaveCard = (cardData: Omit<CreditCard, 'id'>) => {
        if (editingCard) {
            updateCard(editingCard.id, cardData);
        } else {
            addCard(cardData);
        }
        setShowModal(false);
        setEditingCard(null);
    };

    const handleEditClick = (card: CreditCard) => {
        setEditingCard(card);
        setShowModal(true);
    };

    const handleAddClick = () => {
        setEditingCard(null);
        setShowModal(true);
    };

    return (
        <div className="min-h-screen bg-ios-gray-50 page-transition">
            <div className="ios-container py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-large-title font-bold text-ios-black mb-2">Credit Cards</h1>
                        <p className="text-body text-ios-gray-600">
                            Manage your {cards.length} credit card{cards.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                    <Button variant="primary" onClick={handleAddClick}>
                        <Plus className="w-5 h-5 mr-2" />
                        Add Card
                    </Button>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <Input
                            type="text"
                            placeholder="Search by bank, type, or cardholder..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-ios-gray-500" />
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="ios-input min-w-[150px]"
                        >
                            <option value="all">All Types</option>
                            {cardTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Cards Grid */}
                {filteredCards.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCards.map((card) => (
                            <div key={card.id} className="relative group">
                                <div className="mb-4 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                                    <CreditCardDisplay card={card} />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleEditClick(card);
                                        }}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border-2 border-ios-gray-200 hover:border-ios-gray-400 text-ios-gray-700 hover:text-ios-black font-medium rounded-lg transition-all duration-200 hover:shadow-md group-hover:border-ios-gray-300"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        <span>Edit</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            const confirmed = window.confirm(`Delete ${card.bankName} ${card.cardType}?\n\nThis action cannot be undone.`);
                                            if (confirmed) {
                                                deleteCard(card.id);
                                            }
                                        }}
                                        className="px-4 py-2.5 bg-white border-2 border-ios-gray-200 hover:border-red-300 hover:bg-red-50 text-ios-gray-600 hover:text-red-600 font-medium rounded-lg transition-all duration-200 hover:shadow-md"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-ios-white rounded-ios-lg border border-ios-gray-200">
                        <p className="text-body text-ios-gray-500 mb-4">
                            {searchQuery || filterType !== 'all'
                                ? 'No cards found matching your criteria.'
                                : 'No credit cards added yet.'}
                        </p>
                        {!searchQuery && filterType === 'all' && (
                            <Button variant="primary" onClick={handleAddClick}>
                                <Plus className="w-5 h-5 mr-2" />
                                Add Your First Card
                            </Button>
                        )}
                    </div>
                )}

                {/* Card Modal (Add/Edit) */}
                {showModal && (
                    <CardModal
                        onClose={() => {
                            setShowModal(false);
                            setEditingCard(null);
                        }}
                        onSave={handleSaveCard}
                        initialData={editingCard}
                    />
                )}
            </div>
        </div>
    );
};

/* Card Modal Component (Reusable for Add & Edit) */
interface CardModalProps {
    onClose: () => void;
    onSave: (card: Omit<CreditCard, 'id'>) => void;
    initialData?: CreditCard | null;
}

const CardModal: React.FC<CardModalProps> = ({ onClose, onSave, initialData }) => {
    const isEditing = !!initialData;

    const [formData, setFormData] = useState({
        bankName: initialData?.bankName || '',
        cardType: initialData?.cardType || '',
        cardholderName: initialData?.cardholderName || '',
        cardNumber: initialData?.cardNumber || '',
        expiryDate: initialData?.expiryDate || '',
        cvv: initialData?.cvv || '',
        rewardPoints: initialData?.rewardPoints?.toString() || '',
        color: initialData?.color || '#1a237e',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        const newErrors: Record<string, string> = {};

        if (!formData.bankName) newErrors.bankName = 'Bank name is required';
        if (!formData.cardType) newErrors.cardType = 'Card type is required';
        if (!formData.cardholderName) newErrors.cardholderName = 'Cardholder name is required';
        if (!validateCardNumber(formData.cardNumber)) {
            newErrors.cardNumber = 'Invalid card number';
        }
        if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
            newErrors.expiryDate = 'Use MM/YY format';
        }
        if (!/^\d{3,4}$/.test(formData.cvv)) {
            newErrors.cvv = 'Invalid CVV';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const points = parseInt(formData.rewardPoints) || 0;
            onSave({
                ...formData,
                rewardPoints: points,
                pointsValue: points / 4, // Assuming 4 points = 1 INR
            });
        }
    };

    return (
        <div
            className="fixed inset-0 bg-ios-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
            onClick={onClose}
        >
            <Card
                className="w-full max-w-md max-h-[90vh] overflow-y-auto"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-title-2 font-bold text-ios-black">
                        {isEditing ? 'Edit Credit Card' : 'Add Credit Card'}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-ios-sm hover:bg-ios-gray-100 tap-feedback transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Bank Name"
                        value={formData.bankName}
                        onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                        error={errors.bankName}
                        placeholder="e.g., HDFC Bank"
                    />

                    <Input
                        label="Card Type"
                        value={formData.cardType}
                        onChange={(e) => setFormData({ ...formData, cardType: e.target.value })}
                        error={errors.cardType}
                        placeholder="e.g., Regalia, Sapphiro"
                    />

                    <Input
                        label="Cardholder Name"
                        value={formData.cardholderName}
                        onChange={(e) =>
                            setFormData({ ...formData, cardholderName: e.target.value.toUpperCase() })
                        }
                        error={errors.cardholderName}
                        placeholder="AS ON CARD"
                    />

                    <Input
                        label="Card Number"
                        value={formData.cardNumber}
                        onChange={(e) =>
                            setFormData({ ...formData, cardNumber: e.target.value.replace(/\s/g, '') })
                        }
                        error={errors.cardNumber}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Expiry Date"
                            value={formData.expiryDate}
                            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                            error={errors.expiryDate}
                            placeholder="MM/YY"
                            maxLength={5}
                        />

                        <Input
                            label="CVV"
                            type="password"
                            value={formData.cvv}
                            onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                            error={errors.cvv}
                            placeholder="123"
                            maxLength={4}
                        />
                    </div>

                    <Input
                        label="Reward Points (Optional)"
                        type="number"
                        value={formData.rewardPoints}
                        onChange={(e) => setFormData({ ...formData, rewardPoints: e.target.value })}
                        placeholder="0"
                    />

                    <div>
                        <label className="block text-subhead font-medium text-ios-gray-700 mb-2">
                            Card Color
                        </label>
                        <input
                            type="color"
                            value={formData.color}
                            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                            className="w-full h-12 rounded-ios cursor-pointer"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-ios-gray-100 hover:bg-ios-gray-200 text-ios-black font-semibold rounded-xl transition-all duration-200 active:scale-95"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg active:scale-95"
                        >
                            {isEditing ? 'Save Changes' : 'Add Card'}
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default Cards;

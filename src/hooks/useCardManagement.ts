import { useLocalStorage } from './useLocalStorage';
import { CreditCard } from '../types';
import { mockCreditCards } from '../data/mockData';
import { generateId } from '../lib/utils';

/**
 * Custom hook for managing credit cards with CRUD operations
 */
export function useCardManagement() {
    const [cards, setCards] = useLocalStorage<CreditCard[]>('perq_credit_cards', mockCreditCards);

    const addCard = (card: Omit<CreditCard, 'id'>) => {
        const newCard: CreditCard = {
            ...card,
            id: generateId(),
        };
        setCards((prev) => [...prev, newCard]);
        return newCard;
    };

    const updateCard = (id: string, updates: Partial<CreditCard>) => {
        setCards((prev) => prev.map((card) => (card.id === id ? { ...card, ...updates } : card)));
    };

    const deleteCard = (id: string) => {
        setCards((prev) => prev.filter((card) => card.id !== id));
    };

    const getCard = (id: string) => {
        return cards.find((card) => card.id === id);
    };

    return {
        cards,
        addCard,
        updateCard,
        deleteCard,
        getCard,
    };
}

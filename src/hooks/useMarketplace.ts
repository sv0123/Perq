import { useLocalStorage } from './useLocalStorage';
import { MarketplaceListing } from '../types';
import { mockMarketplaceListings } from '../data/mockData';
import { generateId } from '../lib/utils';

export function useMarketplace() {
    const [listings, setListings] = useLocalStorage<MarketplaceListing[]>('perq_marketplace_listings', mockMarketplaceListings);

    const addListing = (listing: Omit<MarketplaceListing, 'id' | 'userId' | 'createdAt' | 'userName' | 'userVerified' | 'userRating'>) => {
        const newListing: MarketplaceListing = {
            ...listing,
            id: generateId(),
            createdAt: new Date(),
            userId: 'u_current_user',
            userName: 'You', // In a real app, this would be the current user
            userVerified: true,
            userRating: 5.0,
        };
        setListings((prev) => [newListing, ...prev]);
        return newListing;
    };

    const deleteListing = (id: string) => {
        setListings((prev) => prev.filter((l) => l.id !== id));
    };

    return {
        listings,
        addListing,
        deleteListing,
    };
}

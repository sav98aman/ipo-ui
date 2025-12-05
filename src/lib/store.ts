import { create } from 'zustand';
import { IPOData } from '@/types/ipo';

interface IPOStore {
    searchQuery: string;
    setSearchQuery: (query: string) => void;

    statusFilter: 'Current' | 'Upcoming' | 'All';
    setStatusFilter: (status: 'Current' | 'Upcoming' | 'All') => void;

    sectorFilter: 'All' | 'Mainline' | 'SME';
    setSectorFilter: (sector: 'All' | 'Mainline' | 'SME') => void;

    selectedIPO: IPOData | null;
    setSelectedIPO: (ipo: IPOData | null) => void;

    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}

export const useIPOStore = create<IPOStore>((set) => ({
    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),

    statusFilter: 'Current',
    setStatusFilter: (status) => set({ statusFilter: status }),

    sectorFilter: 'All',
    setSectorFilter: (sector) => set({ sectorFilter: sector }),

    selectedIPO: null,
    setSelectedIPO: (ipo) => set({ selectedIPO: ipo, isModalOpen: !!ipo }),

    isModalOpen: false,
    setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen, selectedIPO: isOpen ? undefined : null }), // Keep selectedIPO if opening, clear if closing? Actually better to clear on close explicitly if needed, but here we just toggle.
}));

'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import DealCard from '@/components/DealCard';
import { Deal } from '@/types';
import { dealService } from '@/lib/services';
import { Search, Filter, Loader2, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ['All', 'Design', 'Development', 'Marketing', 'Productivity', 'Finance', 'Other'];

export default function DealsPage() {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [accessFilter, setAccessFilter] = useState<'all' | 'public' | 'restricted'>('all');

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const data = await dealService.getAllDeals();
                setDeals(data);
            } catch (error) {
                console.error('Error fetching deals:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDeals();
    }, []);

    const filteredDeals = deals.filter(deal => {
        const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            deal.partnerName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || deal.category === selectedCategory;
        const matchesAccess = accessFilter === 'all' || deal.accessLevel === accessFilter;
        return matchesSearch && matchesCategory && matchesAccess;
    });

    return (
        <div className="min-h-screen bg-[#020617] pb-20">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 pt-32">
                {/* Header */}
                <div className="mb-12">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl font-bold font-outfit mb-4"
                    >
                        Startup <span className="text-indigo-500">Benefits Desk</span>
                    </motion.h1>
                    <p className="text-gray-400 max-w-2xl">
                        Unlock thousands of dollars in savings with our curated partnerships. Filter by category or search for specific tools.
                    </p>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col lg:flex-row gap-6 mb-12 items-start lg:items-center justify-between">
                    <div className="relative w-full lg:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search tools, partners, or deals..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/10">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedCategory === cat
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                                            : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <select
                            className="bg-white/5 border border-white/10 rounded-2xl py-2 px-4 text-sm font-semibold focus:outline-none cursor-pointer hover:bg-white/10 transition-colors"
                            value={accessFilter}
                            onChange={(e: any) => setAccessFilter(e.target.value)}
                        >
                            <option value="all" className="bg-[#020617]">All Access</option>
                            <option value="public" className="bg-[#020617]">Public Deals</option>
                            <option value="restricted" className="bg-[#020617]">Restricted</option>
                        </select>
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-4">
                        <Loader2 className="animate-spin text-indigo-500" size={48} />
                        <p className="text-gray-500 font-medium">Loading exclusive deals...</p>
                    </div>
                ) : (
                    <>
                        {filteredDeals.length > 0 ? (
                            <motion.div
                                layout
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                <AnimatePresence mode='popLayout'>
                                    {filteredDeals.map(deal => (
                                        <DealCard key={deal._id} deal={deal} />
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        ) : (
                            <div className="text-center py-40 glass-card rounded-3xl border-dashed">
                                <div className="inline-flex p-6 rounded-full bg-white/5 mb-6">
                                    <SlidersHorizontal className="text-gray-600" size={48} />
                                </div>
                                <h2 className="text-2xl font-bold mb-2">No deals found</h2>
                                <p className="text-gray-500 max-w-sm mx-auto">
                                    We couldn't find any deals matching your current filters. Try adjusting your search or category selection.
                                </p>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}

'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { Deal, Claim } from '@/types';
import { dealService, claimService } from '@/lib/services';
import {
    Plus,
    Edit,
    Trash2,
    Check,
    X,
    Clock,
    Package,
    Users,
    TrendingUp,
    Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    const [deals, setDeals] = useState<Deal[]>([]);
    const [claims, setClaims] = useState<Claim[]>([]);
    const [activeTab, setActiveTab] = useState<'deals' | 'claims'>('deals');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && (!user || user.role !== 'admin')) {
            router.push('/login');
            return;
        }

        const fetchData = async () => {
            try {
                const [dealsData, claimsData] = await Promise.all([
                    dealService.getAllDeals(),
                    claimService.getAllClaims()
                ]);
                setDeals(dealsData);
                setClaims(claimsData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (user?.role === 'admin') fetchData();
    }, [user, authLoading]);

    const handleUpdateStatus = async (claimId: string, status: 'approved' | 'rejected') => {
        try {
            await claimService.updateClaimStatus(claimId, status);
            setClaims(claims.map(c => c._id === claimId ? { ...c, status } : c));
        } catch (err) {
            alert('Failed to update status');
        }
    };

    if (authLoading || loading) {
        return <div className="min-h-screen bg-[#020617] flex items-center justify-center"><Loader2 className="animate-spin text-indigo-500" size={48} /></div>;
    }

    return (
        <div className="min-h-screen bg-[#020617] pb-20">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 pt-32">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black font-outfit mb-2">Command Center</h1>
                        <p className="text-gray-500">Manage platform deals and review startup benefit claims.</p>
                    </div>

                    <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 shrink-0">
                        <button
                            onClick={() => setActiveTab('deals')}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'deals' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-gray-400 hover:text-white'}`}
                        >
                            <Package size={18} /> Deals
                        </button>
                        <button
                            onClick={() => setActiveTab('claims')}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'claims' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-gray-400 hover:text-white'}`}
                        >
                            <TrendingUp size={18} /> Claims
                        </button>
                    </div>
                </div>

                {activeTab === 'deals' ? (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">Manage Inventory ({deals.length})</h2>
                            <button className="bg-white text-black px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-gray-200 transition-colors">
                                <Plus size={18} /> New Deal
                            </button>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-white/[0.02] border-b border-white/10">
                                    <tr>
                                        <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Partner & Title</th>
                                        <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Category</th>
                                        <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Value</th>
                                        <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {deals.map(deal => (
                                        <tr key={deal._id} className="hover:bg-white/[0.01] transition-colors">
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-lg bg-white p-2 shrink-0">
                                                        <img src={deal.logoUrl} alt="" className="w-full h-full object-contain" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-white">{deal.title}</p>
                                                        <p className="text-xs text-gray-500">{deal.partnerName}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6 text-sm text-gray-400">{deal.category}</td>
                                            <td className="p-6 font-bold text-indigo-400">{deal.discount}</td>
                                            <td className="p-6">
                                                <div className="flex justify-end gap-2">
                                                    <button className="p-2 text-gray-500 hover:text-white transition-colors"><Edit size={18} /></button>
                                                    <button className="p-2 text-gray-500 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold">Pending Reviews ({claims.filter(c => c.status === 'pending').length})</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {claims.map(claim => (
                                <div key={claim._id} className="glass-card rounded-[2rem] p-6 flex flex-col md:flex-row items-center gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <p className="font-black text-white">{(claim.user as any).name}</p>
                                            <span className="text-xs text-gray-600">•</span>
                                            <p className="text-sm font-medium text-gray-500">{(claim.user as any).email}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-full">
                                                {(claim.deal as any).title}
                                            </span>
                                            <span className="text-xs text-gray-500 flex items-center gap-1.5">
                                                <Clock size={12} /> {new Date(claim.claimedAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    {claim.status === 'pending' ? (
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleUpdateStatus(claim._id, 'rejected')}
                                                className="px-6 py-2.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 font-bold text-sm hover:bg-red-500/20 transition-all flex items-center gap-2"
                                            >
                                                <X size={18} /> Reject
                                            </button>
                                            <button
                                                onClick={() => handleUpdateStatus(claim._id, 'approved')}
                                                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                                            >
                                                <Check size={18} /> Approve
                                            </button>
                                        </div>
                                    ) : (
                                        <div className={`px-6 py-2.5 rounded-xl font-bold text-sm capitalize border ${claim.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                                            }`}>
                                            {claim.status}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

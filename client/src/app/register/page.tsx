'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Rocket, Mail, Lock, User as UserIcon, ArrowRight, Loader2, AlertCircle, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RegisterPage() {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await api.post('/auth/register', formData);
            login(response.data.token, response.data.user);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] right-[10%] w-[600px] h-[600px] bg-indigo-500/10 blur-[130px] rounded-full" />
                <div className="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] bg-purple-500/10 blur-[130px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-xl z-10"
            >
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
                        <div className="p-3 rounded-2xl bg-indigo-600 group-hover:rotate-12 transition-transform shadow-xl shadow-indigo-600/30">
                            <Rocket className="text-white" size={32} />
                        </div>
                        <span className="text-3xl font-black font-outfit tracking-tighter">StartupBenefits</span>
                    </Link>
                    <h1 className="text-4xl font-black mb-3">Claim Your Perks</h1>
                    <p className="text-gray-500 font-medium max-w-sm mx-auto">Join thousands of founders saving $10k+ on premium SaaS tools today.</p>
                </div>

                <div className="glass-card rounded-[2.5rem] p-10 md:p-12 relative overflow-hidden">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3"
                            >
                                <AlertCircle size={18} className="shrink-0" />
                                <span>{error}</span>
                            </motion.div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-500 uppercase tracking-widest px-1">Full Name</label>
                                <div className="relative group">
                                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Alex Rivera"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-500 uppercase tracking-widest px-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                    <input
                                        type="email"
                                        required
                                        placeholder="founder@startup.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-500 uppercase tracking-widest px-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                <input
                                    type="password"
                                    required
                                    placeholder="Create a strong password"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-indigo-500/5 border border-white/5">
                            <Shield className="text-indigo-400 shrink-0" size={20} />
                            <p className="text-xs text-gray-400 leading-relaxed font-medium">
                                By registering, you agree to our verification process. Exclusive/Restricted perks require proof of startup operation.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : (
                                <>Create Founder Account <ArrowRight size={20} /></>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center mt-10 text-gray-500 font-medium">
                    Already have an account? <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors">Sign In</Link>
                </p>
            </motion.div>
        </div>
    );
}

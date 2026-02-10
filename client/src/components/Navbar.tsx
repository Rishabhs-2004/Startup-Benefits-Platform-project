'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Rocket, LogOut, User as UserIcon, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-lg border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center gap-2 group">
                        <Rocket className="w-8 h-8 text-indigo-500 group-hover:rotate-12 transition-transform" />
                        <span className="text-xl font-bold font-outfit tracking-tight">
                            Startup<span className="text-indigo-500">Benefits</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/deals" className="text-gray-300 hover:text-white transition-colors">Deals</Link>
                        {user && (
                            <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
                        )}
                        {user?.role === 'admin' && (
                            <Link href="/admin" className="text-indigo-400 hover:text-indigo-300 transition-colors">Admin</Link>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link href="/dashboard" className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                                    <UserIcon size={16} />
                                    {user.name}
                                    {user.isVerified && <Shield size={14} className="text-blue-400" />}
                                </Link>
                                <button
                                    onClick={logout}
                                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                                    Sign In
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

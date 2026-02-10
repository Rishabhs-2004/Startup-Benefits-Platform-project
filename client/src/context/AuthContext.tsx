'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';
import api from '../lib/api';
import { useRouter } from 'next/navigation';

interface AuthContextType extends AuthState {
    login: (token: string, user: User) => void;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AuthState>({
        user: null,
        token: null,
        loading: true,
    });
    const router = useRouter();

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setState({ user: null, token: null, loading: false });
            return;
        }

        try {
            const response = await api.get('/auth/me');
            setState({ user: response.data, token, loading: false });
        } catch (error) {
            localStorage.removeItem('token');
            setState({ user: null, token: null, loading: false });
        }
    };

    const login = (token: string, user: User) => {
        localStorage.setItem('token', token);
        setState({ user, token, loading: false });
        router.push('/deals');
    };

    const logout = () => {
        localStorage.removeItem('token');
        setState({ user: null, token: null, loading: false });
        router.push('/login');
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

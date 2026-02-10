export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    isVerified: boolean;
}

export interface Deal {
    _id: string;
    title: string;
    description: string;
    category: 'Design' | 'Development' | 'Marketing' | 'Productivity' | 'Finance' | 'Other';
    discount: string;
    partnerName: string;
    logoUrl?: string;
    redemptionLink?: string;
    accessLevel: 'public' | 'restricted';
    eligibilityConditions: string;
    featured: boolean;
    createdAt: string;
}

export interface Claim {
    _id: string;
    user: string | Partial<User>;
    deal: string | Deal;
    status: 'pending' | 'approved' | 'rejected';
    claimedAt: string;
    createdAt: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
}

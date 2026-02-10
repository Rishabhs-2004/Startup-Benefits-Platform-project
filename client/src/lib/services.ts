import api from './api';
import { Deal, Claim } from '../types';

export const dealService = {
    getAllDeals: async () => {
        const response = await api.get('/deals');
        return response.data;
    },
    getDealById: async (id: string) => {
        const response = await api.get(`/deals/${id}`);
        return response.data;
    },
    createDeal: async (dealData: any) => {
        const response = await api.post('/deals', dealData);
        return response.data;
    },
    updateDeal: async (id: string, dealData: any) => {
        const response = await api.put(`/deals/${id}`, dealData);
        return response.data;
    },
    deleteDeal: async (id: string) => {
        const response = await api.delete(`/deals/${id}`);
        return response.data;
    }
};

export const claimService = {
    claimDeal: async (dealId: string) => {
        const response = await api.post('/claims', { dealId });
        return response.data;
    },
    getMyClaims: async () => {
        const response = await api.get('/claims/my-claims');
        return response.data;
    },
    getAllClaims: async () => {
        const response = await api.get('/claims');
        return response.data;
    },
    updateClaimStatus: async (claimId: string, status: string) => {
        const response = await api.put(`/claims/${claimId}`, { status });
        return response.data;
    }
};

import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import User from '@/models/User';
import connectDB from './mongoose';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

export async function requireAuth(req: NextRequest) {
    await connectDB();
    
    let token;
    const authHeader = req.headers.get('authorization');

    if (authHeader && authHeader.startsWith('Bearer')) {
        try {
            token = authHeader.split(' ')[1];
            
            const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
            const user = await User.findById(decoded.id).select('-password');
            
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error('Not authorized');
        }
    }

    if (!token) {
        throw new Error('Not authorized, no token');
    }
}

export async function requireAdmin(req: NextRequest) {
    const user = await requireAuth(req);
    if (user && user.role === 'admin') {
        return user;
    }
    throw new Error('Not authorized as an admin');
}

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import { requireAuth } from '@/lib/authMiddleware';

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const user = await requireAuth(req);
        return NextResponse.json(user);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 401 });
    }
}

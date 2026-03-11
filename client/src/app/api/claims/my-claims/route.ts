import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Claim from '@/models/Claim';
import { requireAuth } from '@/lib/authMiddleware';

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const user = await requireAuth(req);

        const claims = await Claim.find({ user: user._id })
            .populate('deal')
            .sort('-createdAt');

        return NextResponse.json(claims);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 401 });
    }
}

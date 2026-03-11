import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Claim from '@/models/Claim';
import Deal from '@/models/Deal';
import { requireAuth, requireAdmin } from '@/lib/authMiddleware';

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        await requireAdmin(req);
        
        const claims = await Claim.find({})
            .populate('user', 'name email')
            .populate('deal')
            .sort('-createdAt');

        return NextResponse.json(claims);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 403 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const user = await requireAuth(req);
        const { dealId } = await req.json();

        const deal = await Deal.findById(dealId);

        if (!deal) {
            return NextResponse.json({ message: 'Deal not found' }, { status: 404 });
        }

        if (deal.accessLevel === 'restricted' && !user.isVerified) {
            return NextResponse.json({ message: 'This deal is restricted to verified users only.' }, { status: 403 });
        }

        const existingClaim = await Claim.findOne({
            user: user._id,
            deal: dealId
        });

        if (existingClaim) {
            return NextResponse.json({ message: 'You have already claimed this deal' }, { status: 400 });
        }

        const claim = await Claim.create({
            user: user._id,
            deal: dealId,
            status: 'pending'
        });

        return NextResponse.json(claim, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Claim from '@/models/Claim';
import { requireAdmin } from '@/lib/authMiddleware';

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> } // In Next 15 params is a Promise
) {
    try {
        await connectDB();
        await requireAdmin(req);
        
        const { id } = await params;
        const { status } = await req.json();

        const claim = await Claim.findById(id);

        if (!claim) {
            return NextResponse.json({ message: 'Claim not found' }, { status: 404 });
        }

        claim.status = status;
        const updatedClaim = await claim.save();

        return NextResponse.json(updatedClaim);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 403 });
    }
}

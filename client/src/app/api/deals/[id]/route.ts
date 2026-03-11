import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Deal from '@/models/Deal';
import { requireAdmin } from '@/lib/authMiddleware';

export async function GET(
    req: NextRequest, 
    { params }: { params: Promise<{ id: string }> } // In Next 15 params is a Promise
) {
    try {
        await connectDB();
        const { id } = await params;
        const deal = await Deal.findById(id);

        if (!deal) {
            return NextResponse.json({ message: 'Deal not found' }, { status: 404 });
        }
        
        return NextResponse.json(deal);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest, 
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        await requireAdmin(req);
        
        const { id } = await params;
        const body = await req.json();

        const deal = await Deal.findById(id);

        if (!deal) {
            return NextResponse.json({ message: 'Deal not found' }, { status: 404 });
        }

        const updatedDeal = await Deal.findByIdAndUpdate(id, body, {
            new: true,
        });

        return NextResponse.json(updatedDeal);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 403 });
    }
}

export async function DELETE(
    req: NextRequest, 
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        await requireAdmin(req);

        const { id } = await params;
        const deal = await Deal.findById(id);

        if (!deal) {
             return NextResponse.json({ message: 'Deal not found' }, { status: 404 });
        }

        await deal.deleteOne();

        return NextResponse.json({ id });
    } catch (error: any) {
         return NextResponse.json({ message: error.message }, { status: 403 });
    }
}

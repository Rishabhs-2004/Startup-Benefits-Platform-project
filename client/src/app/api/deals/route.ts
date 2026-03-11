import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Deal from '@/models/Deal';
import { requireAdmin } from '@/lib/authMiddleware';

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const deals = await Deal.find();
        return NextResponse.json(deals);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        await requireAdmin(req);
        
        const body = await req.json();
        
        if (!body.title || !body.description) {
            return NextResponse.json({ message: 'Please add a title and description' }, { status: 400 });
        }

        const deal = await Deal.create(body);
        return NextResponse.json(deal, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: error.message === 'Not authorized as an admin' ? 403 : 400 });
    }
}

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import User from '@/models/User';

export async function GET() {
    try {
        await connectDB();
        
        const adminEmail = 'admin@gmail.com';
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            existingAdmin.password = '1122'; // Reset to default
            existingAdmin.role = 'admin';
            existingAdmin.isVerified = true;
            await existingAdmin.save();
            return NextResponse.json({ message: 'Admin user updated. Login with admin@gmail.com / 1122' });
        }

        await User.create({
            name: 'Admin User',
            email: adminEmail,
            password: '1122',
            role: 'admin',
            isVerified: true
        });

        return NextResponse.json({ message: 'Admin user created. Login with admin@gmail.com / 1122' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

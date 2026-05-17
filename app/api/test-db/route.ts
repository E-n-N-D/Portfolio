// app/api/test-db/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ status: 'connected' });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
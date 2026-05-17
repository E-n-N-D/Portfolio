import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Team from '@/models/Team';
import type { TeamRequestBody } from '@/types';

export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();
    const teams = await Team.find().sort({ name: 1 });
    return NextResponse.json(teams);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    await connectDB();
    const body: TeamRequestBody = await request.json();
    const team = await Team.create({ name: body.name, color: body.color });
    return NextResponse.json(team, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

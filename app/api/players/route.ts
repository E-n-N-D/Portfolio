import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Player from '@/models/Player';
import type { IMedals } from '@/types';

interface LeanPlayer {
  _id: unknown;
  name: string;
  team: unknown;
  medals: IMedals;
  [key: string]: unknown;
}

export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();
    const players = await Player.find().populate('team').lean<LeanPlayer[]>();

    // lean() strips virtuals, so we re-attach the total manually
    const withTotal = players.map((p) => ({
      ...p,
      total: p.medals.gold * 3 + p.medals.silver * 2 + p.medals.bronze,
    }));

    return NextResponse.json(withTotal);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    await connectDB();
    const body: { name: string; teamId: string } = await request.json();

    const player = await Player.create({
      name:   body.name,
      team:   body.teamId,
      medals: { gold: 0, silver: 0, bronze: 0 },
    });

    const populated = await player.populate('team');

    return NextResponse.json(
      { ...populated.toObject(), total: populated.total },
      { status: 201 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Player from '@/models/Player';
import type { PlayerRequestBody } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PUT(
  request: Request,
  { params }: RouteContext
): Promise<NextResponse> {
  try {
    await connectDB();
    const { id } = await params;
    const body: PlayerRequestBody = await request.json();

    const update: Record<string, unknown> = {};
    if (body.name   !== undefined) update.name   = body.name;
    if (body.teamId !== undefined) update.team   = body.teamId;
    if (body.medals !== undefined) update.medals = body.medals;

    const player = await Player.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    }).populate('team');

    if (!player) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }

    return NextResponse.json({ ...player.toObject(), total: player.total });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: RouteContext
): Promise<NextResponse> {
  try {
    await connectDB();
    const { id } = await params;
    const player = await Player.findByIdAndDelete(id);
    if (!player) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Player deleted' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

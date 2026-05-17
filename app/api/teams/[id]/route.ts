import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Team from '@/models/Team';
import Player from '@/models/Player';
import type { TeamRequestBody } from '@/types';

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
    const body: TeamRequestBody = await request.json();
    const team = await Team.findByIdAndUpdate(
      id,
      { name: body.name, color: body.color },
      { new: true, runValidators: true }
    );
    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }
    return NextResponse.json(team);
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
    const team = await Team.findByIdAndDelete(id);
    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }
    // Cascade-delete all players belonging to this team
    await Player.deleteMany({ team: id });
    return NextResponse.json({ message: 'Team and its players deleted' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

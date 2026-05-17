import { NextResponse } from 'next/server';

interface VerifyRequestBody {
  password?: unknown;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body: VerifyRequestBody = await request.json();
    const password = typeof body.password === 'string' ? body.password : '';
    const expected = process.env.PASS;

    if (!expected) {
      return NextResponse.json(
        { error: 'Admin password is not configured' },
        { status: 500 }
      );
    }

    if (!password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 });
    }

    if (password !== expected) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

import { getMySongStatus } from '@/lib/spotify';
import { NextResponse } from 'next/server';

// Ensure this is exactly "GET" and is exported
export async function GET() {
  try {
    const song = await getMySongStatus();
    return NextResponse.json(song);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
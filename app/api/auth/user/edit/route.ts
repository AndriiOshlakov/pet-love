import { NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { apiWithAuth } from '@/app/api/api';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const api = await apiWithAuth();
    const res = await api.patch('/users/current/edit', body);
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status },
      );
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

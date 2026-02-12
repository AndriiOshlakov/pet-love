import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { apiWithAuth } from '../../api';

export async function POST() {
  try {
    const api = await apiWithAuth();
    await api.post('/users/signout');
    const cookieStore = await cookies();
    cookieStore.delete('token');

    return NextResponse.json({ message: 'Logged out' }, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data || error.message },
        { status: error.response?.status || 500 },
      );
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { apiWithAuth } from '@/app/api/api';

export async function POST(req: Request) {
  try {
    const { params } = await req.json();
    const api = await apiWithAuth();
    const res = await api.post('/users/current/pets/add', params);
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

export async function DELETE(req: Request) {
  console.log('DELETE ROUTE');
  try {
    const { params } = await req.json();
    const { id } = params;
    console.log('DELETE', id);

    const api = await apiWithAuth();
    const res = await api.delete(`/users/current/pets/remove/${id}`);
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

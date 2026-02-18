import { NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { apiWithAuth } from '@/app/api/api';

type Props = {
  params: Promise<{ id: string }>;
};

export async function DELETE(req: Request, { params }: Props) {
  try {
    const { id } = await params;

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

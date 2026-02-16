// import { NextResponse } from 'next/server';
// import { isAxiosError } from 'axios';
// import { apiWithAuth } from '@/app/api/api';

// type Props = {
//   params: Promise<{ id: string }>;
// };

// export async function DELETE(request: Request, { params }: Props) {
//   try {
//     const { id } = await params;
//     console.log('REMOVE');

//     const api = await apiWithAuth();

//     const res = await api.delete(`/notices/favorites/remove/${id}`);
//     return NextResponse.json(res.data, { status: res.status });
//   } catch (error) {
//     if (isAxiosError(error)) {
//       return NextResponse.json(
//         { error: error.message, response: error.response?.data },
//         { status: error.status },
//       );
//     }
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { apiWithAuth } from '@/app/api/api';

type Props = {
  params: Promise<{ id: string }>;
};

export async function DELETE(request: Request, { params }: Props) {
  try {
    const { id } = await params;

    const api = await apiWithAuth();

    const res = await api.delete(`/notices/favorites/remove/${id}`);
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        {
          status: error.response?.status || 500,
        },
      );
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

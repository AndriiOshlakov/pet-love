// import { NextRequest, NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import { parse } from 'cookie';
// import { isAxiosError } from 'axios';
// import { api } from '../../api';

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const apiRes = await api.post('/users/signup', body);
//     const cookieStore = await cookies();
//     const setCookie = apiRes.headers['set-cookie'];
//     if (setCookie) {
//       const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
//       for (const cookieStr of cookieArray) {
//         const parsed = parse(cookieStr);
//         const options = {
//           expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
//           path: parsed.Path,
//           maxAge: Number(parsed['Max-Age']),
//         };
//         if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
//         if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
//       }
//       return NextResponse.json(apiRes.data, { status: apiRes.status });
//     }
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   } catch (error) {
//     if (isAxiosError(error)) {
//       const status = error.response?.status ?? 500;
//       const msg =
//         error.response?.data?.error ??
//         error.response?.data?.message ??
//         'Не вдалося створити обліковий запис. Спробуйте ще раз';

//       return NextResponse.json({ error: msg }, { status });
//     }
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }
// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await axios.post('https://petlove.b.goit.study/api/users/signin', body);

    const { token, ...user } = res.data;

    const response = NextResponse.json(user);

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.response?.data || error.message }, { status: 400 });
  }
}

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

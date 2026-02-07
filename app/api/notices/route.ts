import { NextRequest, NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { api } from '../api';

export async function GET(request: NextRequest) {
  try {
    const page = Number(request.nextUrl.searchParams.get('page') ?? 1);
    const limit = Number(request.nextUrl.searchParams.get('limit') ?? 6);
    const keyword = request.nextUrl.searchParams.get('keyword') ?? undefined;
    const category = request.nextUrl.searchParams.get('category') ?? undefined;
    const species = request.nextUrl.searchParams.get('species') ?? undefined;
    const locationId = request.nextUrl.searchParams.get('locationId') ?? undefined;
    const rawByDate = request.nextUrl.searchParams.get('byDate');
    const byDate = rawByDate === null ? undefined : rawByDate === 'true';

    const rawByPrice = request.nextUrl.searchParams.get('byPrice');
    const byPrice = rawByPrice === null ? undefined : rawByPrice === 'true';

    const rawByPopularity = request.nextUrl.searchParams.get('byPopularity');
    const byPopularity = rawByPopularity === null ? undefined : rawByPopularity === 'true';

    const sex = request.nextUrl.searchParams.get('sex') ?? undefined;
    const response = await api.get('/notices', {
      params: {
        page,
        limit,
        keyword,
        category,
        species,
        locationId,
        byDate,
        byPrice,
        byPopularity,
        sex,
      },
    });
    return NextResponse.json(response.data, { status: response.status });
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

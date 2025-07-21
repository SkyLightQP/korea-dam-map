import { NextResponse } from 'next/server';
import { ApiResponse, DamData } from '@/types/dam';
import { memoryCache } from '@/lib/cache';
import { DamService } from '@/lib/dam-service';

const CACHE_KEY = 'dam-data';
const CACHE_DURATION = 60 * 60 * 1000; // 1시간

export async function GET() {
  try {
    const cachedData = memoryCache.get<DamData[]>(CACHE_KEY);
    if (cachedData) {
      return NextResponse.json({
        data: cachedData
      } as ApiResponse);
    }

    const serviceKey = process.env.OPENAPI_SERVICE_KEY;
    if (!serviceKey) {
      return NextResponse.json({ error: 'API_KEY_ERROR' } as ApiResponse, { status: 500 });
    }

    const damService = new DamService(serviceKey);
    const damData = await damService.fetchDamData();

    memoryCache.set(CACHE_KEY, damData, CACHE_DURATION);

    return NextResponse.json({
      data: damData
    } as ApiResponse);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
      } as ApiResponse,
      { status: 500 }
    );
  }
}

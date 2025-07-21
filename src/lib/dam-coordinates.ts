import { DamCoordinates } from '@/types/dam';

export const DAM_COORDINATES: Record<string, DamCoordinates> = {
  대청: { lat: 36.477352, lng: 127.48098 },
  용담: { lat: 35.944434, lng: 127.525966 },
  부안: { lat: 35.675592, lng: 126.563079 },
  군위: { lat: 36.11982, lng: 128.794103 },
  남강: { lat: 35.165345, lng: 128.037457 },
  섬진강: { lat: 35.540756, lng: 127.110014 },
  소양강: { lat: 37.944781, lng: 127.813901 },
  충주: { lat: 37.006237, lng: 127.992616 }
};

export const DEFAULT_COORDINATES: DamCoordinates = { lat: 37.5665, lng: 126.978 }; // 서울

export function getDamCoordinates(damName: string): DamCoordinates {
  return DAM_COORDINATES[damName] || DEFAULT_COORDINATES;
}

export interface DamData {
  damName: string;
  rainfall: number;
  inflow: number;
  outflow: number;
  waterLevel: number;
  storageVolume: number;
  storageRate: number;
  powerGeneration: number;
  latitude: number;
  longitude: number;
}

export interface ApiResponse {
  data?: DamData[];
  error?: string;
}

export interface DamCoordinates {
  lat: number;
  lng: number;
}

export interface OpenApiResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: {
        item: OpenApiDamItem[] | OpenApiDamItem;
      };
    };
  };
}

export interface OpenApiDamItem {
  damnm: string;
  prcptqy: string;
  inflowqy: string;
  totdcwtrqy: string;
  nowlowlevel: string;
  nowrsvwtqy: string;
  rsvwtrt: string;
  dvlpqyacmtlacmslt: string;
  date?: string;
}
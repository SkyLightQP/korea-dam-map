import { DamData, OpenApiDamItem, OpenApiResponse } from '@/types/dam';
import { DAM_COORDINATES, getDamCoordinates } from './dam-coordinates';

export class DamService {
  private readonly baseUrl = 'https://apis.data.go.kr/B500001/dam/multipurPoseDam/multipurPoseDamlist';

  constructor(private serviceKey: string) {}

  private generateDateParams() {
    const now = new Date();
    const vdate = now.toISOString().split('T')[0];

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const tdate = yesterday.toISOString().split('T')[0];

    const lastYear = new Date(now);
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    const ldate = lastYear.toISOString().split('T')[0];

    const vtime = now.getHours().toString().padStart(2, '0');

    return { vdate, tdate, ldate, vtime };
  }

  private buildRequestUrl(): string {
    const { vdate, tdate, ldate, vtime } = this.generateDateParams();

    const params = new URLSearchParams({
      serviceKey: this.serviceKey,
      pageNo: '1',
      numOfRows: '100',
      _type: 'json',
      vdate,
      tdate,
      ldate,
      vtime
    });

    return `${this.baseUrl}?${params.toString()}`;
  }

  private transformApiItem(item: OpenApiDamItem): DamData {
    const damName = item.damnm || '';
    const coordinates = getDamCoordinates(damName);

    return {
      damName,
      rainfall: parseFloat(item.prcptqy) || 0,
      inflow: parseFloat(item.inflowqy) || 0,
      outflow: parseFloat(item.totdcwtrqy) || 0,
      waterLevel: parseFloat(item.nowlowlevel) || 0,
      storageVolume: parseFloat(item.nowrsvwtqy) || 0,
      storageRate: parseFloat(item.rsvwtrt) || 0,
      powerGeneration: parseFloat(item.dvlpqyacmtlacmslt) || 0,
      latitude: coordinates.lat,
      longitude: coordinates.lng
    };
  }

  async fetchDamData(): Promise<DamData[]> {
    const url = this.buildRequestUrl();

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const result: OpenApiResponse = await response.json();

    if (result.response?.header?.resultCode !== '00') {
      throw new Error(`${result.response?.header?.resultMsg || '알 수 없는 오류'}`);
    }

    const items = result.response?.body?.items?.item || [];
    const itemArray = Array.isArray(items) ? items : [items];

    const filteredItems = itemArray.filter((item) => {
      const damName = item.damnm || '';
      return DAM_COORDINATES.hasOwnProperty(damName);
    });

    return filteredItems.map((item) => this.transformApiItem(item));
  }
}

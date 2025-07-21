import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { NaverMap } from '@/components/NaverMap';
import { RefObject } from 'react';

interface MapCardProps {
  readonly naverMap: RefObject<naver.maps.Map | null>;
}

export function MapCard({ naverMap }: MapCardProps) {
  return (
    <div className="lg:col-span-3">
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row items-center text-lg">
            <MapPin size={22} className="mr-0.5" />
            국내 댐 위치
          </CardTitle>
        </CardHeader>
        <CardContent>
          <NaverMap className="h-[40rem] w-full rounded-md" naverMapRef={naverMap} />
        </CardContent>
      </Card>
    </div>
  );
}

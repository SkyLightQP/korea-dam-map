'use client';

import { useEffect, useRef, useState } from 'react';
import { DamData } from '@/types/dam';
import { MapCard } from '@/components/MapCard';
import { DamStat } from '@/components/DamStat';
import { DamDetail } from '@/components/DamDetail';
import { DamList } from '@/components/DamList';

export default function Home() {
  const naverMap = useRef<naver.maps.Map>(null);
  const [damData, setDamData] = useState<DamData[]>([]);
  const [selectedDam, setSelectedDam] = useState<DamData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDamData = async () => {
      try {
        const response = await fetch('/api/dams');
        const result = await response.json();

        if (result.data) {
          setDamData(result.data);
        }
      } catch (error) {
        console.error('댐 데이터 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDamData();
  }, []);

  useEffect(() => {
    if (!naverMap.current || isLoading || damData.length === 0) return;

    damData.forEach((dam) => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(dam.latitude, dam.longitude),
        map: naverMap.current ?? undefined,
        title: dam.damName,
        icon: {
          content: `<div class="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-md cursor-pointer transition-all duration-200 ease-in-out hover:bg-emerald-600 hover:scale-110"></div>`,
          anchor: new naver.maps.Point(0, 0)
        }
      });

      naver.maps.Event.addListener(marker, 'click', () => {
        setSelectedDam(dam);
      });
    });
  }, [damData, isLoading]);

  const handleDamClick = (dam: DamData) => {
    setSelectedDam(dam);
    if (naverMap.current) {
      const position = new naver.maps.LatLng(dam.latitude, dam.longitude);
      naverMap.current.setCenter(position);
      naverMap.current.setZoom(15);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <header>
        <h1 className="text-3xl font-bold">대한민국 댐 지도</h1>
        <p className="text-gray-500">대한민국 댐 수문 개방과 인근 하천 정보를 확인해보세요.</p>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-4">
        <MapCard naverMap={naverMap} />

        <div className="space-y-4">
          <DamStat />
          {selectedDam && <DamDetail dam={selectedDam} />}
          <DamList allDams={damData} currentDam={selectedDam} onDamSelect={handleDamClick} />
        </div>
      </div>
    </main>
  );
}

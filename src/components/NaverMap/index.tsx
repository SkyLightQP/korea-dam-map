import { HtmlHTMLAttributes, RefObject, useEffect } from 'react';

interface NaverMapProps {
  naverMapRef: RefObject<naver.maps.Map | null>;
}

export function NaverMap({ className, naverMapRef }: NaverMapProps & HtmlHTMLAttributes<HTMLDivElement>) {
  useEffect(() => {
    const center: naver.maps.LatLng = new naver.maps.LatLng(37.3595704, 127.105399);

    naverMapRef.current = new naver.maps.Map('map', {
      center: center,
      zoom: 9
    });
  }, [naverMapRef]);

  return <div id="map" className={className}></div>;
}

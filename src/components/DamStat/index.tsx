import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InfoIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function DamStat() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row items-center text-lg">
          <InfoIcon size={22} className="mr-1" />
          전체 현황
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2.5">
        <div className="flex justify-between text-sm">
          <p className="text-gray-600">정상</p>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            0개
          </Badge>
        </div>
        <div className="flex justify-between text-sm">
          <p className="text-gray-600">주의</p>
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            0개
          </Badge>
        </div>
        <div className="flex justify-between text-sm">
          <p className="text-gray-600">위험</p>
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            0개
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

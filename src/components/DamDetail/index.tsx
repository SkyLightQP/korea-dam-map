import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplets } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DamData } from '@/types/dam';

interface DamDetailProps {
  readonly dam: DamData;
}

export function DamDetail({ dam }: DamDetailProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Droplets className="h-5 w-5" />
          {dam.damName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">상태</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              정상
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">저수율</span>
              <span className="font-medium">{dam.storageRate}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-emerald-500 transition-all"
                style={{
                  width: `${Math.min(dam.storageRate, 100)}%`
                }}
              ></div>
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">방류량</span>
            <span className="font-medium">{dam.outflow}㎥/s</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

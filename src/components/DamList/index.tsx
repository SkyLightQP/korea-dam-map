import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DamData } from '@/types/dam';

interface DamListProps {
  readonly allDams: DamData[];
  readonly currentDam?: DamData;
  readonly onDamSelect: (dam: DamData) => void;
}

export function DamList({ allDams, currentDam, onDamSelect }: DamListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row items-center text-lg">
          <DamIcon size={22} className="mr-1" />댐 목록
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1.5">
        {allDams.map((dam) => (
          <Button
            key={dam.damName}
            variant={currentDam?.damName === dam.damName ? 'default' : 'ghost'}
            className="w-full cursor-pointer justify-between"
            onClick={() => onDamSelect(dam)}
          >
            {dam.damName}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}

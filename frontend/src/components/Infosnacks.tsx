/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: number;
}

const StatsCard = ({ title, value }: StatsCardProps) => (
  <Card className="bg-blue-900/40 border-amber-200/10">
    <CardContent className="p-6">
      <div className="text-amber-200/60 text-sm">{title}</div>
      <div className="text-2xl font-semibold text-amber-100 mt-2">{value}</div>
      <div className="text-amber-200/40 text-sm mt-2">caption with more details</div>
    </CardContent>
  </Card>
);

interface StatsGridProps {
  stats: string[];
  callsLength: number;
}

const StatsGrid = ({ stats, callsLength }: StatsGridProps) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    {stats.map((title, i) => {
      let value: number;
      if (title === "Total calls") {
        value = callsLength;
      } else {
        value = Math.floor(Math.random() * 100);
      }
      
      return <StatsCard key={i} title={title} value={value} />;
    })}
  </div>
);

export default StatsGrid;

import { Clock, Zap, Flame, TrendingUp } from "lucide-react";

interface RunStatCardProps {
  title: string;
  value: string;
  unit?: string;
  type: 'time' | 'pace' | 'calories' | 'elevation';
}

const RunStatCard = ({ title, value, unit, type }: RunStatCardProps) => {
  const getIcon = () => {
    switch (type) {
      case 'time':
        return <Clock className="h-4 w-4" />;
      case 'pace':
        return <Zap className="h-4 w-4" />;
      case 'calories':
        return <Flame className="h-4 w-4" />;
      case 'elevation':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-gradient-lime text-white p-4 rounded-2xl min-w-[200px]">
      <div className="text-sm font-medium opacity-90 mb-1">{title}</div>
      <div className="text-2xl font-bold mb-2">{value}</div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm opacity-80">
          {getIcon()}
          <span>{unit}</span>
        </div>
        <div className="text-right text-sm opacity-80">
          {type === 'time' && '44:58'}
          {type === 'pace' && "9'03\""}
          {type === 'calories' && '308'}
          {type === 'elevation' && '23 m'}
        </div>
      </div>
    </div>
  );
};

export default RunStatCard;
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RunCardProps {
  title: string;
  distance: string;
  calories: string;
  avatarSrc?: string;
  avatarFallback: string;
  variant: 'purple' | 'blue' | 'lime';
}

const RunCard = ({ title, distance, calories, avatarSrc, avatarFallback, variant }: RunCardProps) => {
  const getCardStyles = () => {
    switch (variant) {
      case 'purple':
        return 'bg-gradient-purple text-white';
      case 'blue':
        return 'bg-gradient-blue text-white';
      case 'lime':
        return 'bg-gradient-lime text-white';
      default:
        return 'bg-gradient-purple text-white';
    }
  };

  return (
    <div className={`${getCardStyles()} p-6 rounded-3xl shadow-lg transform hover:scale-105 transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium opacity-90">{title}</span>
        <Avatar className="w-12 h-12 border-2 border-white/20">
          <AvatarImage src={avatarSrc} />
          <AvatarFallback className="bg-white/20 text-white">{avatarFallback}</AvatarFallback>
        </Avatar>
      </div>
      
      <div className="space-y-1">
        <div className="text-3xl font-bold">{distance}</div>
        <div className="text-sm opacity-80">{calories}</div>
      </div>
    </div>
  );
};

export default RunCard;
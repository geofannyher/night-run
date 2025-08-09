import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaRunning } from "react-icons/fa";
interface RunCardProps {
  title: string;
  distance: string;
  calories?: string;
  avatarSrc?: string;
  variant: "purple" | "blue" | "lime";
}

const RunCard = ({
  title,
  distance,
  calories,
  avatarSrc,
  variant,
}: RunCardProps) => {
  const getCardStyles = () => {
    switch (variant) {
      case "purple":
        return "bg-gradient-purple text-white";
      case "blue":
        return "bg-gradient-blue text-white";
      case "lime":
        return "bg-gradient-lime text-white";
      default:
        return "bg-gradient-purple text-white";
    }
  };

  return (
    <div
      className={`${getCardStyles()} p-6 max-w-md  rounded-3xl shadow-lg transform hover:scale-105 transition-all duration-300`}
    >
      <div className="flex gap-2 items-center mb-4">
        <Avatar className="w-8 h-8 border-2 border-white/20 flex items-center justify-center">
          <FaRunning className="text-white" />
        </Avatar>
        <span className="text-sm italic font-semibold opacity-90">{title}</span>
      </div>

      <div className="space-y-1">
        <div className="text-3xl font-bold">{distance}</div>
        <div className="text-sm opacity-80">{calories}</div>
      </div>
    </div>
  );
};

export default RunCard;

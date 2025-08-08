import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialCardProps {
  quote: string;
  author: string;
  avatarSrc?: string;
  role?: string;
}

const TestimonialCard = ({ quote, author, avatarSrc, role = "REVIEWED BY" }: TestimonialCardProps) => {
  return (
    <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
      <p className="text-muted-foreground mb-6 leading-relaxed">
        "{quote}"
      </p>
      
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={avatarSrc} />
          <AvatarFallback>{author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-xs text-muted-foreground font-medium">{role}</p>
          <p className="font-semibold">{author}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
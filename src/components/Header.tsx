import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">S</span>
        </div>
        <span className="font-bold text-xl">SOUNDTRACK</span>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
          HOW IT WORKS
        </a>
        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
          FEATURES
        </a>
        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
          COMMUNITY
        </a>
        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
          PRICING
        </a>
      </nav>

      <div className="hidden md:flex items-center gap-4">
        <Button variant="ghost">LOGIN</Button>
        <Button variant="hero">SIGNUP</Button>
      </div>

      {/* Mobile Menu */}
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="h-5 w-5" />
      </Button>
    </header>
  );
};

export default Header;
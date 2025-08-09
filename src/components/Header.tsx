import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-black leading-tight">
          <span className="italic">Pandalungan Festival</span>
        </h1>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <Button variant="ghost">LOGIN</Button>
        <Button
          variant="default"
          className="rounded-sm bg-vibrant-lime hover:bg-vibrant-lime"
        >
          SIGNUP
        </Button>
      </div>

      {/* Mobile Menu */}
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="h-5 w-5" />
      </Button>
    </header>
  );
};

export default Header;

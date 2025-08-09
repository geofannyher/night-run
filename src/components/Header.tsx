import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-black leading-tight">
          <span className="italic">Night Run Kejaksaan</span>
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
    </header>
  );
};

export default Header;

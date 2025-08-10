import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header
      className="flex items-center justify-between p-6 max-w-7xl mx-auto"
      role="banner"
    >
      <div className="flex items-center gap-2">
        <div className="text-lg font-black leading-tight">
          <span className="italic">Night Run Kejaksaan</span>
        </div>
      </div>

      <nav className="flex items-center gap-4" aria-label="Main navigation">
        <Button
          variant="ghost"
          onClick={() => {
            navigate("/login-admin");
          }}
          aria-label="Login Admin"
        >
          LOGIN
        </Button>
        {/* <Button
          variant="default"
          className="rounded-sm bg-vibrant-lime hover:bg-vibrant-lime"
        >
          SIGNUP
        </Button> */}
      </nav>
    </header>
  );
};

export default Header;

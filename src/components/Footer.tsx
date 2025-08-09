import { Instagram, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white border-t border-white/10 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-bold text-white">
            Night Run Kejaksaan Negara Jember
          </h3>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-white/80">
            <a 
              href="https://instagram.com/adhyaksa.nightrun" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-vibrant-blue transition-colors text-sm sm:text-base"
            >
              <Instagram size={20} />
              <span className="hidden sm:inline">Adhyaksa.NightRun</span>
              <span className="sm:hidden">Instagram</span>
            </a>
            
            <a 
              href="https://tiktok.com/@adhyaksa.nightrun" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-vibrant-blue transition-colors text-sm sm:text-base"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
              <span className="hidden sm:inline">@adhyaksa.nightrun</span>
              <span className="sm:hidden">TikTok</span>
            </a>
            
            <a 
              href="https://wa.me/6285183360304" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-vibrant-blue transition-colors text-sm sm:text-base"
            >
              <Phone size={20} />
              <span className="hidden sm:inline">+62 851-8336-0304</span>
              <span className="sm:hidden">Admin</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
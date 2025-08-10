import { Phone } from "lucide-react";
import { FaInstagram, FaPhone, FaTiktok } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    {
      href: "https://instagram.com/adhyaksa.nightrun",
      icon: FaInstagram,
      label: "Adhyaksa.NightRun",
      shortLabel: "Instagram",
    },
    {
      href: "https://tiktok.com/@adhyaksa.nightrun",
      icon: FaTiktok,
      label: "@adhyaksa.nightrun",
      shortLabel: "TikTok",
    },
    {
      href: "https://wa.me/6285183360304",
      icon: FaPhone,
      label: "+62 851-8336-0304",
      shortLabel: "Admin",
    },
  ];

  return (
    <footer className="bg-muted/30" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top section: brand + link columns */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex h-10 w-10 rounded-full bg-vibrant-blue/20" />
              <h1 className="text-lg font-black leading-tight">
                <span className="italic">Night Run Kejaksaan</span>
              </h1>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Jl. Sudarman, Alun-alun Kabupaten Jember
              <br />
              Indonesia 68118
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" /> <span>+62 851-8336-0304</span>
            </div>

            {/* Social icons */}
            <div className="mt-4 flex items-center gap-3">
              {socialLinks.map((link, i) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background text-foreground ring-1 ring-border hover:bg-vibrant-blue hover:text-white transition-colors"
                    aria-label={link.shortLabel}
                    title={link.label}
                  >
                    {typeof IconComponent === "function" ? (
                      // For lucide icons we can pass className; inline svg ignores it
                      <IconComponent className="h-4 w-4" />
                    ) : null}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-muted mt-10 pt-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>© 2025 Night Run Kejaksaan Negeri Jember</div>
          <div className="flex items-center gap-4">
            <a href="#terms" className="hover:text-vibrant-blue">
              Terms
            </a>
            <a href="#privacy" className="hover:text-vibrant-blue">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

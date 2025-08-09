import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PricingSection = () => {
  const tiers = [
    {
      title: "5K",
      price: "IDR 160,000",
      image: "/placeholder.svg",
      inStock: true,
      link: "/register-running?category=5k",
    },
    {
      title: "10K",
      price: "IDR 180,000",
      image: "/placeholder.svg",
      inStock: true,
      link: "/register-running?category=10k",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl lg:text-5xl font-black italic text-center mb-12">
          REGISTRATION <span className="text-vibrant-lime">INFO & PRICING</span>
        </h2>

        {/* Product-style compact cards with stock overlay */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
          {tiers.map((tier) => (
            <div
              key={tier.title}
              className="w-64 h-96 rounded-lg ring-1 ring-border bg-background overflow-hidden relative flex flex-col"
            >
              <div className="relative h-64">
                <img
                  src={tier.image}
                  alt={`Night Run ${tier.title}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                {!tier.inStock && (
                  <div className="absolute inset-0 bg-white/85 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-black tracking-widest text-foreground/70">
                        SOLD
                      </div>
                      <div className="text-2xl font-black tracking-widest text-foreground/70 -mt-1">
                        OUT
                      </div>
                      <div className="mt-0.5 text-[10px] font-bold text-foreground">
                        OUT OF STOCK
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-2 flex-1 flex flex-col items-center text-center">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Night Run {tier.title}
                </div>
                <div className="mt-0.5 text-sm font-extrabold">
                  {tier.price}
                </div>
                <div className="mt-auto pt-1 w-full">
                  <Link to={tier.link}>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 px-3 text-xs bg-white text-vibrant-lime hover:bg-white/90 w-full"
                      disabled={!tier.inStock}
                    >
                      {tier.inStock ? "REGISTER NOW" : "SOLD OUT"}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const PricingSection = () => {
  // Fetch ticket stock data
  const {
    data: stockData,
    isLoading: isStockLoading,
    error: stockError,
  } = useQuery({
    queryKey: ["ticketStock"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          "https://event-be-one.vercel.app/peserta/count"
        );
        return response.data.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Failed to fetch ticket stock"
          );
        }
        throw new Error("Failed to fetch ticket stock");
      }
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const MAX_PARTICIPANTS = 500;

  const tiers = [
    {
      title: "5K",
      price: "IDR 160,000",
      image: "/banner.jpg",
      inStock: stockData ? stockData.count5 < MAX_PARTICIPANTS : true,
      link: "/register-running?category=5k",
      stockCount: stockData?.count5 || 0,
      remaining: stockData
        ? MAX_PARTICIPANTS - stockData.count5
        : MAX_PARTICIPANTS,
    },
    {
      title: "10K",
      price: "IDR 180,000",
      image: "/banner.jpg",
      inStock: stockData ? stockData.count10 < MAX_PARTICIPANTS : true,
      link: "/register-running?category=10k",
      stockCount: stockData?.count10 || 0,
      remaining: stockData
        ? MAX_PARTICIPANTS - stockData.count10
        : MAX_PARTICIPANTS,
    },
  ];

  const targetAudience = [
    "Pemula dan pelari berpengalaman",
    "Komunitas lari (antar lintas kota)",
    "Antar lintas komunitas",
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
              <div className="relative h-64 overflow-hidden">
                <img
                  src={tier.image}
                  alt={`Night Run ${tier.title}`}
                  className="h-full w-full object-cover block"
                  loading="lazy"
                />

                {/* Category overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                  <div className="absolute bottom-4 left-4">
                    <div className="text-white">
                      <div className="text-4xl font-black text-vibrant-lime -mt-1">
                        {tier.title}
                      </div>
                      <div className="text-xs uppercase tracking-wider opacity-90">
                        KEJAKSAAN NEGERI JEMBER
                      </div>
                    </div>
                  </div>
                </div>

                {!tier.inStock && (
                  <div className="absolute inset-0 bg-white/85 backdrop-blur-sm flex items-center justify-center z-10">
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

              <div className="p-4 flex-1 flex flex-col items-center text-center">
                <div className="text-lg font-black mb-2">{tier.price}</div>
                {stockData && tier.remaining <= 10 && tier.remaining > 0 && (
                  <div className="mt-1 px-2 py-0.5 bg-orange-100 rounded-full">
                    <div className="text-[10px] font-bold text-orange-700 uppercase tracking-wide">
                      Hampir Penuh!
                    </div>
                  </div>
                )}
                {stockError && (
                  <div className="text-[10px] text-red-500 mt-1">
                    Gagal memuat stok
                  </div>
                )}
                <div className="mt-auto pt-1 w-full">
                  <Link to={tier.link}>
                    <Button
                      size="sm"
                      variant="secondary"
                      className={`h-8 px-3 text-xs w-full ${
                        tier.inStock
                          ? "bg-white text-vibrant-lime hover:bg-white/90"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={!tier.inStock || isStockLoading}
                    >
                      {isStockLoading
                        ? "MEMUAT..."
                        : tier.inStock
                        ? "REGISTER NOW"
                        : "SOLD OUT"}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Target Audience - centered pills */}
        {/* <div className="mt-8 max-w-3xl mx-auto">
          <div className="p-6 bg-muted/30 rounded-2xl text-center">
            <h3 className="text-xl font-bold mb-3">Sasaran Peserta</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {targetAudience.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full bg-background ring-1 ring-border text-sm text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default PricingSection;

import Header from "@/components/Header";
import NightRunDetailSection from "@/components/NightRunDetailSection";
import PricingSection from "@/components/PricingSection";
import TimelineSection from "@/components/TimelineSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import ActivitiesSection from "@/components/ActivitiesSection";
import EntertainmentSection from "@/components/EntertainmentSection";
import RegistrationDetailsSection from "@/components/RegistrationDetailsSection";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12" role="main">
        <div className="grid lg:grid-cols-2 justify-center gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="relative">
              {/* Main Heading */}
              <h1
                className="text-5xl lg:text-7xl font-black leading-tight z-20 text-left"
                itemProp="name"
              >
                <span className="italic">LET'S RUN</span>
                <br />
                <span className="italic">WITH NIGHT RUN</span>
                <br />
                <span className="italic">KEJAKSAAN</span>
                <br />
                <span className="italic text-vibrant-lime">2025</span>
              </h1>
            </div>

            {/* Divider + Review Row to match reference */}
            <div className="w-full">
              <div className="border-t border-muted mb-6" />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <p
                  className="text-lg italic font-semibold text-muted-foreground max-w-xl"
                  itemProp="description"
                >
                  "Raih kesempatan memenangkan total hadiah jutaan rupiah dan
                  berbagai hadiah menarik lainnya dalam Night Run 2025"
                </p>
                {/* <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <Avatar className="h-8 w-8 border border-background">
                      <AvatarImage src="" alt="Bryan Wise" />
                      <AvatarFallback>BW</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">
                    Reviewed by
                    <div className="text-foreground font-semibold normal-case tracking-normal">
                      Bryan Wise
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="relative">
            <Carousel 
              className="w-full"
              plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}
            >
              <CarouselContent>
                <CarouselItem>
                  <div className="relative overflow-hidden">
                    <img
                      src="/banner.jpg"
                      alt="Night Run Kejaksaan Negeri Jember 2025 - Event lari malam di Alun-alun Jember"
                      className="w-full h-full object-cover rounded-sm"
                      itemProp="image"
                    />
                    {/* Frame highlight effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent pointer-events-none rounded-sm" />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative overflow-hidden">
                    <img
                      src="/anoucment.jpg"
                      alt="Pengumuman Night Run Kejaksaan Negeri Jember 2025"
                      className="w-full h-full object-cover rounded-sm"
                    />
                    {/* Frame highlight effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent pointer-events-none rounded-sm" />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        </div>

        {/* Sponsors strip */}
        <section className="my-14" aria-label="Sponsors">
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs uppercase font-semibold tracking-wider text-muted-foreground">
              Sponsored by
            </span>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              <img
                src="/beaLogo.png"
                alt="BEA"
                className="h-16 sm:h-20 w-auto object-contain"
                loading="lazy"
              />
              <img
                src="/jemberkabLogo.png"
                alt="Jember Kabupaten"
                className="h-16 sm:h-20 w-auto object-contain"
                loading="lazy"
              />
              <img
                src="/satpolLogo.png"
                alt="Satpol Logo"
                className="h-16 sm:h-20 w-auto object-contain"
                loading="lazy"
              />
              <img
                src="/kejaksaanLogo.png"
                alt="Kejaksaan Negeri Jember"
                className="h-16 sm:h-20 w-auto object-contain"
                loading="lazy"
              />
              <img
                src="/rokokLogo.png"
                alt="Rokok Ilegal"
                className="h-16 sm:h-20 w-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Night Run Detail Section */}
      <NightRunDetailSection />

      {/* Event Sections */}
      {/* <RewardsSection /> */}
      {/* <EventDetailsSection /> */}
      <RegistrationDetailsSection />
      <ActivitiesSection />
      <EntertainmentSection />
      <PricingSection />
      <TimelineSection />
      {/* <GatesPreviewSection /> */}
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;

import Header from "@/components/Header";
import NightRunDetailSection from "@/components/NightRunDetailSection";
import PricingSection from "@/components/PricingSection";
import TimelineSection from "@/components/TimelineSection";
import GatesPreviewSection from "@/components/GatesPreviewSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import ActivitiesSection from "@/components/ActivitiesSection";
import EntertainmentSection from "@/components/EntertainmentSection";
import RegistrationDetailsSection from "@/components/RegistrationDetailsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 justify-center gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="relative">
              {/* Floating Run Cards */}
              {/* <div className="absolute -top-6 sm:-top-8 right-0 z-10 origin-top-right">
                <div className="scale-75 sm:scale-100">
                  <RunCard
                    title="Race Individual"
                    distance="5KM"
                    variant="blue"
                  />
                </div>
              </div>

              <div className="absolute top-12 sm:top-16 -left-4 sm:-left-8 z-10 origin-top-left">
                <div className="scale-75 sm:scale-100">
                  <RunCard
                    title="Monday Run"
                    distance="6.27K"
                    calories="398 Calories"
                    variant="blue"
                  />
                </div>
              </div> */}

              {/* Main Heading */}
              <h1 className="text-5xl lg:text-7xl font-black leading-tight z-20 text-left">
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
                <p className="text-lg italic font-semibold text-muted-foreground max-w-xl">
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
            <img
              src="/banner.jpg"
              alt="Group of runners enjoying their morning run together"
              className="w-full h-full object-cover rounded-3xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl" />
          </div>
        </div>

        {/* Sponsors strip */}
        <div className="my-14">
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs uppercase font-semibold tracking-wider text-muted-foreground">
              Sponsored by
            </span>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              <img
                src="/sponsors/img1.png"
                alt="Sayap Jatim"
                className="h-10 sm:h-12 w-auto object-contain"
                loading="lazy"
              />
              <img
                src="/sponsors/img2.png"
                alt="Pandalungan Festival"
                className="h-10 sm:h-12 w-auto object-contain"
                loading="lazy"
              />
              <img
                src="/sponsors/img3.png"
                alt="Bank Jatim"
                className="h-10 sm:h-12 w-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
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
      <GatesPreviewSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;

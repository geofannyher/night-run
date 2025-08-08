import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import RunCard from "@/components/RunCard";
import TestimonialCard from "@/components/TestimonialCard";
import RunStatCard from "@/components/RunStatCard";
import runningGroupImage from "@/assets/running-group.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="relative">
              {/* Floating Run Cards */}
              <div className="absolute -top-8 right-0 z-10">
                <RunCard
                  title="Sunday Run"
                  distance="10.54K"
                  calories="637 Calories"
                  avatarFallback="JD"
                  variant="purple"
                />
              </div>
              
              <div className="absolute top-16 -left-8 z-10">
                <RunCard
                  title="Monday Run"
                  distance="6.27K"
                  calories="398 Calories"
                  avatarFallback="AS"
                  variant="blue"
                />
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                <span className="italic">LET'S RUN</span><br />
                <span className="italic">TOGETHER</span><br />
                <span className="italic">FOR MORE FUN</span><br />
                <span className="italic text-vibrant-blue">RUNNING</span>
              </h1>
            </div>

            {/* Testimonial */}
            <div className="max-w-md">
              <TestimonialCard
                quote="Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla."
                author="Bryan Wise"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            {/* Secondary Heading */}
            <div className="text-right">
              <h2 className="text-4xl lg:text-5xl font-black italic leading-tight">
                AN APP THAT<br />
                HELP YOU TO<br />
                ENJOY YOUR<br />
                <span className="text-vibrant-blue">RUNNING</span><br />
                ACTIVITY
              </h2>
              <Button variant="download" size="lg" className="mt-6">
                DOWNLOAD APP
              </Button>
            </div>

            {/* Stats Card */}
            <div className="flex justify-end">
              <RunStatCard
                title="Morning Run"
                value="4.91"
                unit="Kilometers"
                type="time"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-end">
          {/* Left Bottom */}
          <div>
            <h3 className="text-3xl lg:text-4xl font-black italic mb-6">
              AN APP THAT HELP<br />
              YOU TO ENJOY YOUR<br />
              <span className="text-vibrant-blue">RUNNING ACTIVITY</span>
            </h3>
            <Button variant="download" size="lg">
              DOWNLOAD APP
            </Button>
          </div>

          {/* Right Bottom - Hero Image */}
          <div className="relative">
            <img 
              src={runningGroupImage} 
              alt="Group of runners enjoying their morning run together" 
              className="w-full h-64 lg:h-80 object-cover rounded-3xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
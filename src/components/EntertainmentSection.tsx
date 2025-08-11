import { Mic, Music2, Award } from "lucide-react";

const EntertainmentSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl lg:text-5xl font-black italic text-center mb-12">
          FESTIVAL <span className="text-vibrant-lime">ENTERTAINMENT</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: bullet points */}
          <div>
            <div className="p-6 bg-background rounded-2xl">
              <h3 className="text-4xl font-bold mb-4">What’s on Stage</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Mic className="w-5 h-5 mt-1 text-vibrant-lime" />
                  <span className="text-foreground text-lg font-semibold">
                    Master of Ceremony
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Music2 className="w-5 h-5 mt-1 text-vibrant-lime" />
                  <span className="text-foreground text-lg font-semibold">
                    Local Artist
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="w-5 h-5 mt-1 text-vibrant-lime" />
                  <span className="text-foreground text-lg font-semibold">
                    Awarding Moment
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: single collage container */}
          <div>
            <div className="bg-background rounded-3xl overflow-hidden">
              <div className="grid grid-cols-2 gap-2 p-2 sm:p-3">
                <img
                  src="/artistLogo.png"
                  alt="Artist 3"
                  className="h-auto w-full object-cover rounded-xl"
                />
                {/* <img
                  src="/placeholder.svg"
                  alt="Artist 1"
                  className="h-40 w-full object-cover rounded-xl"
                /> */}
                {/* <img
                  src="/placeholder.svg"
                  alt="Artist 2"
                  className="h-40 w-full object-cover rounded-xl"
                />
                <img
                  src="/placeholder.svg"
                  alt="Artist 3"
                  className="h-40 w-full object-cover rounded-xl"
                />
                <img
                  src="/placeholder.svg"
                  alt="Artist 4"
                  className="h-40 w-full object-cover rounded-xl"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EntertainmentSection;

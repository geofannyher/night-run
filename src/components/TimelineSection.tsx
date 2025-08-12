import { Calendar, Package, Play } from "lucide-react";

const TimelineSection = () => {
  const timeline = [
    {
      icon: Calendar,
      title: "Pendaftaran",
      date: "1 Agustus - 5 September 2025",
      description: "Periode pendaftaran awal",
    },
    {
      icon: Package,
      title: "Pengumpulan Paket Lari",
      date: "4-5 September 2025",
      description: "Kumpulkan kit lari dan jersey Anda",
    },
    {
      icon: Play,
      title: "Hari Acara",
      date: "6 September 2025",
      description: "Acara lari utama dimulai pukul 7:00 PM WIB",
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl lg:text-5xl font-black italic text-center mb-12">
          EVENT <span className="text-vibrant-lime">TIMELINE</span>
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-vibrant-lime/30 hidden md:block"></div>

          <div className="space-y-8">
            {timeline.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`w-full md:w-5/12 ${
                      index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                    }`}
                  >
                    <div className="bg-background p-6 rounded-2xl shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-vibrant-lime/10 rounded-full flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-vibrant-lime" />
                        </div>
                        <h3 className="text-xl font-bold">{item.title}</h3>
                      </div>
                      <p className="text-lg font-semibold text-vibrant-lime mb-2">
                        {item.date}
                      </p>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-vibrant-lime rounded-full border-4 border-background hidden md:block"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;

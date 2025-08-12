import { Calendar, MapPin } from "lucide-react";

const NightRunDetailSection = () => {
  const highlights = [
    {
      icon: MapPin,
      title: "Lokasi",
      description: "Jl. Sudirman (Alun - Alun Jember, Depan Pemkab)",
    },
    {
      icon: Calendar,
      title: "Jam & Tanggal Acara",
      description: "Sabtu, 6 September 2025 - 19:00 WIB",
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - What is Night Run */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-black italic">
              WHAT IS <span className="text-vibrant-lime">NIGHT RUN</span>?
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p className="text-base leading-relaxed">
                Dalam rangka ikut menyambut Hari Kejaksaan Nasional tahun 2025
                yang ke-79 tahun, Kejaksaan Negeri Jember ikut menyemarakkan
                dengan diadakannya event Night Run.
              </p>

              <p className="text-base leading-relaxed">
                Kegiatan ini diharapkan dapat menumbuhkan semangat hidup sehat
                dan mempererat rasa kebersamaan. Night Run Kejaksaan Negeri
                Jember akan diselenggarakan pada hari Sabtu, tanggal 6 September
                2025 bertempat di Jl. Sudarman, Alun-alun Kabupaten Jember.
              </p>
            </div>
          </div>

          {/* Right Content - Key Highlights */}
          <div className="grid md:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <div key={index} className="p-6 bg-background rounded-2xl">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-vibrant-lime/10 rounded-full mb-4">
                    <IconComponent className="w-6 h-6 text-vibrant-lime" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{highlight.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NightRunDetailSection;

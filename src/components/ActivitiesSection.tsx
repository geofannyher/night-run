import { Store, Dice5, Camera, CheckCircle2 } from "lucide-react";

type ActivityItem = {
  icon: React.ElementType;
  title: string;
  points: string[];
};

const ActivitiesSection = () => {
  const activities: ActivityItem[] = [
    {
      icon: Store,
      title: "UMKM Exhibition",
      points: [
        "UMKM sebanyak 10 partisipan (Food & Beverage)",
        "UMKM binaan dinas terkait (5 Diskop & 5 Disperindag)",
        "Sponsorship",
      ],
    },
    {
      icon: Dice5,
      title: "Fun Games",
      points: [
        "Doorprize (Kupon hadiah, mekanisme pengundian)",
        "Spin Wheel Lucky",
        "Hadiah utama dan hadiah lainnya",
      ],
    },
    {
      icon: Camera,
      title: "Photobooth",
      points: [
        "Photobooth 360",
        "Konten yang unik",
        "Keterlibatan audiens",
        "Pengalaman yang menarik",
      ],
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl lg:text-5xl font-black italic text-center mb-12">
          FESTIVAL <span className="text-vibrant-lime">ACTIVITIES</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {activities.map((act, idx) => {
            const Icon = act.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-background rounded-2xl shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-vibrant-lime/10 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-vibrant-lime" />
                  </div>
                  <h3 className="text-xl font-bold">{act.title}</h3>
                </div>

                <ul className="space-y-3 text-muted-foreground">
                  {act.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-1 text-vibrant-lime" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;

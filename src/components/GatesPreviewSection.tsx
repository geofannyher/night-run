import { AspectRatio } from "@/components/ui/aspect-ratio";

const GatesPreviewSection = () => {
  const gates = [
    { src: "/placeholder.svg", title: "Gate A" },
    { src: "/placeholder.svg", title: "Gate B" },
    { src: "/placeholder.svg", title: "Gate C" },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl lg:text-5xl font-black italic text-center mb-12">
          GATES <span className="text-vibrant-lime">PREVIEW</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {gates.map((gate, idx) => (
            <div key={idx} className="group">
              <div className="rounded-2xl overflow-hidden bg-muted/30 ring-1 ring-border">
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={gate.src}
                    alt={`${gate.title} preview`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </AspectRatio>
              </div>
              <div className="mt-3 text-center">
                <span className="text-sm font-semibold text-muted-foreground">
                  {gate.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GatesPreviewSection;

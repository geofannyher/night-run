import { Calendar, MapPin, Clock, Route } from "lucide-react";

const EventDetailsSection = () => {
  const details = [
    {
      icon: Calendar,
      label: "Event Date",
      value: "July 4, 2025"
    },
    {
      icon: MapPin,
      label: "Location", 
      value: "Jember Town Square"
    },
    {
      icon: Clock,
      label: "Start Time",
      value: "7:00 PM WIB"
    },
    {
      icon: Route,
      label: "Distance",
      value: "5 KM with 1 water station"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl lg:text-5xl font-black italic text-center mb-12">
          EVENT <span className="text-vibrant-blue">DETAILS</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {details.map((detail, index) => {
            const IconComponent = detail.icon;
            return (
              <div key={index} className="text-center p-6 bg-background rounded-2xl shadow-sm">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-vibrant-blue/10 rounded-full mb-4">
                  <IconComponent className="w-8 h-8 text-vibrant-blue" />
                </div>
                <h3 className="text-lg font-bold mb-2">{detail.label}</h3>
                <p className="text-muted-foreground">{detail.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventDetailsSection;
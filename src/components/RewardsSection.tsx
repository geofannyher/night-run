import { Trophy, Medal, Award } from "lucide-react";

const RewardsSection = () => {
  const rewards = [
    {
      place: "1st Place",
      icon: Trophy,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
      prize: "IDR 2,000,000"
    },
    {
      place: "2nd Place", 
      icon: Medal,
      color: "text-gray-500",
      bgColor: "bg-gray-100",
      prize: "IDR 1,500,000"
    },
    {
      place: "3rd Place",
      icon: Award,
      color: "text-amber-600",
      bgColor: "bg-amber-100", 
      prize: "IDR 1,000,000"
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl lg:text-5xl font-black italic text-center mb-12">
          <span className="text-vibrant-blue">REWARDS</span> & PRIZES
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {rewards.map((reward, index) => {
            const IconComponent = reward.icon;
            return (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${reward.bgColor} mb-4`}>
                  <IconComponent className={`w-10 h-10 ${reward.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-2">{reward.place}</h3>
                <p className="text-xl font-semibold text-vibrant-blue">{reward.prize}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RewardsSection;
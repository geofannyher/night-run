import { Button } from "@/components/ui/button";
import { Gift, Shirt, Hash } from "lucide-react";
import { Link } from "react-router-dom";

const PricingSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl lg:text-5xl font-black italic text-center mb-12">
          REGISTRATION <span className="text-vibrant-blue">INFO</span>
        </h2>
        
        <div className="bg-gradient-to-br from-vibrant-blue to-electric-purple rounded-3xl p-8 text-white">
          <div className="text-center mb-8">
            <div className="text-6xl font-black mb-2">IDR 150,000</div>
            <div className="text-xl opacity-90">Per Participant</div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5" />
                Registration Period
              </h3>
              <p className="text-lg opacity-90">June 16 – 30, 2025</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Shirt className="w-5 h-5" />
                Facilities Included
              </h3>
              <ul className="space-y-2 opacity-90">
                <li>• Exclusive Jersey</li>
                <li>• Race Number</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/register-running">
              <Button size="lg" variant="secondary" className="bg-white text-vibrant-blue hover:bg-white/90">
                REGISTER NOW
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
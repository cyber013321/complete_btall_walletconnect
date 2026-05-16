import { ArrowRight, Zap, Shield, Globe, Cpu, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PlatformSectionProps {
  scrollToSection?: (sectionId: string) => void;
}

export default function PlatformSection({ scrollToSection }: PlatformSectionProps) {
  const platformCards = [
    {
      title: "Secure Wallet Connection",
      description: "Connect your wallet securely and manage multiple blockchain networks with ease.",
      buttonText: "Get Started",
      icon: Shield
    },
    {
      title: "Multi-Chain Support",
      description: "Trade across Ethereum, BSC, Polygon, and Avalanche networks seamlessly in one interface.",
      buttonText: "Explore Networks",
      icon: Globe
    },
    {
      title: "Token Management",
      description: "Merge, swap, synchronize and optimize your token holdings with advanced portfolio management tools.",
      buttonText: "Manage Tokens",
      icon: Cpu
    },
    {
      title: "Advanced Analytics",
      description: "Track performance, analyze trends, and make informed decisions with real-time data insights.",
      buttonText: "View Analytics",
      icon: BarChart3
    }
  ];

  return (
    <section id="platform" className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 py-20 px-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-6xl font-black mb-6">Unified <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">Protocol</span></h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-black">
            The next generation of decentralized finance management.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {platformCards.map((card, index) => (
            <div 
              key={index}
              className="group relative animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative rounded-3xl border border-primary/20 bg-card/50 backdrop-blur-xl p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30 group-hover:scale-105">
                <div className="absolute top-10 right-10 text-primary opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                  <ArrowRight size={32} />
                </div>

                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:from-blue-500/40 group-hover:to-purple-500/40 transition-all">
                  <card.icon size={28} />
                </div>
                
                <h3 className="text-3xl font-black mb-4 tracking-tight group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-lg mb-10 leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors">
                  {card.description}
                </p>
                <button 
                  onClick={() => scrollToSection?.('web3-merger')}
                  className="premium-button group/btn relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-2">
                    <Zap size={18} />
                    {card.buttonText}
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

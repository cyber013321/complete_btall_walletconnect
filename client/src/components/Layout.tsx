import { Zap } from "lucide-react";
import BonilaSection from "./BonilaSection";
import { ThemeToggle } from "./theme-toggle";
import HeroImage from "../image/IMG_1843.jpeg";

export default function Layout() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-background text-foreground overflow-x-hidden selection:bg-primary/20">
      {/* Main Content */}
      <div className="min-h-screen transition-all duration-300 flex flex-col items-center justify-center w-full">
        {/* Header */}
        <header className="w-full sticky top-0 z-30">
          <div className="relative">
            {/* Background with glass effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/80 backdrop-blur-2xl border-b border-white/5"></div>
            
            {/* Animated gradient line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            
            {/* Content */}
            <div className="relative px-4 sm:px-8 lg:px-12 py-5 sm:py-6 flex justify-between items-center gap-6">
              {/* Premium Logo & Brand */}
              <div className="flex items-center gap-3 sm:gap-4 group flex-1 min-w-0">
                {/* Logo with premium styling */}
                <div className="flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-white/20 transition-all duration-300 backdrop-blur-xl bg-white/5">
                    <img src={HeroImage} alt="ExplicitConnect" className="w-full h-full object-cover" />
                  </div>
                </div>
                
                {/* Brand text */}
                <div className="flex flex-col gap-1 min-w-0">
                  <h1 className="text-lg sm:text-2xl lg:text-3xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-pink-400 transition-all duration-300 truncate">
                    ExplicitConnect
                  </h1>
                  <div className="flex items-center gap-2">
                    <div className="h-px w-4 sm:w-6 bg-gradient-to-r from-primary/50 to-transparent"></div>
                    <p className="text-xs sm:text-sm font-semibold text-primary/70 uppercase tracking-widest whitespace-nowrap">Web3 Protocol</p>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                <ThemeToggle />
                <button
                  onClick={() => scrollToSection('bonita')}
                  className="premium-button px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold flex items-center gap-2 group/btn"
                >
                  <Zap size={16} className="group-hover/btn:rotate-12 transition-transform duration-300" />
                  <span className="hidden sm:inline">Connect Wallet</span>
                  <span className="sm:hidden">Connect</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Sections */}
        <div className="w-full">
          <BonilaSection />
        </div>
      </div>
    </div>
  );
}

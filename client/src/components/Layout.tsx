import { useState, useEffect } from "react";
import { Menu, Zap, X, Gem } from "lucide-react";
import BonilaSection from "./BonilaSection";
import { ThemeToggle } from "./theme-toggle";
import HeroImage from "../image/IMG_1843.jpeg";

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("bonita");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      if (window.innerWidth <= 768) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  useEffect(() => {
    const sections = ['bonita', 'footer'];
    // Update sections array
  }, []);

  return (
    <div className="bg-background text-foreground overflow-x-hidden selection:bg-primary/20">
      {/* Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-5 left-5 z-50 bg-white text-dark-navy border border-border p-3 rounded-2xl shadow-xl"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-screen w-72 bg-card border-r border-border/50 z-40 transform transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:-translate-x-full'}`}>
        {/* Sidebar Header */}
        <div className="p-8 border-b border-border/50 flex items-center justify-between bg-gradient-to-r from-primary/10 to-purple-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-lg shadow-primary/30 border-2 border-blue-500/50">
              <img src={HeroImage} alt="ExplicitConnect" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-lg font-black tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ExplicitConnect</h2>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden text-muted-foreground hover:text-foreground p-2 rounded-xl hover:bg-accent transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <button
            onClick={() => scrollToSection('bonita')}
            className={`nav-item w-full ${activeSection === 'bonita' ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:text-white' : ''}`}
          >
            <Gem size={18} />
            Bonita
          </button>
        </nav>

        {/* Account Section */}
        <div className="p-3 sm:p-6 mt-4 sm:mt-8">
          <h3 className="text-xs sm:text-sm font-black text-muted-foreground mb-3 sm:mb-4 uppercase tracking-widest">ACCOUNTS</h3>
          <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl cursor-pointer mb-2 bg-accent/30 hover:bg-accent/50 transition-all duration-300 border border-border/50">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-black text-xs shadow-sm">
              A1
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-black truncate text-foreground">Account 1</div>
              <div className="text-xs text-muted-foreground font-black">0.00 ETH</div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl cursor-pointer mb-2 bg-accent/30 hover:bg-accent/50 transition-all duration-300 border border-border/50">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-black text-xs shadow-sm">
              A2
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-black truncate text-foreground">Account 2</div>
              <div className="text-xs text-muted-foreground font-black">0.00 BNB</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="min-h-screen transition-all duration-300 flex flex-col items-center justify-center w-full">
        {/* Header */}
        <header className="bg-gradient-to-r from-background via-primary/5 to-background/80 backdrop-blur-xl border-b border-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 sticky top-0 z-30 w-full shadow-xl shadow-primary/10">
          <div className="px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center gap-2 sm:gap-4">
            {/* Logo & Brand */}
            <div className="flex items-center gap-2 sm:gap-3 group min-w-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg shadow-primary/40 group-hover:shadow-primary/60 transition-all duration-300 border-2 border-blue-500/50">
                <img src={HeroImage} alt="ExplicitConnect" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col gap-0 min-w-0">
                <h1 className="text-base sm:text-xl font-black tracking-tighter bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent truncate">ExplicitConnect</h1>
                <p className="text-xs font-black text-primary uppercase tracking-widest leading-none">Web3 Protocol</p>
              </div>
            </div>
            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <ThemeToggle />
              <button
                onClick={() => scrollToSection('bonita')}
                className="premium-button px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm flex"
              >
                <Zap size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Connect Wallet</span>
                <span className="sm:hidden">Connect</span>
              </button>
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

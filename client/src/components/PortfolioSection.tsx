import { Plus, Send, Bookmark, DollarSign, ArrowUpDown, Star, Circle } from "lucide-react";

interface PortfolioSectionProps {
  scrollToSection?: (sectionId: string) => void;
}

export default function PortfolioSection({ scrollToSection }: PortfolioSectionProps) {
  const quickActions = [
    {
      title: "Buy Crypto",
      description: "Purchase crypto with your debit card or bank account",
      icon: DollarSign,
    },
    {
      title: "Swap Tokens",
      description: "Exchange tokens instantly across networks",
      icon: ArrowUpDown,
    },
    {
      title: "Earn Rewards",
      description: "Stake your tokens and earn passive income",
      icon: Star,
    },
    {
      title: "Spend Crypto",
      description: "Use your crypto for everyday purchases",
      icon: Circle,
    }
  ];

  return (
    <section id="portfolio" className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 py-20 px-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-6xl font-black mb-6">Portfolio <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">Intelligence</span></h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-bold">
            Real-time insights into your cross-chain asset distribution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-in">
          <div className="group rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-background backdrop-blur-xl p-8 shadow-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:border-primary/50">
            <div className="text-4xl font-black mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-cyan-500 group-hover:bg-clip-text transition-all">$0.00</div>
            <div className="text-sm font-black uppercase tracking-wider text-muted-foreground">Total Net Value</div>
          </div>
          <div className="group rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-background backdrop-blur-xl p-8 shadow-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:border-primary/50">
            <div className="text-4xl font-black text-green-500 mb-2 group-hover:animate-pulse">+0.00%</div>
            <div className="text-sm font-black uppercase tracking-wider text-muted-foreground">24h Trajectory</div>
          </div>
          <div className="group rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-background backdrop-blur-xl p-8 shadow-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:border-primary/50">
            <div className="text-4xl font-black text-blue-500 mb-2 group-hover:animate-pulse">0</div>
            <div className="text-sm font-black uppercase tracking-wider text-muted-foreground">Active Protocols</div>
          </div>
        </div>

        <div className="rounded-[2.5rem] p-12 mb-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl relative overflow-hidden group animate-scale-in">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="text-5xl sm:text-7xl font-black tracking-tighter mb-4 group-hover:animate-glow">0.00 <span className="opacity-70">ETH</span></div>
            <div className="text-xl opacity-90 mb-12 font-black">Equiv: $0.00 USD</div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection?.('web3-merger')}
                className="h-14 px-10 bg-white text-primary font-black rounded-2xl hover:bg-opacity-90 hover:shadow-lg hover:shadow-white/20 transition-all active:scale-95 flex items-center justify-center gap-2 group/btn relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover/btn:opacity-20 transition-opacity"></div>
                <Plus size={20} />
                Acquire
              </button>
              <button 
                onClick={() => scrollToSection?.('web3-merger')}
                className="h-14 px-10 bg-white/20 backdrop-blur-md text-white font-black rounded-2xl hover:bg-white/30 hover:shadow-lg hover:shadow-white/20 transition-all active:scale-95 flex items-center justify-center gap-2 group/btn relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-30 transition-opacity"></div>
                <Send size={20} />
                Transmit
              </button>
              <button 
                onClick={() => scrollToSection?.('web3-merger')}
                className="h-14 px-10 bg-white/20 backdrop-blur-md text-white font-black rounded-2xl hover:bg-white/30 hover:shadow-lg hover:shadow-white/20 transition-all active:scale-95 flex items-center justify-center gap-2 group/btn relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-30 transition-opacity"></div>
                <Bookmark size={20} />
                Stake
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {quickActions.map((action, index) => (
            <div 
              key={index}
              onClick={() => scrollToSection?.('web3-merger')}
              className="group rounded-3xl border border-primary/20 bg-card/50 backdrop-blur-xl p-8 text-center cursor-pointer hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:border-primary/50 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-125 group-hover:from-blue-500/40 group-hover:to-purple-500/40 transition-all">
                <action.icon size={28} />
              </div>
              <h3 className="text-xl font-black mb-2 group-hover:text-primary transition-colors">{action.title}</h3>
              <p className="text-sm font-bold text-muted-foreground group-hover:text-foreground/70 transition-colors">{action.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AnalyticsSectionProps {
  scrollToSection?: (sectionId: string) => void;
}

export default function AnalyticsSection({ scrollToSection }: AnalyticsSectionProps) {
  return (
    <section id="analytics" className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 py-20 px-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-6xl font-black mb-6">Market <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">Analytics</span></h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-black">
            Strategic insights powered by neural performance tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="group animate-fade-in-left">
            <div className="rounded-3xl border border-primary/20 bg-card/50 backdrop-blur-xl p-8 shadow-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
              <h3 className="text-xl font-black mb-6 group-hover:text-primary transition-colors">Portfolio Trajectory</h3>
              <div className="h-64 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-2xl flex items-center justify-center relative overflow-hidden border border-primary/20 group-hover:border-primary/50 transition-colors">
                <div className="text-center relative z-10 p-8">
                  <div className="text-6xl mb-6 group-hover:animate-bounce">📈</div>
                  <div className="text-lg font-black uppercase tracking-wider text-primary">Awaiting Synchronization</div>
                  <p className="text-sm font-black mt-2 uppercase tracking-widest text-muted-foreground">Establish link to reveal metrics</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 animate-fade-in-right">
            <div className="group">
              <div className="rounded-3xl border border-primary/20 bg-card/50 backdrop-blur-xl p-8 shadow-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                <h4 className="text-lg font-black mb-6 uppercase tracking-widest text-primary group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-pink-500 group-hover:bg-clip-text transition-all">Growth Metrics</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-primary/10 group-hover:border-primary/30 transition-colors">
                    <span className="text-muted-foreground font-black">Aggregate Yield</span>
                    <span className="text-green-500 font-black">+0.00%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-primary/10 group-hover:border-primary/30 transition-colors">
                    <span className="text-muted-foreground font-black">Prime Asset</span>
                    <span className="font-black">N/A</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-primary/10 group-hover:border-primary/30 transition-colors">
                    <span className="text-muted-foreground font-black">Allocation Alpha</span>
                    <span className="text-blue-500 font-black">0.00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="rounded-3xl border border-primary/20 bg-card/50 backdrop-blur-xl p-8 shadow-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                <h4 className="text-lg font-black mb-6 uppercase tracking-widest text-primary group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-pink-500 group-hover:bg-clip-text transition-all">Market Pulse</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-primary/10 group-hover:border-primary/30 transition-colors">
                    <span className="text-muted-foreground font-black">Global Market Cap</span>
                    <span className="font-black">$2.1T</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-primary/10 group-hover:border-primary/30 transition-colors">
                    <span className="text-muted-foreground font-black">24h Momentum</span>
                    <span className="font-black">$89.2B</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-primary/10 group-hover:border-primary/30 transition-colors">
                    <span className="text-muted-foreground font-black">Bitcoin Dominance</span>
                    <span className="font-black">42.8%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="rounded-3xl border border-primary/20 bg-card/50 backdrop-blur-xl p-8 shadow-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group-hover:scale-105">
              <h4 className="text-lg font-black mb-6">TX Registry</h4>
              <div className="text-center py-8">
                <div className="text-5xl mb-4 opacity-20 group-hover:opacity-100 group-hover:animate-float transition-all">📜</div>
                <p className="font-black uppercase tracking-widest text-xs text-muted-foreground">No entries indexed</p>
              </div>
            </div>
          </div>
          
          <div className="group animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="rounded-3xl border border-primary/20 bg-card/50 backdrop-blur-xl p-8 shadow-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group-hover:scale-105">
              <h4 className="text-lg font-black mb-6">Gas Oracle</h4>
              <div className="space-y-4 text-sm font-black tracking-tight">
                <div className="flex justify-between py-2 border-b border-primary/10 group-hover:border-primary/30 transition-colors">
                  <span className="text-muted-foreground">Ethereum</span>
                  <span className="text-blue-500">25 GWEI</span>
                </div>
                <div className="flex justify-between py-2 border-b border-primary/10 group-hover:border-primary/30 transition-colors">
                  <span className="text-muted-foreground">BNB Chain</span>
                  <span className="text-green-500">5 GWEI</span>
                </div>
                <div className="flex justify-between py-2 border-b border-primary/10 group-hover:border-primary/30 transition-colors">
                  <span className="text-muted-foreground">Polygon</span>
                  <span className="text-purple-500">30 GWEI</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="group animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="rounded-3xl border border-primary/20 bg-card/50 backdrop-blur-xl p-8 shadow-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group-hover:scale-105">
              <h4 className="text-lg font-black mb-6">Yield Vaults</h4>
              <div className="text-center py-8">
                <div className="text-5xl mb-4 opacity-20 group-hover:opacity-100 group-hover:animate-float transition-all">🏦</div>
              <p className="font-black uppercase tracking-widest text-xs text-muted-foreground">No vaults active</p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

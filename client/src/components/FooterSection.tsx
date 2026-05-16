import { Github, Twitter, MessageCircle, Mail, Globe, Shield, Lock, FileText, ExternalLink, ShieldCheck } from "lucide-react";

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Web3 Dashboard", href: "#web3-merger" },
        { name: "Portfolio", href: "#portfolio" },
        { name: "Analytics", href: "#analytics" },
        { name: "Platform", href: "#platform" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "API Reference", href: "#" },
        { name: "Community", href: "#" },
        { name: "Security Audit", href: "#" }
      ]
    },
    {
      title: "Connect",
      links: [
        { name: "Twitter", href: "#", icon: Twitter },
        { name: "Discord", href: "#", icon: MessageCircle },
        { name: "GitHub", href: "#", icon: Github },
        { name: "Email", href: "#", icon: Mail }
      ]
    }
  ];

  return (
    <footer id="footer" className="bg-gradient-to-b from-background to-primary/5 border-t border-primary/20 py-20 mt-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 animate-fade-in">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/50 transition-all">
                <ShieldCheck className="text-white" size={24} />
              </div>
              <span className="text-2xl font-black tracking-tighter group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all">BLOCKCHAIN <span className="text-primary">WEB3 PRO</span></span>
            </div>
            <p className="text-muted-foreground font-black leading-relaxed">
              The premier institutional-grade cross-chain management interface for modern Web3 assets.
            </p>
          </div>

          {footerLinks.map((section, idx) => (
            <div key={idx} className="group">
              <h4 className="text-lg font-black mb-6 uppercase tracking-widest bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:animate-gradient transition-all">{section.title}</h4>
              <ul className="space-y-4 font-black">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group/link">
                      {link.icon && <link.icon size={16} className="group-hover/link:scale-110 group-hover/link:rotate-12 transition-transform" />}
                      {link.name}
                      <div className="w-0 h-0.5 bg-gradient-to-r from-primary to-transparent group-hover/link:w-full transition-all duration-300"></div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-primary/20 flex flex-col md:flex-row justify-between items-center gap-6 animate-fade-in">
          <p className="text-sm font-black text-muted-foreground hover:text-foreground/70 transition-colors">
            © {currentYear} BLOCKCHAIN WEB3 PRO PROTOCOL. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-sm font-black text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors relative group/link">
              Privacy Policy
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-transparent group-hover/link:w-full transition-all duration-300"></div>
            </a>
            <a href="#" className="hover:text-primary transition-colors relative group/link">
              Terms of Service
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-transparent group-hover/link:w-full transition-all duration-300"></div>
            </a>
            <div className="flex items-center gap-2 text-green-500 group/status">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse group-hover/status:animate-bounce"></div>
              <span className="text-xs uppercase tracking-widest">Network Active</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

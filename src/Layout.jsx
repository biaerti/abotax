import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Home,
  BarChart3,
  HelpCircle,
  Menu,
  X,
  ChevronDown,
  FileText,
  Info,
  Landmark,
  Brain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "Strona główna", page: "Home", icon: Home },
    {
      name: "O systemie",
      icon: Info,
      submenu: [
        { name: "Jak to działa", page: "About", icon: HelpCircle },
        { name: "Analiza wpływu", page: "Impact", icon: BarChart3 },
        { name: "Wpływ na dzieci", page: "WplywNaRozwoj", icon: Brain },
        { name: "FAQ", page: "FAQ", icon: HelpCircle },
      ]
    },
    { name: "Projekt ustawy", page: "ProjektUstawy", icon: FileText },
  ];

  const isActive = (page) => currentPageName === page;

  return (
    <div className="min-h-screen bg-official-cream">
      <style>{`
        :root {
          --primary: #1A5F5A;
          --secondary: #E8A87C;
          --background: #FDF6E3;
          --text: #2D3436;
          --success: #95B89C;
          --official-navy: #1a365d;
          --official-gold: #c9a227;
        }

        .gradient-primary {
          background: linear-gradient(135deg, #1A5F5A 0%, #2A7A74 100%);
        }

        .gradient-navy {
          background: linear-gradient(135deg, #1a365d 0%, #2d4a7c 100%);
        }

        .text-gradient {
          background: linear-gradient(135deg, #1A5F5A 0%, #2A7A74 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .card-hover {
          transition: all 0.3s ease;
        }

        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(26, 54, 93, 0.1);
        }
      `}</style>

      {/* Top official bar */}
      <div className="bg-official-navy text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5" />
              Inicjatywa obywatelska
            </span>
            <span className="hidden sm:inline text-white/60">|</span>
            <span className="hidden sm:inline font-semibold text-official-gold">AboTax</span>
            <span className="hidden sm:inline text-white/60">|</span>
            <span className="hidden sm:inline text-white/70">Projekt ustawy o Funduszu Rekompensaty Społecznej</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com/abotaxx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white/70 hover:text-white transition-colors"
            >
              FB
            </a>
            <span className="text-white/40">|</span>
            <a
              href="https://instagram.com/abotax.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white/70 hover:text-white transition-colors"
            >
              IG
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-md'
          : 'bg-white/80 backdrop-blur-sm'
      } border-b border-official-navy/10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-3">
              <img
                src="/LOGO_abotax_noBG.png"
                alt="AboTax"
                className="w-11 h-11 object-contain"
              />
              <div>
                <span className="font-serif font-bold text-lg text-official-navy">Fundusz Rekompensaty</span>
                <span className="hidden sm:block text-xs text-official-navy/60">Społecznej</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) =>
                item.submenu ? (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger asChild>
                      <button className="px-4 py-2 rounded-lg text-sm font-medium transition-all text-official-navy/70 hover:bg-official-navy/5 hover:text-official-navy flex items-center gap-1">
                        {item.name}
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56 bg-white border-official-navy/10">
                      {item.submenu.map((subItem) => (
                        <DropdownMenuItem key={subItem.name} asChild>
                          <Link
                            to={createPageUrl(subItem.page) + (subItem.anchor || '')}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <subItem.icon className="w-4 h-4 text-official-navy/60" />
                            {subItem.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={item.page}
                    to={createPageUrl(item.page)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive(item.page)
                        ? "bg-official-navy text-white"
                        : "text-official-navy/70 hover:bg-official-navy/5 hover:text-official-navy"
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <Link to={createPageUrl("PodpiszPetycje")}>
                <Button className="bg-official-navy hover:bg-official-navy/90 text-white rounded-lg shadow-sm flex items-center gap-2 font-medium">
                  <FileText className="w-4 h-4" />
                  Podpisz petycję
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-official-navy/5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-official-navy" />
              ) : (
                <Menu className="w-6 h-6 text-official-navy" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-official-navy/10">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) =>
                item.submenu ? (
                  <div key={item.name} className="space-y-1">
                    <div className="px-4 py-2 text-xs font-semibold text-official-navy/50 uppercase tracking-wider">
                      {item.name}
                    </div>
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={createPageUrl(subItem.page) + (subItem.anchor || '')}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-official-navy/70 hover:bg-official-navy/5"
                      >
                        <subItem.icon className="w-5 h-5" />
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.page}
                    to={createPageUrl(item.page)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive(item.page)
                        ? "bg-official-navy text-white"
                        : "text-official-navy/70 hover:bg-official-navy/5"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                )
              )}
              <div className="pt-4 border-t border-official-navy/10">
                <Link
                  to={createPageUrl("PodpiszPetycje")}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block"
                >
                  <Button className="w-full bg-official-navy hover:bg-official-navy/90 text-white rounded-xl shadow-md flex items-center justify-center gap-2">
                    <FileText className="w-4 h-4" />
                    Podpisz petycję
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-official-navy text-white">
        {/* Top section with Polish flag stripe */}
        <div className="h-1.5 flex">
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-official-red" />
        </div>

        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="md:col-span-2">
                <div className="flex flex-col mb-6">
                  <img
                    src="/LOGO_abotax_noBG.png"
                    alt="AboTax"
                    className="w-28 h-28 object-contain mb-3"
                  />
                  <div>
                    <span className="font-serif font-bold text-xl">Fundusz Rekompensaty</span>
                    <span className="block text-sm text-white/60">Społecznej</span>
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed max-w-md mb-6">
                  Systemowe rozwiązanie łączące prawa jednostki z odpowiedzialnością społeczną.
                  100% środków z rekompensaty trafia na etaty opiekunów w domach dziecka.
                </p>
                <div className="flex items-center gap-4 text-sm mb-4">
                  <Landmark className="w-4 h-4 text-official-gold" />
                  <span className="text-white/60">Inicjatywa obywatelska</span>
                </div>
                {/* Social Media */}
                <div className="flex items-center gap-4">
                  <a
                    href="https://facebook.com/abotaxx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com/abotax.pl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4 text-official-gold">Nawigacja</h4>
                <ul className="space-y-3 text-sm text-white/70">
                  <li><Link to={createPageUrl("Home")} className="hover:text-white transition-colors flex items-center gap-2"><Home className="w-4 h-4" />Strona główna</Link></li>
                  <li><Link to={createPageUrl("About")} className="hover:text-white transition-colors flex items-center gap-2"><HelpCircle className="w-4 h-4" />Jak to działa</Link></li>
                  <li><Link to={createPageUrl("Impact")} className="hover:text-white transition-colors flex items-center gap-2"><BarChart3 className="w-4 h-4" />Analiza wpływu</Link></li>
                  <li><Link to={createPageUrl("WplywNaRozwoj")} className="hover:text-white transition-colors flex items-center gap-2"><Brain className="w-4 h-4" />Wpływ na dzieci</Link></li>
                  <li><Link to={createPageUrl("ProjektUstawy")} className="hover:text-white transition-colors flex items-center gap-2"><FileText className="w-4 h-4" />Projekt ustawy</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4 text-official-gold">Informacje</h4>
                <ul className="space-y-3 text-sm text-white/70">
                  <li><Link to={createPageUrl("FAQ")} className="hover:text-white transition-colors flex items-center gap-2"><HelpCircle className="w-4 h-4" />FAQ</Link></li>
                  <li><Link to={createPageUrl("PodpiszPetycje")} className="hover:text-white transition-colors flex items-center gap-2"><FileText className="w-4 h-4" />Podpisz petycję</Link></li>
                  <li><a href="mailto:kontakt@abotax.pl" className="hover:text-white transition-colors flex items-center gap-2"><Info className="w-4 h-4" />kontakt@abotax.pl</a></li>
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-white/50">
                © 2024 Fundusz Rekompensaty Społecznej. Inicjatywa obywatelska.
              </p>
              <div className="flex items-center gap-4 text-sm text-white/50">
                <Link to={createPageUrl("Regulamin")} className="hover:text-white transition-colors">Regulamin</Link>
                <span>|</span>
                <Link to={createPageUrl("PolitykaPrywatnosci")} className="hover:text-white transition-colors">Polityka prywatności</Link>
                <span>|</span>
                <Link to={createPageUrl("FAQ")} className="hover:text-white transition-colors">FAQ</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

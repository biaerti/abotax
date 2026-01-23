import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Eye,
  Scale,
  FileText,
  Building2,
  QrCode,
  Heart,
  Users,
  CheckCircle2,
  Landmark,
  TrendingUp,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import WhyAboTax from "@/components/home/WhyAboTax";

// Animated counter component
function AnimatedCounter({ end, duration = 2000, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, hasStarted]);

  return (
    <motion.span
      onViewportEnter={() => setHasStarted(true)}
      viewport={{ once: true }}
    >
      {prefix}{count.toLocaleString('pl-PL')}{suffix}
    </motion.span>
  );
}

// Official badge component
function OfficialBadge({ children, variant = "default" }) {
  const variants = {
    default: "bg-official-navy/10 text-official-navy border-official-navy/20",
    gold: "bg-official-gold/10 text-official-gold border-official-gold/30",
    success: "bg-abotax-success/10 text-abotax-primary border-abotax-success/30"
  };

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${variants[variant]}`}>
      {children}
    </span>
  );
}

export default function Home() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);

  // Simulated petition count (will connect to Supabase later)
  const [petitionCount] = useState(127847);

  return (
    <div className="bg-official-cream">
      {/* Hero Section - Government-style */}
      <section className="relative min-h-[calc(100vh-120px)] overflow-hidden flex items-center">
        {/* Background Pattern - Subtle grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a365d' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative w-full"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl lg:text-6xl font-serif font-bold text-official-navy mb-6 leading-[1.1]">
                Fundusz Rekompensaty
                <span className="block text-abotax-primary mt-2">Społecznej</span>
              </h1>

              <p className="text-xl text-official-navy/70 mb-8 leading-relaxed max-w-xl font-light">
                Systemowe rozwiązanie łączące prawa jednostki z odpowiedzialnością społeczną.
                <span className="font-medium text-official-navy"> Życie za życie — rekompensata, nie kara.</span>
              </p>

              {/* Key points */}
              <div className="flex flex-wrap gap-6 mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-abotax-primary/10 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-abotax-primary" />
                  </div>
                  <span className="text-sm font-medium text-official-navy">Pełna anonimowość</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-abotax-primary/10 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-abotax-primary" />
                  </div>
                  <span className="text-sm font-medium text-official-navy">100% transparentności</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={createPageUrl("PodpiszPetycje")}>
                  <Button
                    size="lg"
                    className="bg-official-navy hover:bg-official-navy/90 text-white rounded-lg px-8 py-6 text-lg font-medium shadow-lg shadow-official-navy/20 w-full sm:w-auto"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Podpisz petycję
                  </Button>
                </Link>
                <Link to={createPageUrl("About")}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-official-navy/30 text-official-navy hover:bg-official-navy/5 rounded-lg px-8 py-6 text-lg w-full sm:w-auto"
                  >
                    Jak to działa?
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Column - Visual Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              {/* Main card - Document style */}
              <div className="relative">
                {/* Official document card */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-white rounded-2xl shadow-2xl shadow-official-navy/10 border border-official-navy/10 overflow-hidden"
                >
                  {/* Document header */}
                  <div className="bg-gradient-to-r from-official-navy to-official-navy/90 p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                          <Scale className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-xs text-white/70 uppercase tracking-wider">Rzeczpospolita Polska</p>
                          <p className="font-serif font-bold">Projekt Ustawy</p>
                        </div>
                      </div>
                      <div className="w-16 h-16">
                        {/* Stylized eagle symbol */}
                        <svg viewBox="0 0 100 100" className="w-full h-full text-official-gold">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                          <path
                            d="M50 20 L60 40 L80 45 L65 60 L70 80 L50 70 L30 80 L35 60 L20 45 L40 40 Z"
                            fill="currentColor"
                            opacity="0.8"
                          />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl font-serif">o Funduszu Rekompensaty Społecznej</h3>
                  </div>

                  {/* Document content preview */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs text-official-navy/50 uppercase tracking-wider">Artykuł 1 — Cel ustawy</p>
                      <p className="text-sm text-official-navy/80 leading-relaxed">
                        Ustawa określa zasady funkcjonowania Funduszu Rekompensaty Społecznej,
                        którego celem jest zapewnienie wsparcia finansowego dla dzieci
                        pozbawionych opieki rodzicielskiej...
                      </p>
                    </div>

                    <div className="h-px bg-official-navy/10" />

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-official-navy/50">18 artykułów</span>
                      <Link to={createPageUrl("PodpiszPetycje")} className="text-abotax-primary font-medium hover:underline">
                        Czytaj całość →
                      </Link>
                    </div>
                  </div>
                </motion.div>

                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -top-8 -right-8 bg-white rounded-xl shadow-lg p-4 border border-official-navy/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-abotax-success/20 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-abotax-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-official-navy/50">Podpisów</p>
                      <p className="font-bold text-official-navy">
                        <AnimatedCounter end={petitionCount} suffix="" />
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [0, -3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-4 -left-8 bg-white rounded-xl shadow-lg p-4 border border-official-navy/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-official-gold/20 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-official-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-official-navy/50">Szacowany wpływ</p>
                      <p className="font-bold text-official-navy">125 mln zł/rok</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-official-navy/40"
          >
            <span className="text-xs uppercase tracking-wider">Przewiń w dół</span>
            <div className="w-6 h-10 border-2 border-official-navy/20 rounded-full flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-official-navy/40 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works - New Clinic-Token Model */}
      <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-abotax-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-official-gold/5 rounded-full translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <OfficialBadge variant="success">
              <Scale className="w-4 h-4" />
              Mechanizm działania
            </OfficialBadge>
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-official-navy mt-6 mb-4">
              Jak działa system?
            </h2>
            <p className="text-lg text-official-navy/60 max-w-2xl mx-auto">
              Prosty mechanizm zapewniający pełną anonimowość pacjentki przy jednoczesnej
              transparentności przepływu środków
            </p>
          </motion.div>

          {/* Steps - New Model */}
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-4">
            {[
              {
                step: 1,
                icon: Building2,
                title: "Wizyta w klinice",
                description: "Pacjentka korzysta z usługi medycznej w licencjonowanej placówce",
                color: "bg-official-navy"
              },
              {
                step: 2,
                icon: FileText,
                title: "Faktura z dwiema pozycjami",
                description: "Klinika wystawia fakturę: usługa medyczna + opłata AboTax (100% wartości zabiegu)",
                color: "bg-abotax-primary"
              },
              {
                step: 3,
                icon: QrCode,
                title: "Token solidarnościowy",
                description: "Pacjentka otrzymuje unikalny kod QR do anonimowego wyboru domu dziecka",
                color: "bg-official-gold"
              },
              {
                step: 4,
                icon: Landmark,
                title: "Klinika wpłaca do Funduszu",
                description: "Klinika rozlicza się z Funduszem — pacjentka pozostaje anonimowa",
                color: "bg-abotax-primary"
              },
              {
                step: 5,
                icon: Heart,
                title: "Wsparcie dla dzieci",
                description: "100% środków trafia do domów dziecka wybranych przez pacjentki",
                color: "bg-official-red"
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector line */}
                {index < 4 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-official-navy/20 to-transparent" />
                )}

                <div className="text-center">
                  {/* Step number and icon */}
                  <div className="relative inline-block mb-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`w-24 h-24 rounded-2xl ${item.color} text-white flex items-center justify-center shadow-lg`}
                    >
                      <item.icon className="w-10 h-10" />
                    </motion.div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
                      <span className="text-sm font-bold text-official-navy">{item.step}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-official-navy mb-2">{item.title}</h3>
                  <p className="text-sm text-official-navy/60 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Key insight box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-abotax-primary/5 to-official-gold/5 rounded-2xl p-8 border border-abotax-primary/10"
          >
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-xl bg-abotax-primary/10 flex items-center justify-center flex-shrink-0">
                <Lock className="w-8 h-8 text-abotax-primary" />
              </div>
              <div className="text-center lg:text-left">
                <h4 className="text-xl font-bold text-official-navy mb-2">Dlaczego to anonimowe?</h4>
                <p className="text-official-navy/70">
                  <span className="font-medium text-abotax-primary">Fundusz nie wie kim jest pacjentka</span> —
                  otrzymuje tylko anonimową wpłatę od kliniki. Token pozwala pacjentce wybrać dom dziecka,
                  ale nie ujawnia jej tożsamości. To rozwiązanie zgodne z Art. 10, 12 i 15 projektu ustawy.
                </p>
              </div>
              <Link to={createPageUrl("Privacy")} className="flex-shrink-0">
                <Button variant="outline" className="border-abotax-primary text-abotax-primary hover:bg-abotax-primary/5">
                  Dowiedz się więcej
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-official-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: 125, suffix: " mln zł", label: "Szacowany roczny wpływ", prefix: "~" },
              { value: 17100, suffix: "", label: "Dzieci w domach dziecka", prefix: "" },
              { value: 100, suffix: "%", label: "Środków trafia do dzieci", prefix: "" },
              { value: petitionCount, suffix: "", label: "Podpisów pod petycją", prefix: "" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why AboTax - Values */}
      <WhyAboTax />

      {/* Transparency Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-abotax-primary to-abotax-primary-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <OfficialBadge variant="gold">
                <Eye className="w-4 h-4" />
                Transparentność
              </OfficialBadge>

              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mt-6 mb-6">
                100% przejrzystości finansowej
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Każda złotówka jest śledzona i raportowana publicznie.
                Zero ukrytych kosztów administracyjnych. Pełna transparentność to nasz fundament.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Audyty zewnętrzne</h4>
                    <p className="text-white/60 text-sm">Regularne kontrole niezależnych audytorów</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Eye className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Publiczne raporty</h4>
                    <p className="text-white/60 text-sm">Dostęp do wszystkich raportów finansowych online</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Kontrola społeczna</h4>
                    <p className="text-white/60 text-sm">Przedstawiciele społeczeństwa w Radzie Funduszu</p>
                  </div>
                </div>
              </div>

              <Link to={createPageUrl("Transparency")}>
                <Button size="lg" className="bg-white text-abotax-primary hover:bg-white/90 rounded-xl shadow-lg">
                  Zobacz raporty
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative hidden lg:block"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-white mb-2">100%</div>
                  <p className="text-white/70">środków trafia do dzieci</p>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/80">Wsparcie domów dziecka</span>
                      <span className="text-white font-bold">98%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "98%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-official-gold rounded-full"
                      />
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/80">Administracja systemu</span>
                      <span className="text-white font-bold">2%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "2%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-abotax-success rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - Petition Focus */}
      <section className="py-20 lg:py-32 bg-official-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-official-red/10 text-official-red rounded-full text-sm font-medium mb-6"
              >
                <span className="w-2 h-2 bg-official-red rounded-full animate-pulse" />
                Trwa zbieranie podpisów
              </motion.div>
            </div>

            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-official-navy mb-6">
              Zmień prawo. Podpisz petycję.
            </h2>
            <p className="text-lg text-official-navy/70 mb-8 max-w-2xl mx-auto">
              Twój podpis ma znaczenie. Dołącz do <span className="font-bold">{petitionCount.toLocaleString('pl-PL')}</span> osób,
              które już poparły projekt ustawy o Funduszu Rekompensaty Społecznej.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("PodpiszPetycje")}>
                <Button
                  size="lg"
                  className="bg-official-navy hover:bg-official-navy/90 text-white rounded-xl px-10 py-6 text-lg shadow-lg shadow-official-navy/20"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Podpisz petycję
                </Button>
              </Link>
              <Link to={createPageUrl("Impact")}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-official-navy/30 text-official-navy hover:bg-official-navy/5 rounded-xl px-10 py-6 text-lg"
                >
                  Zobacz szacunkowy wpływ
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-official-navy/50">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Weryfikacja email
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Dane chronione
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Zgodne z RODO
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

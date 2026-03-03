import { motion } from "framer-motion";
import { Scale, Heart, Users, Home as HomeIcon, ArrowRight, Shield, Landmark, BookOpen, CheckCircle2, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";

// Official badge component
function OfficialBadge({ children, variant = "default" }) {
  const variants = {
    default: "bg-official-navy/10 text-official-navy border-official-navy/20",
    gold: "bg-official-gold/10 text-official-gold border-official-gold/30",
    success: "bg-abotax-success/10 text-abotax-primary border-abotax-success/30",
    warm: "bg-abotax-secondary/10 text-abotax-secondary border-abotax-secondary/30"
  };

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${variants[variant]}`}>
      {children}
    </span>
  );
}

export default function WhyAboTax() {
  return (
    <section className="bg-official-cream">
      {/* Section Header */}
      <div className="py-16 lg:py-20 bg-gradient-to-b from-white to-official-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <OfficialBadge variant="gold">
              <BookOpen className="w-4 h-4" />
              Filozofia systemu
            </OfficialBadge>
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-official-navy mt-6 mb-4">
              Dlaczego Fundusz Rekompensaty?
            </h2>
            <p className="text-official-navy/60 text-lg lg:text-xl max-w-3xl mx-auto">
              Kompromis, który kończy wieloletni spór — systemowe rozwiązanie łączące
              prawa jednostki z odpowiedzialnością społeczną
            </p>
          </motion.div>
        </div>
      </div>

      {/* Section 1: Troska o życie - Children as silent victims */}
      <div className="py-16 lg:py-24 bg-official-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content - Left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <OfficialBadge>
                <Users className="w-4 h-4" />
                Problem społeczny
              </OfficialBadge>
              <h3 className="text-3xl lg:text-4xl font-serif font-bold text-official-navy mt-6 mb-6">
                Troska o życie nie kończy się przy narodzinach
              </h3>
              <div className="space-y-4 text-official-navy/70 leading-relaxed text-lg">
                <p>
                  W Polsce dzieci w domach dziecka często mają <span className="font-bold text-official-red">1 opiekuna na 8 dzieci</span>,
                  gdy zalecane standardy to maksymalnie 1:5. Jeśli mówimy o wartości życia, musimy zadbać o te dzieci,
                  które już są na świecie i czekają na wsparcie.
                </p>
                <p>
                  Przez lata debata skupiała się na nienarodzonych — i słusznie. Ale jest <span className="font-semibold text-official-navy">17 100 dzieci, które już żyją, już czekają, już potrzebują</span>.
                  Rosną w przepełnionych placówkach, gdzie jeden opiekun odpowiada za 8 podopiecznych — nie z powodu złej woli, lecz zwyczajnie braku środków.
                </p>
                <div className="pt-6 border-t border-official-navy/10">
                  <p className="text-abotax-primary font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Fundusz przekierowuje uwagę tam, gdzie już możemy realnie pomóc.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stats Card - Right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-official-navy/10 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-official-navy to-official-navy/90 p-6 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <Landmark className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-white/70 uppercase tracking-wider">Dane GUS 2024</p>
                      <p className="font-serif font-bold">Piecza zastępcza w Polsce</p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="text-center p-4 bg-official-cream rounded-xl"
                    >
                      <div className="text-3xl font-bold text-official-red">17 100</div>
                      <div className="text-sm text-official-navy/60">dzieci w domach dziecka</div>
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="text-center p-4 bg-official-cream rounded-xl"
                    >
                      <div className="text-3xl font-bold text-official-navy">~2 140</div>
                      <div className="text-sm text-official-navy/60">opiekunów</div>
                    </motion.div>
                  </div>

                  <div className="bg-official-red/5 rounded-xl p-4 border border-official-red/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-official-navy/70">Aktualny wskaźnik</span>
                      <span className="font-bold text-official-red">1 opiekun : 8 dzieci</span>
                    </div>
                    <div className="h-2 bg-official-red/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "62.5%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-official-red rounded-full"
                      />
                    </div>
                    <p className="text-xs text-official-navy/50 mt-2">Zalecany standard: max 1:5 (potrzeba ~3 420 opiekunów)</p>
                  </div>

                  <Link to={createPageUrl("WplywNaRozwoj")} className="block">
                    <Button variant="outline" className="w-full border-official-navy/20 text-official-navy hover:bg-official-navy/5">
                      Zobacz pełną analizę
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-official-gold text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
              >
                Oficjalne dane
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section 2: Słyszymy wszystkich - Freedom vs Responsibility */}
      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Balance Visual - Left - Modern Card Design */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-2 lg:order-1"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-official-navy/10 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-official-navy to-official-navy/90 p-6 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <Scale className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-white/70 uppercase tracking-wider">Filozofia systemu</p>
                      <p className="font-serif font-bold">Równowaga wartości</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Two sides */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="bg-abotax-secondary/10 rounded-xl p-4 text-center border border-abotax-secondary/20"
                    >
                      <div className="w-12 h-12 rounded-full bg-abotax-secondary/20 flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl">🕊️</span>
                      </div>
                      <div className="font-bold text-official-navy mb-1">Wolność</div>
                      <div className="text-xs text-official-navy/60">Prawo do decyzji</div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="bg-abotax-success/10 rounded-xl p-4 text-center border border-abotax-success/20"
                    >
                      <div className="w-12 h-12 rounded-full bg-abotax-success/20 flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl">🤝</span>
                      </div>
                      <div className="font-bold text-official-navy mb-1">Odpowiedzialność</div>
                      <div className="text-xs text-official-navy/60">Troska o innych</div>
                    </motion.div>
                  </div>

                  {/* Bridge - The solution */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="relative"
                  >
                    <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gradient-to-r from-abotax-secondary via-abotax-primary to-abotax-success" />
                    <div className="relative flex justify-center">
                      <div className="bg-abotax-primary text-white rounded-xl px-6 py-3 shadow-lg flex items-center gap-2">
                        <Heart className="w-5 h-5" />
                        <span className="font-bold">Fundusz łączy oba światy</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Result */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                    className="bg-official-cream rounded-xl p-4 text-center"
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-abotax-primary" />
                      <span className="font-bold text-official-navy">17 100 dzieci</span>
                    </div>
                    <p className="text-sm text-official-navy/60">zyskuje realne wsparcie</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Content - Right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <OfficialBadge variant="warm">
                <Scale className="w-4 h-4" />
                Równowaga wartości
              </OfficialBadge>
              <h3 className="text-3xl lg:text-4xl font-serif font-bold text-official-navy mt-6 mb-6">
                Słyszymy argumenty wszystkich stron
              </h3>
              <div className="space-y-4 text-official-navy/70 leading-relaxed text-lg">
                <div className="bg-abotax-secondary/5 border-l-4 border-abotax-secondary p-4 rounded-r-lg">
                  <p className="italic text-official-navy/90">
                    "Dlaczego nie pomagacie dzieciom, które już żyją?"
                  </p>
                  <p className="text-sm text-abotax-secondary font-semibold mt-2">— Strona pro-choice</p>
                </div>
                <div className="bg-abotax-success/5 border-l-4 border-abotax-success p-4 rounded-r-lg">
                  <p className="italic text-official-navy/90">
                    "Gdzie jest odpowiedzialność za odebranie szansy na życie?"
                  </p>
                  <p className="text-sm text-abotax-success font-semibold mt-2">— Strona pro-life</p>
                </div>
                <p className="pt-4">
                  <span className="font-bold text-abotax-primary">Obie strony mają rację.</span> Fundusz Rekompensaty Społecznej
                  to system, który godzi wolność z odpowiedzialnością — dając autonomię i jednocześnie uznając wartość życia
                  poprzez realną pomoc dzieciom.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section 3: Rekompensata - Caregiver ratio impact */}
      <div className="py-16 lg:py-24 bg-official-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content - Left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <OfficialBadge variant="success">
                <Heart className="w-4 h-4" />
                Filozofia rekompensaty
              </OfficialBadge>
              <h3 className="text-3xl lg:text-4xl font-serif font-bold text-official-navy mt-6 mb-6">
                Odbieram szansę — zwracam szansę
              </h3>
              <div className="space-y-4 text-official-navy/70 leading-relaxed text-lg">
                <p>
                  To nie kara ani odkupienie winy. To <span className="font-bold text-abotax-primary">społeczna rekompensata</span>
                  {" "}— i konkretna odpowiedź na problem, który widzimy w Sekcji powyżej.
                </p>
                <p>
                  Twoja wpłata finansuje <span className="font-semibold text-official-navy">godziny obecności</span>.
                  Nie kupujemy przedmiotów. Finansujemy etaty dla wykwalifikowanych opiekunów, aby każde dziecko miało obok
                  siebie dorosłego, który ma czas je wysłuchać.
                </p>

                {/* Money allocation card */}
                <div className="bg-white rounded-xl p-6 border border-abotax-primary/20 shadow-sm mt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-abotax-primary/10 flex items-center justify-center">
                      <UserCheck className="w-7 h-7 text-abotax-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-official-navy/60">Twoja wpłata</div>
                      <div className="text-3xl font-bold text-abotax-primary">100%</div>
                    </div>
                  </div>
                  <p className="text-sm text-official-navy/70">
                    trafia na etaty opiekunów w domach dziecka — indywidualna uwaga dla każdego dziecka
                  </p>
                  <div className="mt-3 pt-3 border-t border-official-navy/10">
                    <p className="text-xs text-official-navy/50">
                      Koszt pracodawcy: ~7 000 zł/mies. na etat (wynagrodzenie netto opiekuna: ~4 200–4 500 zł)
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Visual - Right: Before/After ratio comparison */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-official-navy/10 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-abotax-primary to-abotax-primary-light p-6 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-white/70 uppercase tracking-wider">Wpływ AboTax</p>
                      <p className="font-serif font-bold">Zmiana wskaźnika opieki</p>
                    </div>
                  </div>
                </div>

                {/* Content - Before/After */}
                <div className="p-6 space-y-5">
                  {/* WITHOUT AboTax */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-official-red/5 rounded-xl p-4 border border-official-red/20"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-official-red" />
                      <span className="text-sm font-bold text-official-red">Bez AboTax — dziś</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-official-navy/70">Grupa w placówce</span>
                      <span className="font-bold text-official-red">do 14 dzieci</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-official-navy/70">Wskaźnik opiekun/dziecko</span>
                      <span className="font-bold text-official-red">1:8</span>
                    </div>
                    <p className="text-xs text-official-navy/50 mt-3 italic">Tylko dozór — brak czasu na indywidualną uwagę</p>
                  </motion.div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, type: "spring" }}
                      className="w-10 h-10 rounded-full bg-abotax-primary flex items-center justify-center shadow-lg"
                    >
                      <ArrowRight className="w-5 h-5 text-white rotate-90" />
                    </motion.div>
                  </div>

                  {/* WITH AboTax */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="bg-abotax-success/10 rounded-xl p-4 border border-abotax-success/30"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-abotax-primary" />
                      <span className="text-sm font-bold text-abotax-primary">Z AboTax — cel</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-official-navy/70">Grupa w placówce</span>
                      <span className="font-bold text-abotax-primary">ok. 11 dzieci</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-official-navy/70">Wskaźnik opiekun/dziecko</span>
                      <span className="font-bold text-abotax-primary">1:5</span>
                    </div>
                    <p className="text-xs text-official-navy/50 mt-3 italic">Prawdziwa relacja — czas na rozmowę, zabawę, wysłuchanie</p>
                  </motion.div>

                  <div className="pt-4 border-t border-official-navy/10">
                    <Link to={createPageUrl("WplywNaRozwoj")}>
                      <Button className="w-full bg-abotax-primary hover:bg-abotax-primary-light text-white">
                        Zobacz badania naukowe
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section 4: Trzecia droga - Unity */}
      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Unity Visual - Left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-2 lg:order-1"
            >
              <div className="bg-gradient-to-br from-official-cream to-white rounded-2xl p-8 border border-official-navy/10">
                <div className="flex items-center justify-between mb-8">
                  {/* Pro-choice side */}
                  <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-abotax-secondary/20 flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">👤</span>
                    </div>
                    <p className="text-xs font-semibold text-abotax-secondary">Pro-choice</p>
                  </motion.div>

                  {/* Bridge */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex-1 mx-4"
                  >
                    <div className="h-1 bg-gradient-to-r from-abotax-secondary via-abotax-primary to-abotax-success rounded-full" />
                  </motion.div>

                  {/* Pro-life side */}
                  <motion.div
                    initial={{ x: 30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-abotax-success/20 flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">👤</span>
                    </div>
                    <p className="text-xs font-semibold text-abotax-success">Pro-life</p>
                  </motion.div>
                </div>

                {/* Children in center */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-abotax-primary to-abotax-primary-light flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-lg font-bold text-official-navy">17 100 dzieci</p>
                  <p className="text-sm text-official-navy/60">czeka na wsparcie</p>
                </motion.div>

                {/* Benefits */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-abotax-primary mx-auto mb-1" />
                    <p className="text-xs text-official-navy/70">Legalna procedura</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-abotax-primary mx-auto mb-1" />
                    <p className="text-xs text-official-navy/70">Realna pomoc</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-abotax-primary mx-auto mb-1" />
                    <p className="text-xs text-official-navy/70">Transparentność</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-abotax-primary mx-auto mb-1" />
                    <p className="text-xs text-official-navy/70">Spokój sumienia</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content - Right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <OfficialBadge>
                <Shield className="w-4 h-4" />
                Trzecia droga
              </OfficialBadge>
              <h3 className="text-3xl lg:text-4xl font-serif font-bold text-official-navy mt-6 mb-6">
                Kończymy wieczny konflikt pragmatycznym rozwiązaniem
              </h3>
              <div className="space-y-4 text-official-navy/70 leading-relaxed text-lg">
                <p>
                  Przez dekady spór aborcyjny paraliżował Polskę. Żadna strona nie czuła się wysłuchana.
                  Manifestacje, wyroki sądowe, podróże za granicę — to wszystko dowód, że potrzebujemy nowego podejścia.
                </p>
                <p className="font-semibold text-abotax-primary">
                  Fundusz Rekompensaty Społecznej to trzecia droga:
                </p>
                <ul className="space-y-3">
                  {[
                    "Legalna procedura w bezpiecznych warunkach",
                    "Realna pomoc dla istniejących dzieci",
                    "Pełna transparentność przepływu środków",
                    "Anonimowość pacjentek gwarantowana ustawowo"
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-abotax-primary mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Link to={createPageUrl("Impact")}>
                    <Button className="bg-abotax-primary hover:bg-abotax-primary-light text-white">
                      Zobacz, co AboTax może zmienić
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Closing statement */}
      <div className="py-12 bg-official-cream border-t border-official-navy/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-official-navy/60 text-lg leading-relaxed font-serif italic"
          >
            "Fundusz Rekompensaty Społecznej nie jest rozwiązaniem idealnym dla wszystkich.
            Ale jest uczciwą próbą pogodzenia wartości, które wydawały się nie do pogodzenia —
            system oparty na rzeczywistych potrzebach, nie na ideologii."
          </motion.p>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Building2,
  Calculator,
  ArrowRight,
  Heart,
  AlertCircle,
  FileText,
  Brain,
  BookOpen,
  ShieldAlert,
  Target,
  Info,
  Home as HomeIcon,
  BarChart3
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createPageUrl } from "@/utils/createPageUrl";

export default function WplywNaRozwoj() {
  const studies = [
    {
      name: "Bucharest Early Intervention Project (BEIP)",
      type: "Randomizowane badanie kontrolowane",
      finding: "Dzieci w instytucjach: IQ ~84 vs 104 u rówieśników w rodzinach. Opieka z indywidualną uwagą: +9 punktów IQ.",
      source: "Nelson, Fox & Zeanah (2014) — Harvard University Press"
    },
    {
      name: "St. Petersburg-USA Orphanage Study",
      type: "Badanie interwencyjne w trzech domach dziecka",
      finding: "Zmniejszenie grupy z 12 do 6 dzieci + stali opiekunowie = najlepsze wyniki we WSZYSTKICH obszarach.",
      source: "McCall et al. (2013) — Monographs of the Society for Research in Child Development"
    },
    {
      name: "Komisja Lancet ds. Instytucjonalizacji",
      type: "Przegląd systematyczny: 308 badań, 68 krajów, 100 000+ dzieci",
      finding: "Nawet 'dobre' placówki ze złym wskaźnikiem kadry powodują szkody rozwojowe.",
      source: "Johnson et al. (2020) — The Lancet Psychiatry"
    }
  ];

  return (
    <div className="min-h-screen bg-official-cream">
      {/* Hero */}
      <section className="bg-gradient-to-br from-official-navy via-official-navy to-official-navy/90 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-official-gold/20 rounded-full text-official-gold text-sm font-medium mb-6 border border-official-gold/30">
              <Brain className="w-4 h-4" />
              Wpływ na dzieci
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Na co idą pieniądze{" "}
              <span className="text-official-gold">z AboTax?</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Indywidualna uwaga zmienia wszystko. Pokazujemy, jak Fundusz przekształca
              przepełnione placówki w małe, rodzinne domy — i dlaczego to jedyny model, który działa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Current Reality: 14 kids, 2+2+1 staff */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif font-bold text-official-navy mb-4">
              Jak wygląda dzień w domu dziecka?
            </h2>
            <p className="text-official-navy/70 max-w-2xl mx-auto">
              Polskie prawo pozwala na max 14 dzieci w jednej grupie wychowawczej.
              <br></br>To rzeczywistość 1 238 placówek w Polsce.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left: The problem visualization */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-official-red/20 shadow-xl overflow-hidden">
                <div className="bg-official-red/10 p-4 border-b border-official-red/20">
                  <h3 className="font-bold text-official-navy flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-official-red" />
                    DZIŚ: 14 dzieci, 1 opiekun na zmianie
                  </h3>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="bg-official-cream rounded-xl p-4">
                      <p className="text-sm font-semibold text-official-navy mb-3">Obsada dyżurów 24/7:</p>
                      <div className="space-y-2 text-sm text-official-navy/70">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-official-gold" />
                          <span><strong>Rano:</strong> 2 osoby na 14 dzieci</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-abotax-secondary" />
                          <span><strong>Popołudnie/wieczór:</strong> 2 osoby na 14 dzieci</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-official-navy" />
                          <span><strong>Noc:</strong> 1 osoba na 14 dzieci</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-official-red/5 rounded-xl p-4 border border-official-red/10">
                      <p className="text-sm text-official-navy/80">
                        <strong className="text-official-red">Wynik:</strong> Opiekun to strażnik, nie rodzic.
                        Brak czasu na indywidualną rozmowę, zabawę, wysłuchanie. 14 dzieci to za dużo,
                        żeby kogokolwiek naprawdę poznać.
                      </p>
                    </div>
                    <div className="text-center pt-2">
                      <div className="flex flex-wrap justify-center gap-1">
                        {Array.from({ length: 14 }).map((_, i) => (
                          <div key={i} className="w-8 h-8 rounded-full bg-official-red/10 flex items-center justify-center">
                            <span className="text-xs">👤</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-official-navy/50 mt-2">14 dzieci w jednej grupie</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right: What research says */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-official-navy/10 shadow-xl overflow-hidden">
                <div className="bg-abotax-primary/10 p-4 border-b border-abotax-primary/20">
                  <h3 className="font-bold text-official-navy flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-official-red" />
                    Co mówi nauka o dużych grupach?
                  </h3>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-official-red/10 flex items-center justify-center flex-shrink-0">
                        <ShieldAlert className="w-4 h-4 text-official-red" />
                      </div>
                      <div>
                        <p className="font-semibold text-official-navy text-sm">Przemoc rówieśnicza</p>
                        <p className="text-sm text-official-navy/70">
                          W przepełnionych placówkach przemoc rówieśnicza to jedno z głównych zagrożeń.
                          Jeden opiekun nie jest w stanie zapobiegać konfliktom wśród 14 dzieci.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-official-red/10 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-4 h-4 text-official-red" />
                      </div>
                      <div>
                        <p className="font-semibold text-official-navy text-sm">Brak indywidualnej uwagi</p>
                        <p className="text-sm text-official-navy/70">
                          73% dzieci w instytucjach ma zdezorganizowany wzorzec przywiązania (najgorszy typ).
                          U dzieci w rodzinach — ~15%. <span className="italic text-official-navy/50">(BEIP, Harvard)</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-official-red/10 flex items-center justify-center flex-shrink-0">
                        <Brain className="w-4 h-4 text-official-red" />
                      </div>
                      <div>
                        <p className="font-semibold text-official-navy text-sm">Opóźnienia rozwojowe</p>
                        <p className="text-sm text-official-navy/70">
                          IQ dzieci w instytucjach: ~84 (norma: 100). Dzieci z indywidualną uwagą:
                          +9 punktów IQ. Efekty trwałe do dorosłości.
                        </p>
                      </div>
                    </div>

                    <div className="bg-abotax-primary/5 rounded-xl p-4 border border-abotax-primary/10 mt-2">
                      <p className="text-sm text-official-navy/80">
                        <strong className="text-abotax-primary">Wniosek:</strong> To nie kwestia dyscypliny
                        — to kwestia <strong>struktury</strong>. Mniejsze grupy + stali opiekunowie =
                        jedyna interwencja, która zmienia trajektorię rozwoju.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Research backing */}
      <section className="py-16 px-4 bg-official-cream">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-official-gold/10 rounded-full text-official-gold text-sm font-medium mb-4 border border-official-gold/20">
              <BookOpen className="w-4 h-4" />
              Badania naukowe
            </div>
            <h2 className="text-3xl font-serif font-bold text-official-navy mb-4">
              Dlaczego mniejsze grupy?
            </h2>
            <p className="text-official-navy/70 max-w-2xl mx-auto">
              Trzy przełomowe badania dowodzą jednego: mniejsze grupy i stali opiekunowie
              to najważniejsza interwencja dla dzieci w placówkach.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {studies.map((study, index) => (
              <motion.div
                key={study.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-official-navy/10 hover:shadow-xl transition-shadow h-full">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-official-navy to-official-navy/80 flex items-center justify-center mb-4">
                      <Brain className="w-5 h-5 text-official-gold" />
                    </div>
                    <h3 className="text-sm font-bold text-official-navy mb-1">{study.name}</h3>
                    <p className="text-xs text-abotax-primary font-medium mb-3">{study.type}</p>
                    <p className="text-sm text-official-navy/80 leading-relaxed mb-3">{study.finding}</p>
                    <p className="text-xs text-official-navy/50 italic">Źródło: {study.source}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Key takeaway */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-official-navy/5 border border-official-navy/10 rounded-xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-abotax-primary/10 flex items-center justify-center flex-shrink-0">
                <Brain className="w-5 h-5 text-abotax-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-official-navy mb-2">Wniosek z badań</h3>
                <p className="text-official-navy/70 text-sm leading-relaxed">
                  Badania są jednoznaczne: im mniejsza grupa, tym więcej czasu i uwagi ma opiekun dla każdego
                  dziecka. W grupach 6–8 osób możliwe jest budowanie stałych relacji, reagowanie na potrzeby
                  i wsparcie zdrowego rozwoju. Rozmiar grupy — nie wyposażenie, nie szkolenia —
                  to klucz do zmiany.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Co zmieni AboTax — transformation section */}
      <section className="py-16 px-4 bg-gradient-to-br from-official-navy via-official-navy to-official-navy/90">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-official-gold/20 rounded-full text-official-gold text-sm font-medium mb-6 border border-official-gold/30">
              <Target className="w-4 h-4" />
              Transformacja systemu
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Co zmieni AboTax?
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Fundusz generuje szacunkowo{" "}
              <Link to={createPageUrl("Impact")} className="text-official-gold font-semibold underline underline-offset-2 hover:text-official-gold/80">
                ~125 mln zł rocznie
              </Link>
              . Te pieniądze idą na jedno: więcej opiekunów, mniejsze grupy, więcej uwagi dla każdego dziecka.
            </p>
          </motion.div>

          {/* 2-column BEZ vs Z AboTax */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* BEZ AboTax */}
              <div className="bg-white/10 rounded-2xl p-8 border border-red-400/20">
                <p className="text-red-400 text-xs font-semibold uppercase tracking-widest mb-6">BEZ AboTax — dziś</p>
                <div className="space-y-5">
                  <div>
                    <p className="text-white/50 text-xs mb-1">Przepełnione grupy</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {Array.from({ length: 14 }).map((_, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-red-400/20 border border-red-400/40 flex items-center justify-center">
                          <span className="text-[9px]">👤</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-red-400">14</span>
                      <span className="text-white/60 text-sm">dzieci w grupie</span>
                    </div>
                    <p className="text-red-400/70 text-xs mt-1">tłok, hałas, walka o uwagę</p>
                  </div>
                  <div className="border-t border-white/10 pt-5">
                    <p className="text-white/50 text-xs mb-1">Dramatyczny brak kadr</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-red-400">1 : 8</span>
                    </div>
                    <p className="text-white/60 text-sm mt-1">opiekun na 8 dzieci</p>
                    <p className="text-red-400/70 text-xs mt-1">tylko dozór i pilnowanie bezpieczeństwa</p>
                  </div>
                </div>
              </div>

              {/* Z AboTax */}
              <div className="bg-white/10 rounded-2xl p-8 border border-green-400/30 ring-2 ring-official-gold/20">
                <p className="text-official-gold text-xs font-semibold uppercase tracking-widest mb-6">Z AboTax — scenariusz bazowy</p>
                <div className="space-y-5">
                  <div>
                    <p className="text-white/50 text-xs mb-1">Odciążony system</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {Array.from({ length: 11 }).map((_, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-green-400/20 border border-green-400/40 flex items-center justify-center">
                          <span className="text-[9px]">👤</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-green-400">~11</span>
                      <span className="text-white/60 text-sm">dzieci w grupie</span>
                    </div>
                    <p className="text-green-400/70 text-xs mt-1">średnia krajowa spada, bo nowe grupy są 7-osobowe, co odciąża cały system.</p>
                  </div>
                  <div className="border-t border-white/10 pt-5">
                    <p className="text-white/50 text-xs mb-1">Standard europejski</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-green-400">1 : 5</span>
                    </div>
                    <p className="text-white/60 text-sm mt-1">opiekun na 5 dzieci</p>
                    <p className="text-green-400/70 text-xs mt-1">czas na rozmowę, relację i wsparcie</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats row */}
          <div className="grid md:grid-cols-3 gap-6 mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="text-sm text-white/60 mb-1">Nowych etatów opiekunów</div>
              <div className="text-3xl font-bold text-white">+1 488</div>
              <div className="text-xs text-white/50">125 mln zł ÷ 84 000 zł/etat</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="text-sm text-white/60 mb-1">Nowych małych grup / rok</div>
              <div className="text-3xl font-bold text-white">~297</div>
              <div className="text-xs text-white/50">po 7 dzieci, 5 etatów każda</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 ring-2 ring-official-gold/30"
            >
              <div className="text-sm text-official-gold/80 mb-1">Wskaźnik opieki</div>
              <div className="text-3xl font-bold text-official-gold">1:8 → 1:5</div>
              <Link to={createPageUrl("Impact")} className="text-xs text-white/50 underline hover:text-white/70 mt-1 block">
                Zobacz pełną analizę →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Koniec z molochami */}
      <section className="py-16 px-4 bg-official-cream">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-abotax-primary/10 rounded-full text-abotax-primary text-sm font-medium mb-4 border border-abotax-primary/20">
              <HomeIcon className="w-4 h-4" />
              Model małych grup
            </div>
            <h2 className="text-3xl font-serif font-bold text-official-navy mb-4">
              Koniec z molochami. Czas na dom.
            </h2>
            <p className="text-official-navy/70 max-w-3xl mx-auto">
              Według aktualnych rejestrów wojewódzkich, w Polsce działa <strong className="text-official-navy">1 238 placówek</strong> opiekuńczo-wychowawczych.
              Fundusz zbiera środki i kieruje je tam, gdzie wskaźnik dzieci na opiekuna jest najgorszy — tworząc nowe, małe grupy rodzinne.
            </p>
          </motion.div>

          {/* How the Fund allocates */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-official-navy/10">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-abotax-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Target className="w-6 h-6 text-abotax-primary" />
                  </div>
                  <h3 className="font-bold text-official-navy mb-2">Automatyczna alokacja</h3>
                  <p className="text-sm text-official-navy/70">
                    Fundusz kieruje środki tam, gdzie wskaźnik dzieci/opiekun jest najgorszy.
                    Nie trzeba aplikować — system sam identyfikuje priorytety.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full border-official-navy/10">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-abotax-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-6 h-6 text-abotax-primary" />
                  </div>
                  <h3 className="font-bold text-official-navy mb-2">Per powiat</h3>
                  <p className="text-sm text-official-navy/70">
                    Fundusz finansuje etaty na poziomie powiatów. Samorząd zapewnia lokal,
                    Fundusz opłaca kadrę — uczciwy podział odpowiedzialności.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full border-official-navy/10">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-abotax-primary/10 flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-6 h-6 text-abotax-primary" />
                  </div>
                  <h3 className="font-bold text-official-navy mb-2">Publiczny Rejestr</h3>
                  <p className="text-sm text-official-navy/70">
                    Ile etatów sfinansowano w każdym powiecie, ile nowych grup powstało —
                    wszystko publicznie, w formie interaktywnej mapy.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-abotax-primary to-abotax-primary-light rounded-2xl p-8 text-white mb-8"
          >
            <h3 className="text-2xl font-bold mb-3">Samorząd daje lokal, AboTax opłaca ludzi</h3>
            <p className="text-white/90 text-lg max-w-3xl">
W Polsce są tysiące pustych mieszkań komunalnych. Przystosowanie mieszkania na mały dom rodzinny to kwestia podstawowego remontu. Prawdziwym, stałym kosztem jest kadra — i dokładnie to finansuje Fundusz. Dzięki AboTax w krótkim czasie na mapie Polski pojawia się <strong>blisko 300 nowych punktów</strong>, do których przenoszone są dzieci z przepełnionych placówek. To nie są kolejne „ośrodki” — to prawdziwe domy.
            </p>
          </motion.div>

          {/* Data-driven: 1238 → ~1535 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-official-navy/10 rounded-2xl p-8 shadow-lg mb-8"
          >
            <div className="text-center mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-abotax-primary mb-2">Dane z rejestrów wojewódzkich (2024–2025)</p>
              <h3 className="text-2xl font-serif font-bold text-official-navy">
                Jak AboTax rozrzedzi system?
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6 items-center mb-8">
              {/* DZIŚ */}
              <div className="text-center">
                <div className="bg-official-red/5 border border-official-red/15 rounded-xl p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-official-red/70 mb-2">Dziś</p>
                  <div className="text-5xl font-bold text-official-navy mb-1">1 238</div>
                  <p className="text-sm text-official-navy/60">placówek w 16 województwach</p>
                  <div className="mt-3 flex flex-wrap justify-center gap-[2px]">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div key={i} className="w-2 h-2 rounded-full bg-official-red/30" />
                    ))}
                  </div>
                  <p className="text-xs text-official-navy/40 mt-2">17 100 dzieci rozlokowanych w tych placówkach</p>
                </div>
              </div>

              {/* STRZAŁKA */}
              <div className="text-center">
                <div className="bg-official-gold/10 border border-official-gold/20 rounded-xl p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-official-gold mb-2">AboTax dodaje</p>
                  <div className="text-5xl font-bold text-official-gold mb-1">+297</div>
                  <p className="text-sm text-official-navy/60">nowych małych grup rocznie</p>
                  <p className="text-xs text-official-navy/40 mt-2">po 7 dzieci, 5 etatów (obsada 24/7)</p>
                  <div className="mt-3">
                    <ArrowRight className="w-8 h-8 text-official-gold mx-auto" />
                  </div>
                </div>
              </div>

              {/* PO */}
              <div className="text-center">
                <div className="bg-abotax-primary/5 border border-abotax-primary/15 rounded-xl p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-abotax-primary/70 mb-2">Po roku AboTax</p>
                  <div className="text-5xl font-bold text-abotax-primary mb-1">~1 535</div>
                  <p className="text-sm text-official-navy/60">placówek i grup w systemie</p>
                  <div className="mt-3 flex flex-wrap justify-center gap-[2px]">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div key={i} className="w-2 h-2 rounded-full bg-abotax-primary/30" />
                    ))}
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={`new-${i}`} className="w-2 h-2 rounded-full bg-official-gold/60" />
                    ))}
                  </div>
                  <p className="text-xs text-official-navy/40 mt-2">te same dzieci, ale rozłożone na więcej punktów</p>
                </div>
              </div>
            </div>

            {/* Progress bar visualization */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-official-navy/60">Dziś: ~14 dzieci / grupa</span>
                  <span className="text-official-red font-semibold">przepełnione</span>
                </div>
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-official-red/60 to-official-red/80 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-official-navy/60">Po AboTax: ~11 dzieci / grupa (średnia)</span>
                  <span className="text-abotax-primary font-semibold">odciążone</span>
                </div>
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-abotax-primary/60 to-abotax-primary/80 rounded-full" style={{ width: '79%' }} />
                </div>
              </div>
            </div>

            <p className="text-xs text-official-navy/50 mt-4 text-center">
              Dane o 1 238 placówkach pochodzą z oficjalnych rejestrów 16 urzędów wojewódzkich (stan 2024–2025).
              Nowe grupy 7-osobowe obniżają średnią krajową z ~14 do ~11 dzieci na grupę.
            </p>
          </motion.div>

          {/* Disclaimers */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white border border-official-navy/10 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <Info className="w-6 h-6 text-official-navy flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-official-navy mb-2">Ważne zastrzeżenia</h3>
                <ul className="text-official-navy/70 text-sm leading-relaxed space-y-2">
                  <li>Obliczenie 5 etatów na grupę to uproszczenie. Realna obsada 24/7 zależy od grafiku, urlopów i rotacji.</li>
                  <li>Dane o 1 238 placówkach pochodzą z publicznych rejestrów wojewódzkich (2024–2025) — obejmują placówki socjalizacyjne, interwencyjne, rodzinne i specjalistyczne.</li>
                  <li>Fundusz nie buduje lokali — finansuje wyłącznie etaty. Współpraca z samorządami wymaga porozumień.</li>
                  <li>Liczby służą ilustracji skali systemu, nie stanowią precyzyjnej prognozy.</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-official-navy via-official-navy to-official-navy/90">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif font-bold text-white mb-6">
              Badania są jasne. System jest gotowy.
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Podpisz petycję i pomóż nam wdrożyć system, który zamieni
              przepełnione placówki w małe, rodzinne domy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("PodpiszPetycje")}>
                <Button size="lg" className="bg-white text-abotax-primary hover:bg-white/90">
                  <FileText className="w-5 h-5 mr-2" />
                  Podpisz petycję
                </Button>
              </Link>
              <Link to={createPageUrl("Impact")}>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Analiza wpływu
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

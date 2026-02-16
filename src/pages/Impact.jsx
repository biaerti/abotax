import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Calculator,
  ArrowRight,
  Heart,
  Info,
  BarChart3,
  Target,
  CheckCircle2,
  FileText,
  Brain,
  Baby,
  AlertTriangle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createPageUrl } from "@/utils/createPageUrl";

export default function Impact() {
  const scenarios = [
    {
      name: "Minimalny",
      abortions: "40 000",
      avgFee: "2 500 zł",
      funding: "100 mln zł",
      caregivers: "~1 190",
      description: "Konserwatywny szacunek zbliżony do szacunków organizacji pro-life",
      color: "bg-blue-100 text-blue-700 border-blue-200"
    },
    {
      name: "Umiarkowany",
      abortions: "50 000",
      avgFee: "2 500 zł",
      funding: "125 mln zł",
      caregivers: "~1 488",
      description: "Bazowy scenariusz — analogia do Czech (15 tys. / 10,7 mln populacji)",
      color: "bg-green-100 text-green-700 border-green-200",
      highlighted: true
    },
    {
      name: "Rozszerzony",
      abortions: "70 000",
      avgFee: "2 500 zł",
      funding: "175 mln zł",
      caregivers: "~2 083",
      description: "Uwzględnia słabszy dostęp do antykoncepcji niż w Czechach",
      color: "bg-amber-100 text-amber-700 border-amber-200"
    }
  ];

  const fosterStats = [
    { label: "Dzieci w pieczy zastępczej (2023)", value: "75 903", icon: Users },
    { label: "W domach dziecka", value: "17 100", icon: Baby },
    { label: "Porzucone noworodki rocznie", value: "715", icon: AlertTriangle, highlight: true },
    { label: "Koszt utrzymania dziecka / rok", value: "~100 000 zł", icon: Calculator }
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
              <BarChart3 className="w-4 h-4" />
              Analiza wpływu AboTax
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Szacunkowy wpływ na system{" "}
              <span className="text-official-gold">pieczy zastępczej</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Obliczenia oparte na danych demograficznych i porównaniu z innymi krajami europejskimi.
              Pokazujemy realistyczne scenariusze, nie skrajne szacunki.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Metodologia — osobna kremowa sekcja */}
      <section className="py-10 px-4 bg-official-cream">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-official-navy/10 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-official-navy/10 flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-official-navy" />
              </div>
              <div>
                <h3 className="font-semibold text-official-navy mb-2">Metodologia szacunków</h3>
                <p className="text-official-navy/70 text-sm leading-relaxed">
                  Szacunki oparto na porównaniu z <strong className="text-official-navy">Czechami</strong> (populacja 10,7 mln,
                  ~15 000 legalnych aborcji rocznie). Przeliczenie proporcjonalne na populację Polski (38 mln) daje
                  około <strong className="text-official-navy">50 000 zabiegów</strong>. Ta wartość mieści się pomiędzy
                  skrajnymi szacunkami organizacji pro-life (7–14 tys.) a organizacji proaborcyjnych (120–150 tys.).
                  Badania WHO wskazują, że legalizacja nie zwiększa liczby aborcji — przenosi je jedynie z szarej strefy
                  do legalnej służby zdrowia.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Obecny stan pieczy — białe tło */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif font-bold text-official-navy mb-4">
              Obecny stan pieczy zastępczej w Polsce
            </h2>
            <p className="text-official-navy/70">Dane za rok 2023</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fosterStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`border-official-navy/10 hover:shadow-lg transition-shadow h-full ${stat.highlight ? 'ring-2 ring-official-red/30' : ''}`}>
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${stat.highlight ? 'bg-official-red/10' : 'bg-abotax-primary/10'}`}>
                      <stat.icon className={`w-6 h-6 ${stat.highlight ? 'text-official-red' : 'text-abotax-primary'}`} />
                    </div>
                    <div className={`text-3xl font-bold mb-2 ${stat.highlight ? 'text-official-red' : 'text-abotax-primary'}`}>{stat.value}</div>
                    <div className="text-sm text-official-navy/70">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 p-6 bg-official-red/5 border-l-4 border-official-red border border-official-red/20 rounded-2xl"
          >
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-official-red flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-official-navy mb-2">Trend wzrostowy</h3>
                <p className="text-official-navy/70 text-sm">
                  W 2023 r. do pieczy zastępczej trafiło <strong>14 901</strong> nowych dzieci
                  (wzrost z 13 661 rok wcześniej). Liczba porzuconych noworodków wzrosła z 643
                  w 2021 r. do 715 w 2023 r. System wymaga pilnego dodatkowego finansowania.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scenariusze + Kluczowe wnioski — kremowe tło (łącznie) */}
      <section className="py-16 px-4 bg-official-cream">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif font-bold text-official-navy mb-4">
              Scenariusze finansowania
            </h2>
            <p className="text-official-navy/70 max-w-2xl mx-auto">
              Przy średnim koszcie zabiegu 2 500 zł, opłata solidarnościowa wynosi również 2 500 zł.
              Poniżej przedstawiamy trzy realistyczne scenariusze.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {scenarios.map((scenario, index) => (
              <motion.div
                key={scenario.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full border-official-navy/10 ${scenario.highlighted ? 'ring-2 ring-abotax-primary shadow-xl' : ''}`}>
                  <CardHeader>
                    <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${scenario.color} mb-2 w-fit`}>
                      Scenariusz {scenario.name}
                    </div>
                    <CardTitle className="text-2xl">{scenario.abortions}</CardTitle>
                    <p className="text-sm text-official-navy/60">zabiegów rocznie</p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="text-4xl font-bold text-abotax-primary">{scenario.funding}</div>
                      <div className="text-sm text-official-navy/60">rocznie dla pieczy zastępczej</div>
                    </div>
                    <div className="bg-abotax-primary/5 rounded-lg p-3 mb-3">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-abotax-primary" />
                        <span className="font-bold text-abotax-primary">{scenario.caregivers}</span>
                        <span className="text-sm text-official-navy/60">nowych etatów/rok</span>
                      </div>
                    </div>
                    <p className="text-sm text-official-navy/70">{scenario.description}</p>
                    {scenario.highlighted && (
                      <div className="mt-4 pt-4 border-t border-abotax-primary/20">
                        <div className="flex items-center gap-2 text-abotax-primary text-sm font-medium">
                          <Target className="w-4 h-4" />
                          Bazowy scenariusz analizy
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* What does 125M mean */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Card className="bg-official-navy text-white border-0">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-serif font-bold mb-4">
                      Co oznacza 125 mln zł rocznie?
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold">~1 488 nowych etatów opiekunów</div>
                          <div className="text-white/70 text-sm">
                            Przy koszcie pracodawcy ~7 000 zł/mies. (84 000 zł/rok)
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                          <Target className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold">~297 nowych małych grup rodzinnych / rok</div>
                          <div className="text-white/70 text-sm">
                            Podział przepełnionych grup na kameralne 7-osobowe "rodzinki"
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold">Średnio 14 → 11 dzieci na grupę</div>
                          <div className="text-white/70 text-sm">
                            Wskaźnik opieki: 1:8 → 1:5 — osiągamy zalecany standard europejski
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">Na co zostaną przeznaczone środki:</h3>
                    <ul className="space-y-2">
                      {[
                        "Zwiększenie liczby opiekunów i pedagogów",
                        "Podział 14-osobowych grup na 7-osobowe rodzinki",
                        "Podwyżki wynagrodzeń (przyciąganie lepszych kandydatów)",
                        "Szkolenia i superwizja opiekunów",
                        "Stabilizacja zatrudnienia (mniejsza rotacja)",
                        "Programy usamodzielniania dla 18+"
                      ].map((use, index) => (
                        <li key={index} className="flex items-center gap-2 text-white/90">
                          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                          {use}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 p-4 bg-white/10 rounded-xl">
                      <p className="text-sm text-white/70">
                        <strong className="text-white">Rekompensata to nie kara</strong> — to Twoja wpłata
                        na godziny obecności dorosłego przy dziecku, które tej obecności potrzebuje.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Link to children impact */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <Link to={createPageUrl("WplywNaRozwoj")}>
              <Button size="lg" className="bg-abotax-primary hover:bg-abotax-primary/90 text-white rounded-xl">
                <Brain className="w-5 h-5 mr-2" />
                Na co dokładnie idą pieniądze?
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Key Insights */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif font-bold text-official-navy mb-4">
              Kluczowe wnioski z analizy
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-official-navy/10 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-abotax-primary" />
                    Realne wsparcie dla systemu
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-official-navy/70">
                    Badanie St. Petersburg udowodniło, że samo szkolenie opiekunów (bez zmniejszenia grup)
                    daje gorsze efekty niż zmiana struktury. Potrzeba więcej osób, nie lepszych szkoleń.
                    125 mln zł rocznie to konkretne etaty, nie kolejne programy pilotażowe.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-official-navy/10 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-abotax-primary" />
                    Matematyka się zgadza
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-official-navy/70">
                    50 tys. zabiegów &times; 2 500 zł = 125 mln zł rocznie. To więcej niż koszt zamknięcia
                    luki kadrowej (~107 mln zł). 297 nowych grup przesuwa średnią z 14 na 11 dzieci
                    i poprawia wskaźnik opieki z 1:8 na 1:5.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full border-official-navy/10 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-abotax-primary" />
                    Legalizacja nie zwiększa liczby aborcji
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-official-navy/70">
                    Badania WHO i Instytutu Guttmachera pokazują, że odsetek niezamierzonych ciąż kończących
                    się aborcją jest zbliżony w państwach z zakazem i z liberalnym prawem. Ograniczenia prawne
                    wpływają bardziej na bezpieczeństwo aborcji niż na ich częstość. Legalizacja przenosi
                    zjawisko z szarej strefy do kontrolowanego systemu zdrowia.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full border-official-navy/10 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-abotax-primary" />
                    Opłata nie zmniejszy liczby aborcji
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-official-navy/70">
                    Obecnie Polki już ponoszą wysokie koszty: zakup tabletek (kilkaset do tysiąca zł)
                    lub wyjazd za granicę (kilka tysięcy). Determinacja w niechcianej ciąży jest na tyle duża,
                    że dodatkowa opłata raczej nie odwiedzie od zamiaru. Celem AboTax jest wsparcie dzieci,
                    nie zmiana zachowań reprodukcyjnych.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
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
              Wesprzyj zmianę. Podpisz petycję.
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Twój podpis pokazuje politykom, że istnieje trzecia droga w sporze aborcyjnym.
              Rozwiązanie oparte na badaniach, matematyce i empatii.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("PodpiszPetycje")}>
                <Button size="lg" className="bg-white text-abotax-primary hover:bg-white/90">
                  <FileText className="w-5 h-5 mr-2" />
                  Podpisz petycję
                </Button>
              </Link>
              <Link to={createPageUrl("WplywNaRozwoj")}>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Wpływ na dzieci
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

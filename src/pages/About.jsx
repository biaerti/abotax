import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import {
  Building2,
  Shield,
  ArrowRight,
  FileText,
  QrCode,
  Landmark,
  Hospital,
  Clock,
  CheckCircle2,
  BarChart3,
  Coins,
  Scale
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const steps = [
    {
      icon: Hospital,
      number: "01",
      title: "Zabieg w klinice",
      description: "Pacjentka udaje się do dowolnej placówki medycznej wykonującej przerwanie ciąży na żądanie - prywatnej lub w ramach NFZ.",
      detail: "Klinika wykonuje zabieg zgodnie ze standardami medycznymi. Cała procedura medyczna jest taka sama jak obecnie."
    },
    {
      icon: FileText,
      number: "02",
      title: "Faktura z dwiema pozycjami",
      description: "Klinika wystawia fakturę zawierającą: koszt zabiegu (np. 2500 zł) oraz opłatę solidarnościową AboTax (równą 100% kosztu - np. 2500 zł).",
      detail: "Łączny koszt dla pacjentki: koszt zabiegu + AboTax. Możliwe rozłożenie AboTax na raty do 12 miesięcy."
    },
    {
      icon: QrCode,
      number: "03",
      title: "Token solidarnościowy",
      description: "Do faktury dołączony jest unikalny token - kod QR lub alfanumeryczny. Pacjentka może go użyć anonimowo w ciągu 30 dni.",
      detail: "Token pozwala wybrać, który dom dziecka otrzyma do 50% jej opłaty solidarnościowej. Wybór jest całkowicie anonimowy."
    },
    {
      icon: Landmark,
      number: "04",
      title: "Klinika odprowadza środki",
      description: "Co miesiąc klinika przekazuje zbiorczy raport i całość zebranych opłat solidarnościowych do Funduszu Rekompensaty Społecznej.",
      detail: "Raport zawiera tylko liczby i anonimowe tokeny - BEZ danych osobowych pacjentek. Fundusz nie wie, kim są płacące osoby."
    },
    {
      icon: Building2,
      number: "05",
      title: "Wsparcie domów dziecka",
      description: "Fundusz dystrybuuje środki: 50% na placówkę wybraną przez pacjentkę (via token), 50% według własnych zasad priorytetyzacji.",
      detail: "Wszystkie środki trafiają na rzecz dzieci w pieczy zastępczej - terapie, edukację, wyposażenie, zajęcia rozwojowe."
    }
  ];

  const keyPoints = [
    {
      icon: Shield,
      title: "Pełna anonimowość",
      description: "Fundusz nigdy nie otrzymuje danych osobowych pacjentek. Klinika przekazuje tylko zbiorcze kwoty i anonimowe tokeny."
    },
    {
      icon: BarChart3,
      title: "Pełna transparentność",
      description: "Fundusz publikuje kwartalne zestawienia wpływów i wydatków oraz podlega corocznemu audytowi zewnętrznemu."
    },
    {
      icon: Scale,
      title: "Podstawa prawna",
      description: "System działa w oparciu o ustawę o Funduszu Rekompensaty Społecznej - nie jest to darowizna, lecz opłata publicznoprawna."
    },
    {
      icon: Coins,
      title: "Bez VAT",
      description: "Opłata solidarnościowa nie podlega opodatkowaniu VAT - 100% kwoty trafia do domów dziecka (minus 3% na obsługę)."
    }
  ];

  return (
    <div className="min-h-screen bg-official-cream">
      {/* Hero */}
      <section className="bg-gradient-to-br from-official-navy via-official-navy to-official-navy/90 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-official-gold/20 rounded-full text-official-gold text-sm font-medium mb-6 border border-official-gold/30">
              <Clock className="w-4 h-4" />
              5 prostych kroków
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
              Jak działa system <span className="text-official-gold">AboTax</span>?
            </h1>
            <p className="text-white/80 text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
              Od zabiegu w klinice do wsparcia konkretnego domu dziecka -
              cały proces jest prosty, anonimowy i transparentny.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-official-navy/5 to-abotax-primary/5 rounded-2xl p-8 lg:p-12 border border-official-navy/10"
          >
            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-official-navy mb-6 text-center">
              W skrócie
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-official-navy flex items-center justify-center mx-auto mb-4">
                  <Hospital className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-official-navy mb-2">Klinika</h3>
                <p className="text-sm text-official-navy/70">
                  Wykonuje zabieg, wystawia fakturę z AboTax i tokenem
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-official-gold flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-official-navy mb-2">Pacjentka</h3>
                <p className="text-sm text-official-navy/70">
                  Płaci fakturę i może anonimowo wybrać dom dziecka tokenem
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-abotax-success flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-official-navy mb-2">Domy dziecka</h3>
                <p className="text-sm text-official-navy/70">
                  Otrzymują środki na wsparcie podopiecznych
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detailed Steps */}
      <section className="py-16 lg:py-24 bg-official-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-official-navy mb-4">
              Krok po kroku
            </h2>
            <p className="text-official-navy/60 max-w-2xl mx-auto">
              Szczegółowy opis każdego etapu procesu
            </p>
          </motion.div>

          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow border-official-navy/10">
                    <CardContent className="p-0">
                      <div className="flex flex-col lg:flex-row">
                        {/* Number & Icon */}
                        <div className="lg:w-48 bg-gradient-to-br from-official-navy to-official-navy/80 p-6 lg:p-8 flex lg:flex-col items-center justify-center gap-4">
                          <span className="text-4xl lg:text-5xl font-bold text-white/30">{step.number}</span>
                          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                            <Icon className="w-8 h-8 text-official-gold" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6 lg:p-8">
                          <h3 className="text-xl lg:text-2xl font-bold text-official-navy mb-3">
                            {step.title}
                          </h3>
                          <p className="text-official-navy/70 mb-4 leading-relaxed">
                            {step.description}
                          </p>
                          <div className="flex items-start gap-3 bg-official-cream rounded-xl p-4 border border-official-navy/10">
                            <CheckCircle2 className="w-5 h-5 text-abotax-success flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-official-navy/70">
                              {step.detail}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Points */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-official-navy mb-4">
              Kluczowe cechy systemu
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-official-cream rounded-2xl p-6 text-center hover:shadow-lg transition-shadow border border-official-navy/10"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-abotax-primary to-abotax-primary-light flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-official-navy mb-2">{point.title}</h3>
                  <p className="text-sm text-official-navy/60">{point.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Example Calculation */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-official-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif font-bold text-official-navy mb-8 text-center">
              Przykładowe rozliczenie
            </h2>

            <Card className="bg-white shadow-xl border-official-navy/10">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Invoice breakdown */}
                  <div>
                    <h3 className="font-semibold text-official-navy mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-abotax-primary" />
                      Faktura od kliniki
                    </h3>
                    <div className="bg-official-cream rounded-xl p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-official-navy/70">Zabieg przerwania ciąży na żądanie</span>
                        <span className="font-semibold text-official-navy">2 500 zł</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-official-navy/70">Opłata solidarnościowa AboTax</span>
                        <span className="font-semibold text-official-navy">2 500 zł</span>
                      </div>
                      <div className="border-t border-abotax-primary/20 pt-3 flex justify-between items-center">
                        <span className="font-bold text-official-navy">Razem do zapłaty</span>
                        <span className="font-bold text-abotax-primary text-xl">5 000 zł</span>
                      </div>
                    </div>
                  </div>

                  {/* AboTax distribution */}
                  <div>
                    <h3 className="font-semibold text-official-navy mb-4 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-abotax-primary" />
                      Podział opłaty AboTax (2 500 zł)
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-abotax-primary/10 rounded-xl p-4">
                        <p className="text-sm text-official-navy/60 mb-1">Wybór pacjentki (via token)</p>
                        <p className="text-2xl font-bold text-abotax-primary">do 1 250 zł</p>
                        <p className="text-xs text-official-navy/50 mt-2">50% na wybrany dom dziecka</p>
                      </div>
                      <div className="bg-abotax-secondary/10 rounded-xl p-4">
                        <p className="text-sm text-official-navy/60 mb-1">Dystrybucja Funduszu</p>
                        <p className="text-2xl font-bold text-abotax-secondary">od 1 250 zł</p>
                        <p className="text-xs text-official-navy/50 mt-2">Wg zasad priorytetyzacji</p>
                      </div>
                    </div>
                    <p className="text-xs text-official-navy/50 mt-4 text-center">
                      * Jeśli pacjentka nie użyje tokena, całość (2 500 zł) zostanie rozdzielona przez Fundusz
                    </p>
                  </div>

                  {/* Payment options */}
                  <div className="border-t border-abotax-primary/10 pt-6">
                    <h3 className="font-semibold text-official-navy mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-abotax-primary" />
                      Opcje płatności AboTax
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-abotax-success flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-official-navy">Płatność jednorazowa</p>
                          <p className="text-sm text-official-navy/60">W ciągu 30 dni od faktury</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-abotax-success flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-official-navy">Raty (do 12 miesięcy)</p>
                          <p className="text-sm text-official-navy/60">Umowa pisemna z kliniką</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ quick links */}
      <section className="py-16 lg:py-24 bg-official-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-serif font-bold text-official-navy mb-6">
              Masz więcej pytań?
            </h2>
            <p className="text-official-navy/70 mb-8 max-w-2xl mx-auto">
              Sprawdź szczegóły dotyczące anonimowości, przeczytaj projekt ustawy
              lub zobacz odpowiedzi na najczęściej zadawane pytania.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Privacy")}>
                <Button size="lg" variant="outline" className="border-abotax-primary text-abotax-primary rounded-xl">
                  <Shield className="w-5 h-5 mr-2" />
                  Anonimowość
                </Button>
              </Link>
              <Link to={createPageUrl("ProjektUstawy")}>
                <Button size="lg" className="bg-abotax-primary hover:bg-abotax-primary-light text-white rounded-xl">
                  <FileText className="w-5 h-5 mr-2" />
                  Projekt ustawy
                </Button>
              </Link>
              <Link to={createPageUrl("FAQ")}>
                <Button size="lg" variant="outline" className="border-abotax-primary text-abotax-primary rounded-xl">
                  FAQ
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-official-navy via-official-navy to-official-navy/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
              Zobacz szacunkowy wpływ systemu
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Ile środków może trafić do domów dziecka? Jak to wpłynie na życie podopiecznych?
              Zobacz analizę opartą na danych demograficznych.
            </p>
            <Link to={createPageUrl("Impact")}>
              <Button size="lg" className="bg-white text-abotax-primary hover:bg-white/90 rounded-xl">
                <BarChart3 className="w-5 h-5 mr-2" />
                Analiza wpływu
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

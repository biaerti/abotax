import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Eye,
  Lock,
  FileText,
  CheckCircle2,
  AlertCircle,
  Building2,
  ArrowRight,
  QrCode,
  Landmark,
  Hospital,
  UserX,
  Database,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Privacy() {
  const dataFlow = [
    {
      icon: Hospital,
      title: "Klinika wykonuje zabieg",
      description: "Placówka wystawia fakturę z dwoma pozycjami: koszt zabiegu i opłata solidarnościowa AboTax",
      detail: "Klinika generuje unikalny token solidarnościowy (kod QR) dołączony do faktury",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: QrCode,
      title: "Pacjentka używa tokena",
      description: "W ciągu 30 dni pacjentka może anonimowo wybrać dom dziecka przez system z tokenem",
      detail: "Token nie jest powiązany z danymi osobowymi - to tylko alfanumeryczny kod",
      color: "from-abotax-primary to-abotax-primary-light"
    },
    {
      icon: Building2,
      title: "Klinika płaci Funduszowi",
      description: "Placówka odprowadza całość opłaty solidarnościowej do Funduszu w zbiorczym raporcie",
      detail: "Raport zawiera tylko: liczbę zabiegów, łączne kwoty, tokeny - BEZ danych pacjentek",
      color: "from-official-gold to-amber-600"
    },
    {
      icon: Landmark,
      title: "Fundusz dystrybuuje środki",
      description: "Fundusz przekazuje 50% na placówkę wybraną przez pacjentkę (via token), 50% wg własnych zasad",
      detail: "Fundusz NIE GROMADZI i NIE PRZETWARZA danych osobowych pacjentek",
      color: "from-abotax-success to-green-600"
    }
  ];

  const guarantees = [
    {
      icon: UserX,
      title: "Fundusz nie zna tożsamości",
      description: "Art. 15 ustawy: Fundusz nie gromadzi ani nie przetwarza danych osobowych pacjentek. Placówka nie przekazuje żadnych danych osobowych do Funduszu."
    },
    {
      icon: Database,
      title: "Raport bez danych wrażliwych",
      description: "Art. 10 ustawy: Zestawienie przekazywane do Funduszu NIE ZAWIERA danych osobowych pacjentek ani żadnych informacji pozwalających na ich identyfikację."
    },
    {
      icon: QrCode,
      title: "Token = anonimowość wyboru",
      description: "Art. 12 ustawy: Token solidarnościowy umożliwia ANONIMOWE wskazanie placówki pieczy zastępczej. Klinika nie łączy tokenów z danymi osobowymi."
    },
    {
      icon: ShieldCheck,
      title: "Ochrona na poziomie prawa",
      description: "Cały system jest zaprojektowany ustawowo tak, aby uniemożliwić identyfikację pacjentek nawet przy próbie nadużycia."
    }
  ];

  const comparisonItems = [
    { oldModel: "Pacjentka wrzuca fakturę na stronę", newModel: "Klinika rozlicza się za pacjentkę" },
    { oldModel: "OCR odczytuje dane z dokumentu", newModel: "Fundusz otrzymuje tylko zbiorcze liczby" },
    { oldModel: "System musi weryfikować pacjentkę", newModel: "Fundusz nie wie kim jest pacjentka" },
    { oldModel: "Dane mogą wyciec", newModel: "Nie ma danych do wycieku" }
  ];

  return (
    <div className="min-h-screen bg-official-cream">
      {/* Hero */}
      <section className="bg-gradient-to-br from-official-navy via-official-navy to-official-navy/90 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-official-gold/20 rounded-full text-official-gold text-sm font-medium mb-6 border border-official-gold/30">
              <Shield className="w-4 h-4" />
              Ochrona prywatności
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
              Anonimowość przez konstrukcję
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Fundusz AboTax <span className="font-semibold">z założenia nie gromadzi</span> danych osobowych pacjentek.
              To nie kwestia zabezpieczeń - to kwestia architektury systemu.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Message */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-abotax-primary/5 to-abotax-secondary/5 rounded-2xl p-8 lg:p-12 border border-official-navy/10"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-abotax-success flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-serif font-bold text-official-navy mb-4">
                  Kluczowa różnica: to klinika płaci Funduszowi
                </h2>
                <p className="text-official-navy/80 text-lg leading-relaxed mb-4">
                  W systemie AboTax <span className="font-semibold text-abotax-primary">pacjentka nigdy nie kontaktuje się bezpośrednio z Funduszem</span>.
                  Wszystkie rozliczenia przechodzą przez placówkę medyczną, która:
                </p>
                <ul className="space-y-2 text-official-navy/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-abotax-success flex-shrink-0 mt-0.5" />
                    Wystawia fakturę pacjentce (tak jak za każdy inny zabieg)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-abotax-success flex-shrink-0 mt-0.5" />
                    Odprowadza opłatę solidarnościową do Funduszu w zbiorczym raporcie
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-abotax-success flex-shrink-0 mt-0.5" />
                    <span><strong>NIE przekazuje</strong> do Funduszu żadnych danych osobowych pacjentek</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Data Flow */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-official-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-official-navy mb-4">
              Jak przepływają dane (i dlaczego są anonimowe)
            </h2>
            <p className="text-official-navy/60 text-lg max-w-2xl mx-auto">
              System zaprojektowany tak, że Fundusz fizycznie nie może poznać tożsamości pacjentek
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {dataFlow.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative mb-8 last:mb-0"
                >
                  <div className="flex items-start gap-6 lg:gap-8">
                    {/* Icon & Connector */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      {index < dataFlow.length - 1 && (
                        <div className="w-0.5 h-16 bg-gradient-to-b from-official-navy/30 to-transparent mt-4" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-official-navy/10">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm font-bold text-abotax-primary bg-abotax-primary/10 px-3 py-1 rounded-full">
                          {index + 1}
                        </span>
                        <h3 className="text-xl lg:text-2xl font-bold text-official-navy">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-official-navy/70 mb-4">{step.description}</p>
                      <div className="flex items-start gap-3 bg-abotax-success/10 rounded-xl p-4">
                        <Shield className="w-5 h-5 text-abotax-success flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-official-navy/80 font-medium">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Token Explanation */}
      <section className="py-16 lg:py-24 bg-official-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-serif font-bold text-official-navy mb-6">
                Token solidarnościowy - Twój anonimowy głos
              </h2>
              <p className="text-official-navy/70 mb-6 leading-relaxed">
                Na fakturze za zabieg znajdziesz <strong>token solidarnościowy</strong> - unikalny kod QR
                lub ciąg znaków. Możesz go użyć w ciągu 30 dni, aby anonimowo wskazać,
                który dom dziecka otrzyma do 50% Twojej opłaty solidarnościowej.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-abotax-primary/10 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-4 h-4 text-abotax-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-official-navy">Token nie zdradza tożsamości</h4>
                    <p className="text-sm text-official-navy/70">To tylko alfanumeryczny kod - nie ma w nim żadnych danych osobowych</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-abotax-primary/10 flex items-center justify-center flex-shrink-0">
                    <Eye className="w-4 h-4 text-abotax-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-official-navy">Klinika nie łączy tokena z Tobą</h4>
                    <p className="text-sm text-official-navy/70">Art. 12 ust. 4: Placówka zachowuje rejestr tokenów, ale nie łączy ich z danymi osobowymi</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-abotax-primary/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-4 h-4 text-abotax-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-official-navy">Możesz nie używać tokena</h4>
                    <p className="text-sm text-official-navy/70">Jeśli nie wybierzesz placówki, Fundusz rozdzieli całość wg własnych zasad</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white shadow-xl border-official-navy/10">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-official-navy to-official-navy/80 rounded-2xl flex items-center justify-center mb-4">
                      <QrCode className="w-16 h-16 text-white" />
                    </div>
                    <p className="text-sm text-official-navy/60">Przykładowy token solidarnościowy</p>
                  </div>
                  <div className="bg-official-cream rounded-xl p-4 font-mono text-center text-lg tracking-wider text-abotax-primary">
                    ABT-2024-X7K9-M2PL
                  </div>
                  <p className="text-xs text-official-navy/50 text-center mt-4">
                    Token jest ważny 30 dni od daty wystawienia faktury
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Legal Guarantees */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-official-navy mb-4">
              Gwarancje zapisane w ustawie
            </h2>
            <p className="text-official-navy/60 text-lg max-w-2xl mx-auto">
              Ochrona prywatności jest wbudowana w prawo, nie tylko w technologię
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {guarantees.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-white to-official-cream rounded-2xl p-6 lg:p-8 shadow-lg border border-official-navy/10 hover:shadow-xl transition-shadow"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-official-navy to-official-navy/80 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-official-navy mb-3">
                    {item.title}
                  </h3>
                  <p className="text-official-navy/70 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison - why this is better */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-official-cream to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif font-bold text-official-navy mb-8 text-center">
              Dlaczego ten model jest bezpieczniejszy?
            </h2>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-2">
                <div className="bg-red-50 p-4 text-center font-semibold text-red-700 border-b border-red-100">
                  Alternatywny model (ryzykowny)
                </div>
                <div className="bg-green-50 p-4 text-center font-semibold text-green-700 border-b border-green-100">
                  Model AboTax (bezpieczny)
                </div>
              </div>
              {comparisonItems.map((item, index) => (
                <div key={index} className="grid grid-cols-2 border-b border-gray-100 last:border-b-0">
                  <div className="p-4 text-sm text-red-700/80 flex items-center gap-2 bg-red-50/50">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {item.oldModel}
                  </div>
                  <div className="p-4 text-sm text-green-700/80 flex items-center gap-2 bg-green-50/50">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    {item.newModel}
                  </div>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 p-6 bg-abotax-primary/5 rounded-2xl border border-official-navy/10"
            >
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-abotax-primary flex-shrink-0 mt-1" />
                <p className="text-official-navy/80">
                  <strong>Kluczowa zasada:</strong> Fundusz nigdy nie przetwarza danych osobowych pacjentek.
                  Nie dlatego, że je chroni - ale dlatego, że <em>nigdy ich nie otrzymuje</em>.
                  To jest różnica między "chronimy dane" a "nie mamy danych do ochrony".
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl lg:text-3xl font-serif font-bold text-official-navy mb-8 text-center">
            Najczęstsze pytania o prywatność
          </h3>

          <div className="space-y-4">
            {[
              {
                q: "Czy ktokolwiek może stworzyć 'listę aborcji' na podstawie danych z AboTax?",
                a: "Nie. Fundusz otrzymuje tylko zbiorcze dane: liczbę zabiegów, łączne kwoty i anonimowe tokeny. Nie ma żadnych danych osobowych, które mogłyby posłużyć do identyfikacji. Nawet gdyby ktoś włamał się do systemu, nie znalazłby tam imion, nazwisk ani żadnych danych medycznych.",
              },
              {
                q: "A co z kliniką - ona zna moje dane?",
                a: "Tak, ale klinika zna Twoje dane niezależnie od AboTax - tak samo jak przy każdym innym zabiegu medycznym. AboTax nie dodaje żadnego nowego miejsca, gdzie Twoje dane są przechowywane. Klinika prowadzi dokumentację medyczną zgodnie z prawem, ale do Funduszu przekazuje tylko zbiorcze liczby.",
              },
              {
                q: "Co jeśli użyję tokena - czy wtedy ktoś będzie wiedział?",
                a: "Użycie tokena jest w pełni anonimowe. System wie tylko, że 'token X wybrał dom dziecka Y'. Nie wie, kim jest osoba za tokenem. Klinika ma rejestr tokenów, ale zgodnie z art. 12 ust. 4 ustawy NIE ŁĄCZY ich z danymi osobowymi.",
              },
              {
                q: "A co jeśli nie zapłacę opłaty solidarnościowej?",
                a: "Tylko w przypadku egzekucji administracyjnej (art. 13) klinika może przekazać dane do naczelnika urzędu skarbowego - ale to dotyczy dochodzenia należności, nie Funduszu. Fundusz nadal nie otrzymuje żadnych danych osobowych.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-official-cream rounded-xl p-6 border border-official-navy/10"
              >
                <h4 className="font-semibold text-official-navy mb-2 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-abotax-primary flex-shrink-0 mt-0.5" />
                  {faq.q}
                </h4>
                <p className="text-official-navy/70 pl-7">{faq.a}</p>
              </motion.div>
            ))}
          </div>
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
              Przeczytaj pełny tekst projektu ustawy
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Wszystkie gwarancje prywatności są zapisane w projekcie ustawy.
              Zobacz Art. 10, 12 i 15 dotyczące ochrony danych.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("ProjektUstawy")}>
                <Button size="lg" className="bg-white text-abotax-primary hover:bg-white/90 rounded-xl px-8">
                  <FileText className="w-5 h-5 mr-2" />
                  Projekt ustawy
                </Button>
              </Link>
              <Link to={createPageUrl("About")}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 rounded-xl px-8"
                >
                  Jak działa system
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

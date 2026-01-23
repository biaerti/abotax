import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  Users,
  Scale,
  AlertTriangle,
  ArrowRight,
  Shield,
  Landmark,
  Hospital,
  BarChart3,
  QrCode,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImpactCounter from "@/components/ui/ImpactCounter";
import { createPageUrl } from "@/utils/createPageUrl";

export default function ProjektUstawy() {
  // Mock data - będzie z Supabase
  const signatureCount = 127847;

  const chapters = [
    {
      id: "general",
      title: "Przepisy ogólne",
      articles: [
        {
          number: "Art. 1",
          title: "Zakres ustawy",
          content: "Ustawa ustanawia Fundusz Rekompensaty Społecznej oraz określa zasady wnoszenia i rozliczania opłaty solidarnościowej (AboTax) związanej z przerwaniem ciąży na żądanie. Ustawa nie reguluje przesłanek dopuszczalności przerwania ciąży."
        },
        {
          number: "Art. 2",
          title: "Definicje",
          content: "Opłata solidarnościowa (AboTax) oznacza opłatę publicznoprawną równą 100% kosztu zabiegu przerwania ciąży. Token solidarnościowy to unikalny kod umożliwiający anonimowe wskazanie placówki pieczy zastępczej."
        }
      ]
    },
    {
      id: "fund",
      title: "Fundusz Rekompensaty",
      articles: [
        {
          number: "Art. 3",
          title: "Utworzenie Funduszu",
          content: "Tworzy się Fundusz Rekompensaty Społecznej jako państwowy fundusz celowy. Dysponentem Funduszu jest minister właściwy do spraw rodziny."
        },
        {
          number: "Art. 5",
          title: "Wydatki Funduszu",
          content: "Środki przeznacza się wyłącznie na: wsparcie placówek pieczy zastępczej, terapię psychologiczną, edukację, wyposażenie oraz zajęcia rozwojowe. Koszty administracyjne nie mogą przekroczyć 3% przychodów."
        },
        {
          number: "Art. 6",
          title: "Transparentność",
          content: "Dysponent publikuje co najmniej raz na kwartał zestawienie wpływów i wydatków. Fundusz podlega corocznemu audytowi zewnętrznemu - raporty są publicznie dostępne."
        }
      ]
    },
    {
      id: "payment",
      title: "Opłata solidarnościowa",
      articles: [
        {
          number: "Art. 7",
          title: "Wysokość opłaty",
          content: "Wysokość opłaty solidarnościowej jest równa 100% kosztu zabiegu. Opłatę uiszcza pacjentka na rzecz podmiotu wykonującego zabieg."
        },
        {
          number: "Art. 8",
          title: "Faktura i token",
          content: "Placówka wystawia fakturę z kosztem zabiegu i AboTax jako odrębne pozycje oraz dołącza token solidarnościowy. Opłata solidarnościowa nie podlega VAT."
        },
        {
          number: "Art. 9",
          title: "Terminy i raty",
          content: "Pacjentka płaci w terminie 30 dni. Możliwe rozłożenie na raty do 12 miesięcy. Klinika odprowadza środki do Funduszu niezależnie od spłaty rat."
        }
      ]
    },
    {
      id: "token",
      title: "Token solidarnościowy",
      articles: [
        {
          number: "Art. 12",
          title: "Anonimowy wybór",
          content: "Token umożliwia pacjentce anonimowe wskazanie placówki pieczy zastępczej. W ciągu 30 dni może przypisać do 50% opłaty na wybraną placówkę. Klinika nie łączy tokenów z danymi osobowymi."
        }
      ]
    },
    {
      id: "privacy",
      title: "Ochrona danych",
      articles: [
        {
          number: "Art. 10",
          title: "Raportowanie",
          content: "Klinika przekazuje do Funduszu tylko: liczbę zabiegów, łączne kwoty, identyfikatory tokenów. Zestawienie NIE ZAWIERA danych osobowych pacjentek."
        },
        {
          number: "Art. 15",
          title: "Zakaz przetwarzania",
          content: "Fundusz NIE GROMADZI ani NIE PRZETWARZA danych osobowych pacjentek. Klinika nie przekazuje Funduszowi żadnych danych osobowych."
        }
      ]
    }
  ];

  const keyFeatures = [
    {
      icon: Hospital,
      title: "Klinika rozlicza",
      description: "Placówka medyczna wystawia fakturę i odprowadza środki"
    },
    {
      icon: QrCode,
      title: "Token = anonimowość",
      description: "Kod QR pozwala wybrać dom dziecka bez ujawniania tożsamości"
    },
    {
      icon: Shield,
      title: "Zero danych osobowych",
      description: "Fundusz nigdy nie otrzymuje informacji o pacjentkach"
    },
    {
      icon: BarChart3,
      title: "Pełna transparentność",
      description: "Kwartalne raporty i coroczny audyt zewnętrzny"
    }
  ];

  return (
    <div className="min-h-screen bg-official-cream">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-official-navy via-official-navy to-official-navy/90">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-official-gold/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-white/20 text-white border-white/30 mb-6">
                <Scale className="w-3 h-3 mr-1" />
                Projekt ustawy o Funduszu Rekompensaty Społecznej
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-5xl font-serif font-bold text-white mb-6"
            >
              Pełny tekst projektu ustawy
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/80 mb-8"
            >
              18 artykułów definiujących mechanizm solidarnościowy
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a href="/projekt-ustawy.pdf" download>
                <Button size="lg" className="bg-white text-official-navy hover:bg-white/90">
                  <Download className="w-5 h-5 mr-2" />
                  Pobierz PDF
                </Button>
              </a>
              <Link to={createPageUrl("PodpiszPetycje")}>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <FileText className="w-5 h-5 mr-2" />
                  Podpisz petycję
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-12 bg-white border-b border-official-navy/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-abotax-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-abotax-primary" />
                  </div>
                  <h3 className="font-semibold text-official-navy text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-official-navy/60">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Preamble */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="mb-12 border-official-navy/20 bg-gradient-to-br from-official-cream to-white">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-official-navy/10 flex items-center justify-center">
                    <Landmark className="w-5 h-5 text-official-navy" />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-official-navy">Preambuła</h3>
                </div>
                <p className="text-official-navy/70 leading-relaxed italic text-lg">
                  W poczuciu odpowiedzialności za los dzieci pozbawionych opieki rodzicielskiej
                  oraz w celu łagodzenia konfliktu społecznego wokół przerywania ciąży
                  ustanawia się mechanizm solidarnościowy. Umożliwia on legalne przerwanie ciąży
                  na żądanie kobiety w określonych granicach, przy czym wprowadza ekonomiczną
                  rekompensatę na rzecz społeczeństwa. Mechanizm ten zapewnia anonimowość
                  pacjentek oraz pełną przejrzystość wydatkowania środków.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Chapters Tabs */}
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="w-full flex-wrap h-auto gap-2 bg-transparent p-0 mb-8">
              {chapters.map((chapter) => (
                <TabsTrigger
                  key={chapter.id}
                  value={chapter.id}
                  className="data-[state=active]:bg-official-navy data-[state=active]:text-white bg-white border border-official-navy/20 rounded-lg px-4 py-2 text-sm"
                >
                  {chapter.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {chapters.map((chapter) => (
              <TabsContent key={chapter.id} value={chapter.id}>
                <div className="space-y-4">
                  {chapter.articles.map((article, index) => (
                    <motion.div
                      key={article.number}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="border-official-navy/10 hover:border-official-navy/30 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <span className="flex-shrink-0 w-16 h-8 bg-official-navy/10 rounded-lg flex items-center justify-center text-sm font-bold text-official-navy">
                              {article.number}
                            </span>
                            <div>
                              <h4 className="font-semibold text-official-navy mb-2">{article.title}</h4>
                              <p className="text-official-navy/70 leading-relaxed">{article.content}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Important Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Ważna uwaga</h4>
                  <p className="text-blue-800/80">
                    Art. 17: Przepisy dotyczące opłaty solidarnościowej stosuje się wyłącznie
                    po wejściu w życie odrębnych przepisów dopuszczających przerwanie ciąży
                    na żądanie do 12. tygodnia ciąży. Do tego czasu Fundusz może przyjmować
                    dobrowolne wpłaty i darowizny.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Petition Widget */}
      <section className="py-16 bg-gradient-to-br from-abotax-primary to-abotax-primary/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-serif font-bold text-white mb-4">
                  Popierasz projekt?
                </h2>
                <p className="text-white/80 mb-4">
                  Dołącz do <span className="font-bold text-white">{signatureCount.toLocaleString('pl-PL')}</span> osób,
                  które już podpisały petycję za Funduszem Rekompensaty.
                </p>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  Szybkie i bezpieczne
                </div>
              </div>
              <div className="text-center md:text-right">
                <Link to={createPageUrl("PodpiszPetycje")}>
                  <Button size="lg" className="bg-white text-abotax-primary hover:bg-white/90 shadow-lg">
                    <FileText className="w-5 h-5 mr-2" />
                    Podpisz petycję
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-official-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif font-bold text-official-navy text-center mb-8">
            Dowiedz się więcej
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link to={createPageUrl("About")}>
              <Card className="border-official-navy/10 hover:border-official-navy/30 transition-all hover:shadow-lg h-full">
                <CardContent className="p-6">
                  <Scale className="w-8 h-8 text-abotax-primary mb-4" />
                  <h3 className="font-semibold text-official-navy mb-2">Jak działa system</h3>
                  <p className="text-sm text-official-navy/60">
                    Poznaj mechanizm klinika-token-fundusz
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link to={createPageUrl("Privacy")}>
              <Card className="border-official-navy/10 hover:border-official-navy/30 transition-all hover:shadow-lg h-full">
                <CardContent className="p-6">
                  <Shield className="w-8 h-8 text-abotax-primary mb-4" />
                  <h3 className="font-semibold text-official-navy mb-2">Anonimowość</h3>
                  <p className="text-sm text-official-navy/60">
                    Jak chronimy dane pacjentek
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link to={createPageUrl("Impact")}>
              <Card className="border-official-navy/10 hover:border-official-navy/30 transition-all hover:shadow-lg h-full">
                <CardContent className="p-6">
                  <BarChart3 className="w-8 h-8 text-abotax-primary mb-4" />
                  <h3 className="font-semibold text-official-navy mb-2">Szacunkowy wpływ</h3>
                  <p className="text-sm text-official-navy/60">
                    125 mln zł rocznie dla domów dziecka
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

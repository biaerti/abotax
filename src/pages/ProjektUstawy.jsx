import React, { useState, useEffect } from "react";
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
  CheckCircle2,
  Brain,
  Building2,
  Home,
  Calculator,
  Lock,
  RefreshCw
} from "lucide-react";
import { db } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createPageUrl } from "@/utils/createPageUrl";

export default function ProjektUstawy() {
  const [signatureCount, setSignatureCount] = useState(null);

  useEffect(() => {
    db.petition.getCount().then(setSignatureCount);
    const unsubscribe = db.petition.subscribeToCount(setSignatureCount);
    return unsubscribe;
  }, []);

  const chapters = [
    {
      id: "general",
      title: "Przepisy ogólne",
      articles: [
        {
          number: "Art. 1",
          title: "Zakres ustawy",
          content: 'Ustawa ustanawia Fundusz Rekompensaty Społecznej, zwany dalej \u201EFunduszem\u201D, oraz określa zasady wnoszenia, rozliczania i przekazywania opłaty solidarnościowej, zwanej \u201EAboTax\u201D, związanej z przerwaniem ciąży na żądanie. Ustawa nie reguluje przesłanek dopuszczalności przerwania ciąży.'
        },
        {
          number: "Art. 2",
          title: "Definicje",
          content: "Użyte w ustawie określenia oznaczają: 1) opłata solidarnościowa (AboTax) — opłata publicznoprawna równa 100% kosztu zabiegu przerwania ciąży, odprowadzana przez placówkę medyczną do Funduszu; 2) placówka — podmiot leczniczy wykonujący zabiegi przerwania ciąży na podstawie zezwolenia; 3) etat opiekuna — pełnoetatowe zatrudnienie wychowawcy lub opiekuna w placówce pieczy zastępczej; 4) samorząd — jednostka samorządu terytorialnego (gmina lub powiat) prowadząca lub zamierzająca prowadzić placówkę pieczy zastępczej; 5) wskaźnik kadrowy — stosunek liczby dzieci w placówce do liczby zatrudnionych wychowawców."
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
          content: "Tworzy się Fundusz Rekompensaty Społecznej jako państwowy fundusz celowy w rozumieniu ustawy o finansach publicznych. Dysponentem Funduszu jest minister właściwy do spraw rodziny."
        },
        {
          number: "Art. 4",
          title: "Przychody Funduszu",
          content: "Przychodami Funduszu są: 1) opłaty solidarnościowe (AboTax) odprowadzane przez placówki medyczne; 2) dobrowolne darowizny od osób fizycznych i prawnych; 3) odsetki od środków zgromadzonych na rachunku Funduszu."
        },
        {
          number: "Art. 5",
          title: "Wydatki Funduszu",
          content: "Środki Funduszu przeznacza się wyłącznie na finansowanie etatów wychowawców i opiekunów w placówkach pieczy zastępczej prowadzonych przez samorządy. Co najmniej 98% przychodów trafia bezpośrednio na wynagrodzenia — koszty administracyjne Funduszu nie mogą przekroczyć 2% rocznych przychodów. Fundusz nie finansuje remontów, wyposażenia ani programów terapeutycznych."
        },
        {
          number: "Art. 6",
          title: "Publiczny Rejestr Etatów i transparentność",
          content: "Dysponent prowadzi i publicznie udostępnia Rejestr Etatów zawierający: liczbę etatów sfinansowanych w każdym powiecie, kwoty przekazane poszczególnym samorządom oraz aktualny wskaźnik kadrowy w dofinansowanych placówkach. Rejestr jest aktualizowany co kwartał. Fundusz podlega corocznemu niezależnemu audytowi zewnętrznemu — raport jest publicznie dostępny."
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
          content: "Wysokość opłaty solidarnościowej jest równa 100% kosztu zabiegu przerwania ciąży. Opłatę uiszcza pacjentka na rzecz placówki wykonującej zabieg. Opłata stanowi rekompensatę solidarnościową — nie jest karą ani podatkiem, lecz wkładem w poprawę warunków opieki nad dziećmi pozbawionymi opieki rodzicielskiej."
        },
        {
          number: "Art. 8",
          title: "Faktura z dwiema pozycjami",
          content: "Placówka wystawia pacjentce fakturę zawierającą dwie odrębne pozycje: 1) koszt usługi medycznej (zabiegu); 2) opłata solidarnościowa AboTax. Opłata solidarnościowa nie podlega podatkowi VAT. Na fakturze nie umieszcza się żadnych danych pozwalających na identyfikację pacjentki przez Fundusz."
        },
        {
          number: "Art. 9",
          title: "Raty i rozliczenie roczne",
          content: "Pacjentka może opłacić AboTax jednorazowo lub — na podstawie porozumienia z placówką — w ratach rozłożonych na okres do 12 miesięcy od daty zabiegu. Placówka może zaproponować podział opłaty 50/50 między pacjentkę a jej partnera. Placówka odprowadza zebrane środki do Funduszu w terminie do 31 marca roku następującego po roku, w którym wykonano zabiegi. Ryzyko windykacji należności od pacjentek spoczywa wyłącznie na placówce — Fundusz rozlicza się z placówką, nie z pacjentką."
        },
        {
          number: "Art. 10",
          title: "Raportowanie i anonimowość",
          content: "Placówka przekazuje Funduszowi wyłącznie dane zagregowane: łączną liczbę wykonanych zabiegów w danym roku oraz łączną kwotę należnej opłaty solidarnościowej. Raport nie zawiera żadnych danych osobowych pacjentek — imion, nazwisk, adresów, numerów PESEL ani żadnych innych informacji pozwalających na identyfikację. Fundusz nie przetwarza danych osobowych pacjentek."
        }
      ]
    },
    {
      id: "allocation",
      title: "Alokacja — model samorządowy",
      articles: [
        {
          number: "Art. 11",
          title: "Wniosek samorządu",
          content: "Samorząd ubiegający się o dofinansowanie etatów składa do Funduszu wniosek zawierający: 1) aktualny wskaźnik kadrowy w placówce lub placówkach; 2) liczbę dzieci przebywających w placówce; 3) potwierdzenie posiadania gotowego lokalu (własnego, komunalnego lub uzyskanego od innego podmiotu publicznego) przystosowanego do prowadzenia domu dziecka; 4) planowaną liczbę etatów do sfinansowania. Fundusz rozpatruje wnioski w kolejności według wskaźnika kadrowego — priorytet mają placówki z najgorszym stosunkiem dzieci do opiekunów."
        },
        {
          number: "Art. 12",
          title: "Kryteria alokacji i rezerwa",
          content: "Fundusz kieruje środki tam, gdzie wskaźnik kadrowy jest najgorszy — automatycznie, bez możliwości politycznego wpływu na wybór samorządów. Fundusz utrzymuje rezerwę finansową w wysokości co najmniej 20% rocznych przychodów, aby zapewnić ciągłość finansowania już uruchomionych etatów nawet w przypadku zmienności wpływów."
        },
        {
          number: "Art. 13",
          title: "Dofinansowanie i uruchomienie placówki",
          content: "Po pozytywnym rozpatrzeniu wniosku Fundusz zawiera z samorządem umowę wieloletnią o finansowaniu etatów. Samorząd zapewnia lokal i zarządza placówką — Fundusz finansuje wyłącznie wynagrodzenia. Samorząd może przeznaczyć dofinansowanie na: 1) wydzielenie z dużej grupy (do 14 dzieci) mniejszych grup wychowawczych (docelowo 5–7 dzieci) przez zatrudnienie dodatkowych opiekunów; 2) otwarcie nowej placówki i przekierowanie dzieci z przepełnionych domów dziecka."
        },
        {
          number: "Art. 14",
          title: "Ciągłość finansowania",
          content: "Raz uruchomione etaty są finansowane przez Fundusz tak długo, jak samorząd spełnia warunki umowy i Fundusz dysponuje środkami. Nowe wnioski samorządów rozpatrywane są dopiero po zabezpieczeniu środków na realizację istniejących umów. Fundusz nie może jednostronnie cofnąć finansowania bez zachowania 12-miesięcznego okresu wypowiedzenia umowy."
        },
        {
          number: "Art. 15",
          title: "Warunki utrzymania dofinansowania",
          content: "Samorząd zobowiązany jest do: 1) utrzymania liczby sfinansowanych etatów przez cały okres umowy; 2) składania półrocznych sprawozdań o wskaźniku kadrowym i liczbie dzieci; 3) zapewnienia dostępności lokalu przez cały okres umowy. Naruszenie warunków umowy skutkuje wstrzymaniem wypłat i uruchomieniem postępowania wyjaśniającego."
        }
      ]
    },
    {
      id: "privacy",
      title: "Ochrona danych",
      articles: [
        {
          number: "Art. 16",
          title: "Pełna anonimowość pacjentek",
          content: "Fundusz nie gromadzi, nie przetwarza ani nie żąda jakichkolwiek danych osobowych pacjentek. Placówka medyczna jest administratorem danych w zakresie niezbędnym do wykonania umowy z pacjentką — danych tych nie udostępnia Funduszowi. Naruszenie obowiązku anonimizacji przez placówkę podlega karze administracyjnej wymierzanej przez Prezesa Urzędu Ochrony Danych Osobowych."
        }
      ]
    },
    {
      id: "final",
      title: "Przepisy końcowe",
      articles: [
        {
          number: "Art. 17",
          title: "Warunek stosowania przepisów o opłacie",
          content: "Przepisy dotyczące opłaty solidarnościowej (AboTax) stosuje się wyłącznie po wejściu w życie odrębnych przepisów ustawowych dopuszczających przerwanie ciąży na żądanie kobiety do ukończenia 12. tygodnia ciąży. Do czasu spełnienia tego warunku Fundusz może przyjmować wyłącznie dobrowolne darowizny i prowadzić działalność organizacyjno-przygotowawczą."
        },
        {
          number: "Art. 18",
          title: "Wejście w życie",
          content: "Ustawa wchodzi w życie po upływie 3 miesięcy od dnia ogłoszenia, z wyjątkiem art. 7–10, które wchodzą w życie wraz ze spełnieniem warunku określonego w art. 17."
        }
      ]
    }
  ];

  const keyFeatures = [
    {
      icon: Users,
      title: "100% na etaty",
      description: "Żadnych remontów ani wyposażenia — wyłącznie wynagrodzenia opiekunów"
    },
    {
      icon: Home,
      title: "Lokal daje samorząd",
      description: "Fundusz finansuje kadry, samorząd zapewnia lokal i zarządza placówką"
    },
    {
      icon: Shield,
      title: "Zero danych osobowych",
      description: "Fundusz nigdy nie otrzymuje żadnych informacji o pacjentkach"
    },
    {
      icon: RefreshCw,
      title: "Ciągłość finansowania",
      description: "Raz uruchomione etaty są finansowane tak długo, jak spełniane są warunki umowy"
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
              18 artykułów definiujących mechanizm solidarnościowy — legalizacja z anonimową opłatą na etaty opiekunów
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a href="/ProjektUstawyDruk" target="_blank" rel="noopener noreferrer">
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
                  rekompensatę na rzecz społeczeństwa — przeznaczoną w całości na etaty opiekunów
                  w domach dziecka. Mechanizm ten zapewnia pełną anonimowość pacjentek oraz
                  przejrzystość wydatkowania środków poprzez Publiczny Rejestr Etatów.
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
                  <h4 className="font-semibold text-blue-900 mb-2">Warunek wejścia w życie (Art. 17)</h4>
                  <p className="text-blue-800/80">
                    Przepisy o opłacie solidarnościowej stosuje się wyłącznie po wejściu w życie
                    odrębnych przepisów dopuszczających przerwanie ciąży na żądanie do 12. tygodnia.
                    Do tego czasu Fundusz może przyjmować dobrowolne darowizny i prowadzić działalność
                    organizacyjno-przygotowawczą.
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
                  {signatureCount !== null
                    ? <>Dołącz do <span className="font-bold text-white">{signatureCount.toLocaleString('pl-PL')}</span> osób, które już podpisały petycję za Funduszem Rekompensaty.</>
                    : <>Dołącz do osób, które podpisały petycję za Funduszem Rekompensaty.</>
                  }
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
                    Poznaj mechanizm kliniki i Funduszu
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link to={createPageUrl("WplywNaRozwoj")}>
              <Card className="border-official-navy/10 hover:border-official-navy/30 transition-all hover:shadow-lg h-full">
                <CardContent className="p-6">
                  <Brain className="w-8 h-8 text-abotax-primary mb-4" />
                  <h3 className="font-semibold text-official-navy mb-2">Wpływ na dzieci</h3>
                  <p className="text-sm text-official-navy/60">
                    Co mówią badania o małych grupach i opiece
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
                    125 mln zł rocznie na etaty opiekunów
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

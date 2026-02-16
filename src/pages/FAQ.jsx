import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  Search,
  Heart,
  Shield,
  Lock,
  Users
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const categories = [
    {
      icon: Heart,
      title: "O inicjatywie",
      bgColor: "bg-abotax-primary/10",
      textColor: "text-abotax-primary",
      questions: [
        {
          id: "q1",
          question: "Czym jest Fundusz Rekompensaty Społecznej?",
          answer: "To propozycja mechanizmu, w którym za każdy zabieg aborcyjny klinika dodaje obowiązkową opłatę solidarnościową. 100% tych środków trafia na etaty opiekunów w domach dziecka — zmniejszamy liczbę dzieci przypadających na jednego wychowawcę. Pacjentka pozostaje anonimowa — klinika wpłaca zbiorczo. Hasło przewodnie: 'Życie za życie — rekompensata, nie kara'."
        },
        {
          id: "q2",
          question: "Czy to jest kara za aborcję?",
          answer: "Nie. Fundusz Rekompensaty Społecznej nie jest karą, osądem ani formą pokutowania. To inicjatywa proponująca kompromis w sporze aborcyjnym — trzecią drogę między skrajnościami. Nie oceniamy decyzji życiowych, proponujemy mechanizm przekształcający konflikt w realną pomoc dla dzieci w domach dziecka."
        },
        {
          id: "q3",
          question: "Na jakim etapie jest inicjatywa?",
          answer: "Obecnie zbieramy głosy poparcia dla obywatelskiego projektu ustawy. Po zebraniu wystarczającej liczby podpisów, projekt zostanie złożony do Sejmu RP przez Fundację Destruktura."
        },
        {
          id: "q4",
          question: "Czy podpis na stronie jest formalnym podpisem pod inicjatywą?",
          answer: "Podpis na stronie to wyrażenie poparcia społecznego. Formalny podpis pod inicjatywą ustawodawczą można złożyć przez platformę e-Doręczenia na adres Fundacji Destruktura (AE:PL-18803-44688-HHJBV-13). Oba sposoby są wartościowe — im więcej głosów, tym większa szansa na zmianę."
        },
        {
          id: "q4a",
          question: "Dlaczego kwota rekompensaty odpowiada kosztowi zabiegu?",
          answer: "Kwota została określona jako równowartość kosztu zabiegu, aby stworzyć symboliczną równowagę — 'życie za życie'. To fundament idei: każda procedura generuje środki na etat opiekuna dla dziecka w potrzebie. Kwota jest stała i obowiązkowa przy każdym zabiegu, ale przewidujemy opcje ułatwiające jej uiszczenie."
        },
        {
          id: "q4b",
          question: "Czy mogę nie wpłacać rekompensaty?",
          answer: "Nie. Projekt ustawy przewiduje, że rekompensata jest obowiązkowym elementem każdego zabiegu — to właśnie ten mechanizm zapewnia stałe finansowanie etatów opiekunów. Jednak dla osób w trudniejszej sytuacji finansowej przewidujemy rozłożenie na raty lub podział z partnerem."
        },
        {
          id: "q4c",
          question: "Czy mogę rozłożyć wpłatę na raty lub podzielić z partnerem?",
          answer: "Tak. Projekt przewiduje możliwość rozłożenia wpłaty na 3, 6 lub 12 miesięcznych rat. Dostępna jest również opcja 'Podziel z partnerem 50/50', która pozwala na współdzielenie rekompensaty — odpowiedzialność może być wspólna."
        }
      ]
    },
    {
      icon: Shield,
      title: "Przejrzystość",
      bgColor: "bg-abotax-success/10",
      textColor: "text-abotax-success",
      questions: [
        {
          id: "q5",
          question: "Gdzie będą trafiać środki z Funduszu?",
          answer: "98% środków trafia na etaty opiekunów w domach dziecka. Fundusz automatycznie alokuje środki tam, gdzie wskaźnik dzieci na opiekuna jest najgorszy. Nikt nie wybiera placówki — algorytm kieruje pieniądze gdzie są najbardziej potrzebne. 2% pokrywa koszty administracji i weryfikacji."
        },
        {
          id: "q6",
          question: "Kto stoi za inicjatywą?",
          answer: "Inicjatywę wspiera Fundacja Destruktura, która zbiera podpisy i będzie składać projekt do Sejmu RP. Fundacja działa transparentnie — wszystkie raporty finansowe i działania są publicznie dostępne. Możesz złożyć oficjalną petycję przez e-Doręczenia na adres Fundacji."
        },
        {
          id: "q7",
          question: "Jak będzie zapewniona transparentność wydatków?",
          answer: "Publiczny Rejestr Etatów będzie pokazywał ile etatów opiekunów sfinansowano w każdym powiecie, wraz z danymi o wskaźniku dzieci na wychowawcę przed i po. Raporty kwartalne będą publicznie dostępne — każdy będzie mógł sprawdzić, jak środki przekładają się na realne zatrudnienie."
        }
      ]
    },
    {
      icon: Lock,
      title: "Prywatność i dane",
      bgColor: "bg-abotax-secondary/10",
      textColor: "text-abotax-secondary",
      questions: [
        {
          id: "q8",
          question: "Czy moje dane przy podpisaniu petycji są bezpieczne?",
          answer: "Tak. Twoje dane są przechowywane zgodnie z RODO. Podajesz tylko imię, nazwisko i email — miasto jest opcjonalne. Jeśli nie zaznaczysz zgody na publiczne wyświetlanie, Twoje dane nie będą nigdzie widoczne. Administratorem danych jest Fundacja Destruktura."
        },
        {
          id: "q9",
          question: "Czy moje poparcie jest anonimowe?",
          answer: "Domyślnie tak — Twoje dane nie są publicznie wyświetlane. Możesz zaznaczyć opcję 'Zgadzam się na publiczne wyświetlanie imienia', jeśli chcesz być widoczny na liście popierających. Email nigdy nie jest publicznie ujawniany."
        },
        {
          id: "q10",
          question: "Czy mogę usunąć swoje dane?",
          answer: "Tak, zgodnie z RODO masz prawo do usunięcia swoich danych. Napisz na kontakt@abotax.pl z prośbą o usunięcie, a Twoje dane zostaną trwale usunięte z naszych systemów."
        },
        {
          id: "q10a",
          question: "Czy pacjentka jest w jakikolwiek sposób identyfikowana?",
          answer: "Nie. Klinika odprowadza środki zbiorczo — w raporcie widnieje tylko łączna kwota, bez żadnych danych osobowych. Fundusz nie wie kto, kiedy ani gdzie miał zabieg. Pełna anonimowość pacjentki jest fundamentem całego systemu."
        }
      ]
    },
    {
      icon: Users,
      title: "Opiekunowie i placówki",
      bgColor: "bg-abotax-secondary/10",
      textColor: "text-abotax-secondary",
      questions: [
        {
          id: "q11",
          question: "Jakie placówki będą objęte programem?",
          answer: "Docelowo wszystkie domy dziecka w Polsce. Fundusz automatycznie kieruje środki tam, gdzie wskaźnik dzieci na opiekuna jest najgorszy — nie trzeba się zgłaszać. Każda placówka objęta wsparciem podlega weryfikacji zatrudnienia i raportowaniu w Publicznym Rejestrze Etatów."
        },
        {
          id: "q12",
          question: "Ile dzieci może skorzystać z Funduszu?",
          answer: "W Polsce w domach dziecka przebywa około 17 100 dzieci przy ~2 140 wychowawcach (wskaźnik 1:8). Szacujemy, że Fundusz może generować ponad 200 mln zł rocznie — wystarczająco na ~2 800 nowych etatów opiekunów. To realna zmiana: mniejsze grupy, więcej uwagi, lepszy rozwój."
        },
        {
          id: "q13",
          question: "Dlaczego etaty opiekunów, a nie sprzęt czy remonty?",
          answer: "Badania naukowe (BEIP, St. Petersburg-USA, Lancet Commission) jednoznacznie wskazują: stały, uważny opiekun w małej grupie to jedyny czynnik, który zmienia trajektorię rozwoju dziecka. Nie sprzęt, nie budynki — ludzie. Dlatego 100% środków idzie na etaty."
        }
      ]
    }
  ];

  const filteredCategories = categories.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <div className="min-h-screen bg-official-cream">
      {/* Hero */}
      <section className="bg-gradient-to-br from-official-navy via-official-navy to-official-navy/90 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-official-gold/20 rounded-full text-official-gold text-sm font-medium mb-6 border border-official-gold/30">
              <HelpCircle className="w-4 h-4" />
              Pytania i odpowiedzi
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
              Często zadawane pytania
            </h1>
            <p className="text-white/80 text-lg mb-8">
              Znajdź odpowiedzi na najczęstsze pytania dotyczące Funduszu Rekompensaty Społecznej
            </p>

            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-official-navy/40" />
              <Input
                type="text"
                placeholder="Szukaj pytania..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border-0 rounded-xl text-official-navy placeholder:text-official-navy/40"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCategories.length > 0 ? (
            <div className="space-y-8">
              {filteredCategories.map((category, catIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: catIndex * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${category.bgColor}`}>
                      <category.icon className={`w-5 h-5 ${category.textColor}`} />
                    </div>
                    <h2 className="text-xl font-serif font-bold text-official-navy">{category.title}</h2>
                  </div>
                  
                  <div className="space-y-3">
                    {category.questions.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-xl border border-official-navy/10 overflow-hidden shadow-sm"
                      >
                        <button
                          onClick={() => toggleItem(item.id)}
                          className="w-full flex items-center justify-between p-5 text-left hover:bg-official-cream/50 transition-colors"
                        >
                          <span className="font-medium text-official-navy pr-4">{item.question}</span>
                          <ChevronDown
                            className={`w-5 h-5 text-abotax-primary flex-shrink-0 transition-transform ${
                              openItems[item.id] ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {openItems[item.id] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="px-5 pb-5 text-official-navy/70 border-t border-official-navy/10 pt-4">
                                {item.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-abotax-primary/10 flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-abotax-primary/40" />
              </div>
              <h3 className="text-xl font-semibold text-official-navy mb-2">
                Nie znaleziono pytań
              </h3>
              <p className="text-official-navy/60 mb-6">
                Spróbuj zmienić wyszukiwaną frazę
              </p>
              <Button
                variant="outline"
                onClick={() => setSearchQuery("")}
                className="border-abotax-primary text-abotax-primary"
              >
                Wyczyść wyszukiwanie
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-serif font-bold text-official-navy mb-4">
              Nie znalazłeś/aś odpowiedzi?
            </h2>
            <p className="text-official-navy/60 mb-6">
              Skontaktuj się z nami bezpośrednio. Odpowiemy na wszystkie Twoje pytania.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("About")}>
                <Button className="bg-abotax-primary hover:bg-abotax-primary-light text-white rounded-xl w-full sm:w-auto">
                  Skontaktuj się z nami
                </Button>
              </Link>
              <a href="mailto:kontakt@abotax.pl">
                <Button variant="outline" className="border-abotax-primary text-abotax-primary rounded-xl w-full sm:w-auto">
                  kontakt@abotax.pl
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
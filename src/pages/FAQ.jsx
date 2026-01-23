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
  CreditCard,
  Users,
  Building2
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
      title: "O rekompensacie",
      bgColor: "bg-abotax-primary/10",
      textColor: "text-abotax-primary",
      questions: [
        {
          id: "q1",
          question: "Czy wpłata rekompensaty jest obowiązkowa?",
          answer: "Wpłata rekompensaty jest całkowicie dobrowolna. To Twoja decyzja, czy chcesz wesprzeć dzieci w domach dziecka. Nie ma żadnych prawnych konsekwencji związanych z rezygnacją z wpłaty. Naszym celem jest stworzenie możliwości dla osób, które chcą przekształcić swoją decyzję życiową w coś pozytywnego."
        },
        {
          id: "q2",
          question: "Czy to jest kara za aborcję?",
          answer: "Nie. Fundusz Rekompensaty Społecznej nie jest karą, osądem ani formą pokutowania. To dobrowolna inicjatywa dla osób, które chcą wnieść pozytywny wkład w życie dzieci potrzebujących wsparcia. Nie oceniamy decyzji życiowych - oferujemy możliwość przekształcenia ich w pomoc dla innych."
        },
        {
          id: "q3",
          question: "Dlaczego kwota rekompensaty odpowiada kosztowi zabiegu?",
          answer: "Kwota rekompensaty została określona jako równowartość kosztu zabiegu, aby stworzyć symboliczną równowagę - 'życie za życie'. To nie jest wymóg, a jedynie sugestia. Możesz wpłacić dowolną kwotę, która jest dla Ciebie odpowiednia. Nawet mniejsza wpłata może znacząco pomóc dziecku w domu dziecka."
        },
        {
          id: "q4",
          question: "Czy mogę rozłożyć wpłatę na raty?",
          answer: "Tak, oferujemy możliwość rozłożenia wpłaty na 3, 6 lub 12 miesięcznych rat. Możesz również skorzystać z opcji 'Podziel z partnerem 50/50', która pozwala na współdzielenie wpłaty. Chcemy, aby każdy mógł wziąć udział, niezależnie od aktualnej sytuacji finansowej."
        }
      ]
    },
    {
      icon: Shield,
      title: "Przejrzystość i bezpieczeństwo",
      bgColor: "bg-abotax-success/10",
      textColor: "text-abotax-success",
      questions: [
        {
          id: "q5",
          question: "Gdzie trafiają wpłacone pieniądze?",
          answer: "100% wpłat (pomniejszone o minimalne koszty transakcji płatniczych ~2%) trafia bezpośrednio do domów dziecka. Możesz sam wybrać, czy Twoja wpłata ma trafić do automatycznie wybranych miejsc o największej potrzebie, do konkretnego domu dziecka, lub na określony cel (np. zakup konsoli, sprzętu sportowego). Wszystkie przepływy finansowe są transparentne i publikowane w naszych raportach."
        },
        {
          id: "q6",
          question: "Jak mogę zweryfikować, czy pieniądze trafiły do dzieci?",
          answer: "Na stronie każdego domu dziecka publikujemy zrealizowane cele wraz ze zdjęciami zakupionych przedmiotów. W sekcji Przejrzystość znajdziesz szczegółowe raporty finansowe, audyty zewnętrzne oraz dokładny podział środków. Jeśli utworzysz konto, otrzymasz powiadomienia o realizacji celów, które wsparłeś."
        },
        {
          id: "q7",
          question: "Kto przeprowadza audyty finansowe?",
          answer: "Nasze finanse są regularnie audytowane przez niezależne firmy audytorskie (aktualnie Ernst & Young). Raporty z audytów są publicznie dostępne w sekcji Przejrzystość. Dodatkowo, jako fundacja, podlegamy kontroli ze strony Ministerstwa Rodziny i Polityki Społecznej."
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
          question: "Czy moje dane są bezpieczne?",
          answer: "Tak. Oferujemy pełną anonimowość - możesz wpłacić rekompensatę bez podawania jakichkolwiek danych osobowych. Jeśli zdecydujesz się utworzyć konto, Twoje dane są szyfrowane i przechowywane zgodnie z RODO. Nigdy nie udostępniamy danych osobowych stronom trzecim."
        },
        {
          id: "q9",
          question: "Czy ktokolwiek dowie się o mojej wpłacie?",
          answer: "Tylko jeśli sam zdecydujesz się to ujawnić. Wpłaty anonimowe nie są w żaden sposób łączone z danymi osobowymi. Nawet jeśli utworzysz konto, informacja o Twoich wpłatach jest widoczna tylko dla Ciebie. Nie wysyłamy żadnych fizycznych potwierdzeń, które mogłyby ujawnić Twoją aktywność."
        },
        {
          id: "q10",
          question: "Czy mogę usunąć swoje konto i dane?",
          answer: "Tak, w każdej chwili możesz usunąć swoje konto w ustawieniach. Po usunięciu konta wszystkie Twoje dane osobowe zostaną trwale usunięte z naszych systemów w ciągu 30 dni, zgodnie z RODO. Historia wpłat zostanie zanonimizowana."
        }
      ]
    },
    {
      icon: CreditCard,
      title: "Płatności",
      bgColor: "bg-abotax-primary/10",
      textColor: "text-abotax-primary",
      questions: [
        {
          id: "q11",
          question: "Jakie metody płatności są dostępne?",
          answer: "Akceptujemy płatności BLIK, karty płatnicze (Visa, Mastercard) oraz przelewy bankowe. Wszystkie transakcje są szyfrowane i przetwarzane przez certyfikowanych operatorów płatności."
        },
        {
          id: "q12",
          question: "Czy mogę otrzymać fakturę lub potwierdzenie wpłaty?",
          answer: "Tak, po każdej wpłacie możesz pobrać certyfikat potwierdzający darowiznę. Certyfikat jest dostępny w formacie PDF i zawiera informacje o kwocie, dacie oraz celu wpłaty (jeśli został wybrany). Dla celów podatkowych możemy również wystawić zaświadczenie o darowiźnie."
        },
        {
          id: "q13",
          question: "Czy wpłata jest odliczana od podatku?",
          answer: "Tak, darowizny na rzecz Funduszu Rekompensaty Społecznej mogą być odliczone od podatku dochodowego, zgodnie z obowiązującymi przepisami o darowiznach na cele charytatywne. Maksymalne odliczenie wynosi 6% dochodu. Wystawiamy zaświadczenia do celów podatkowych."
        }
      ]
    },
    {
      icon: Users,
      title: "Wolontariat",
      bgColor: "bg-abotax-success/10",
      textColor: "text-abotax-success",
      questions: [
        {
          id: "q14",
          question: "Czy mogę być wolontariuszem zamiast wpłacać pieniądze?",
          answer: "Tak, oferujemy alternatywę w formie wolontariatu. Wymagane jest od 50 do 100 godzin pracy wolontariackiej w wybranym domu dziecka. Program obejmuje wstępne szkolenie online, przypisanie do najbliższego domu dziecka oraz system śledzenia godzin. Po ukończeniu wymaganej liczby godzin otrzymasz oficjalny certyfikat."
        },
        {
          id: "q15",
          question: "Jak wygląda szkolenie dla wolontariuszy?",
          answer: "Szkolenie to krótki moduł online (ok. 2-3 godziny), który przygotowuje do pracy z dziećmi w domach dziecka. Obejmuje podstawy psychologii dziecięcej, zasady bezpieczeństwa oraz informacje o specyfice pracy w placówkach opiekuńczych. Po ukończeniu szkolenia i pozytywnej weryfikacji zostaniesz przypisany do najbliższego domu dziecka."
        }
      ]
    },
    {
      icon: Building2,
      title: "Domy dziecka",
      bgColor: "bg-abotax-secondary/10",
      textColor: "text-abotax-secondary",
      questions: [
        {
          id: "q16",
          question: "Jakie domy dziecka są objęte programem?",
          answer: "W programie uczestniczy ponad 120 domów dziecka z całej Polski. Każda placówka przeszła proces weryfikacji i spełnia nasze standardy transparentności. Lista wszystkich domów jest dostępna w sekcji 'Domy dziecka', gdzie możesz zobaczyć ich profile, aktualne cele i historię wsparcia."
        },
        {
          id: "q17",
          question: "Jak mogę zobaczyć, na co konkretnie przeznaczane są środki?",
          answer: "Każdy dom dziecka publikuje konkretne cele zbiórki (np. 'Konsola PS5 dla świetlicy', 'Sprzęt sportowy'). Możesz śledzić postęp realizacji celów w czasie rzeczywistym. Po osiągnięciu celu publikowane są zdjęcia zakupionych przedmiotów oraz podziękowania od personelu."
        },
        {
          id: "q18",
          question: "Czy jako dom dziecka możemy dołączyć do programu?",
          answer: "Tak, zapraszamy wszystkie placówki opiekuńczo-wychowawcze do udziału w programie. Proces rejestracji obejmuje weryfikację statusu prawnego, wizytę naszego koordynatora oraz podpisanie umowy o współpracy. Skontaktuj się z nami przez formularz kontaktowy lub napisz na kontakt@abotax.pl."
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
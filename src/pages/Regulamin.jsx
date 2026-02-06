import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Scale,
  Shield,
  Mail,
  CheckCircle2,
  AlertCircle,
  Landmark,
  Cookie,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Regulamin() {
  return (
    <div className="min-h-screen bg-official-cream">
      {/* Hero */}
      <section className="bg-gradient-to-br from-official-navy via-official-navy to-official-navy/90 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-official-gold/20 rounded-full text-official-gold text-sm font-medium mb-6 border border-official-gold/30">
              <FileText className="w-4 h-4" />
              Dokumenty prawne
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
              Regulamin serwisu
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Zasady korzystania z serwisu abotax.pl i podpisywania petycji
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-official-navy/10 overflow-hidden">
            <div className="p-6 lg:p-10 space-y-8">

              {/* 1. Postanowienia ogólne */}
              <div>
                <h2 className="text-xl font-bold text-official-navy mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-official-navy text-white flex items-center justify-center text-sm">1</span>
                  Postanowienia ogólne
                </h2>
                <div className="pl-10 space-y-3 text-official-navy/80 leading-relaxed">
                  <p>
                    1.1. Serwis abotax.pl ("Serwis") jest prowadzony przez <strong>Fundację Destruktura</strong>
                    z siedzibą w Polsce ("Fundacja").
                  </p>
                  <p>
                    1.2. Serwis służy do zbierania poparcia dla obywatelskiego projektu ustawy
                    o Funduszu Rekompensaty Społecznej ("Petycja").
                  </p>
                  <p>
                    1.3. Korzystanie z Serwisu oznacza akceptację niniejszego Regulaminu.
                  </p>
                </div>
              </div>

              {/* 2. Podpisywanie petycji */}
              <div>
                <h2 className="text-xl font-bold text-official-navy mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-official-navy text-white flex items-center justify-center text-sm">2</span>
                  Podpisywanie petycji
                </h2>
                <div className="pl-10 space-y-3 text-official-navy/80 leading-relaxed">
                  <p>
                    2.1. Podpisanie petycji na stronie abotax.pl stanowi <strong>wyrażenie poparcia</strong> dla
                    inicjatywy obywatelskiej, nie jest formalnym podpisem pod projektem ustawodawczym w rozumieniu
                    ustawy o wykonywaniu inicjatywy ustawodawczej przez obywateli.
                  </p>
                  <p>
                    2.2. Do podpisania petycji wymagane jest podanie: imienia, nazwiska i adresu e-mail.
                    Miejscowość jest opcjonalna.
                  </p>
                  <p>
                    2.3. Po podpisaniu petycji na podany adres e-mail zostanie wysłany e-mail potwierdzający.
                  </p>
                  <p>
                    2.4. Dzień po podpisaniu petycji może zostać wysłany e-mail z zaproszeniem do
                    obserwowania profili AboTax w mediach społecznościowych.
                  </p>
                </div>
              </div>

              {/* 3. Generator obrazków */}
              <div>
                <h2 className="text-xl font-bold text-official-navy mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-official-navy text-white flex items-center justify-center text-sm">3</span>
                  Generator obrazków
                </h2>
                <div className="pl-10 space-y-3 text-official-navy/80 leading-relaxed">
                  <p>
                    3.1. Po podpisaniu petycji użytkownik może wygenerować obrazek ("plansza poparcia")
                    z wybranym lub własnym powodem poparcia.
                  </p>
                  <p>
                    3.2. Obrazek może zostać wysłany na adres e-mail użytkownika w celu ułatwienia
                    udostępnienia w mediach społecznościowych.
                  </p>
                  <p>
                    3.3. Użytkownik jest zachęcany do udostępnienia planszy w mediach społecznościowych
                    z oznaczeniem @abotax.pl i hashtagiem #AboTax.
                  </p>
                </div>
              </div>

              {/* 4. Ochrona danych */}
              <div>
                <h2 className="text-xl font-bold text-official-navy mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-official-navy text-white flex items-center justify-center text-sm">4</span>
                  Ochrona danych osobowych
                </h2>
                <div className="pl-10 space-y-3 text-official-navy/80 leading-relaxed">
                  <p>
                    4.1. Administratorem danych osobowych jest Fundacja Destruktura.
                  </p>
                  <p>
                    4.2. Dane osobowe (imię, nazwisko, e-mail, miejscowość) są przetwarzane wyłącznie
                    w celu obsługi petycji i komunikacji z osobami popierającymi inicjatywę.
                  </p>
                  <p>
                    4.3. Szczegółowe informacje o przetwarzaniu danych znajdują się w{" "}
                    <Link to={createPageUrl("PolitykaPrywatnosci")} className="text-abotax-primary underline font-medium">
                      Polityce prywatności
                    </Link>.
                  </p>
                </div>
              </div>

              {/* 5. E-mail marketing */}
              <div>
                <h2 className="text-xl font-bold text-official-navy mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-official-navy text-white flex items-center justify-center text-sm">5</span>
                  Komunikacja e-mail
                </h2>
                <div className="pl-10 space-y-3 text-official-navy/80 leading-relaxed">
                  <p>
                    5.1. Podpisując petycję, użytkownik wyraża zgodę na otrzymanie następujących wiadomości e-mail:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>E-mail potwierdzający podpisanie petycji (natychmiast)</li>
                    <li>E-mail z zaproszeniem do obserwowania mediów społecznościowych (do 24h później)</li>
                  </ul>
                  <p>
                    5.2. Użytkownik może zrezygnować z dalszej komunikacji, klikając link rezygnacji
                    w otrzymanych wiadomościach lub kontaktując się na adres kontakt@abotax.pl.
                  </p>
                </div>
              </div>

              {/* 6. Pliki cookies */}
              <div>
                <h2 className="text-xl font-bold text-official-navy mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-official-navy text-white flex items-center justify-center text-sm">6</span>
                  Pliki cookies
                </h2>
                <div className="pl-10 space-y-3 text-official-navy/80 leading-relaxed">
                  <p>
                    6.1. Serwis wykorzystuje pliki cookies niezbędne do prawidłowego działania strony.
                  </p>
                  <p>
                    6.2. Cookies są używane do:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Utrzymania sesji użytkownika</li>
                    <li>Zapamiętania preferencji (np. zgody na cookies)</li>
                    <li>Podstawowych analiz ruchu na stronie</li>
                  </ul>
                  <p>
                    6.3. Użytkownik może zarządzać plikami cookies w ustawieniach przeglądarki.
                    Wyłączenie cookies może ograniczyć funkcjonalność Serwisu.
                  </p>
                </div>
              </div>

              {/* 7. Odpowiedzialność */}
              <div>
                <h2 className="text-xl font-bold text-official-navy mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-official-navy text-white flex items-center justify-center text-sm">7</span>
                  Ograniczenie odpowiedzialności
                </h2>
                <div className="pl-10 space-y-3 text-official-navy/80 leading-relaxed">
                  <p>
                    7.1. Fundacja dokłada wszelkich starań, aby Serwis działał prawidłowo,
                    jednak nie gwarantuje nieprzerwanej dostępności.
                  </p>
                  <p>
                    7.2. Treści prezentowane w Serwisie mają charakter informacyjny i nie stanowią
                    porady prawnej ani medycznej.
                  </p>
                </div>
              </div>

              {/* 8. Postanowienia końcowe */}
              <div>
                <h2 className="text-xl font-bold text-official-navy mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-official-navy text-white flex items-center justify-center text-sm">8</span>
                  Postanowienia końcowe
                </h2>
                <div className="pl-10 space-y-3 text-official-navy/80 leading-relaxed">
                  <p>
                    8.1. Fundacja zastrzega sobie prawo do zmiany Regulaminu. Zmiany wchodzą w życie
                    z dniem publikacji na stronie.
                  </p>
                  <p>
                    8.2. W sprawach nieuregulowanych Regulaminem zastosowanie mają przepisy prawa polskiego.
                  </p>
                  <p>
                    8.3. Kontakt z Fundacją:{" "}
                    <a href="mailto:kontakt@abotax.pl" className="text-abotax-primary underline font-medium">
                      kontakt@abotax.pl
                    </a>
                  </p>
                </div>
              </div>

              {/* Data aktualizacji */}
              <div className="pt-6 border-t border-official-navy/10">
                <p className="text-sm text-official-navy/50">
                  Ostatnia aktualizacja: 5 lutego 2026 r.
                </p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("PolitykaPrywatnosci")}>
              <Button variant="outline" className="border-official-navy/30 text-official-navy hover:bg-official-navy/5">
                <Shield className="w-4 h-4 mr-2" />
                Polityka prywatności
              </Button>
            </Link>
            <Link to={createPageUrl("PodpiszPetycje")}>
              <Button className="bg-official-navy hover:bg-official-navy/90 text-white">
                <FileText className="w-4 h-4 mr-2" />
                Podpisz petycję
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

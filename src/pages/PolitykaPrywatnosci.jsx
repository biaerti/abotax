import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  FileText,
  Mail,
  User,
  Database,
  Lock,
  Eye,
  Trash2,
  AlertCircle,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function PolitykaPrywatnosci() {
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
              <Shield className="w-4 h-4" />
              RODO
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
              Polityka Prywatności
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Informacje o przetwarzaniu danych osobowych zgodnie z RODO
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-official-navy/10 overflow-hidden">
            <div className="p-6 lg:p-10 space-y-8">

              {/* 1. Administrator */}
              <div>
                <h2 className="text-xl font-bold text-official-navy mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-official-navy text-white flex items-center justify-center text-sm">1</span>
                  Administrator danych osobowych
                </h2>
                <div className="pl-10 space-y-3 text-official-navy/80 leading-relaxed">
                  <p>
                    Administratorem Twoich danych osobowych jest{" "}
                    <strong className="text-official-navy">Fundacja Destruktura</strong>{" "}
                    z siedzibą w Polsce.
                  </p>
                  <p>
                    Kontakt z administratorem:{" "}
                    <a href="mailto:kontakt@abotax.pl" className="text-abotax-primary underline font-medium">
                      kontakt@abotax.pl
                    </a>
                  </p>
                </div>
              </div>

              {/* 2. Jakie dane zbieramy */}
              <div>
                <h2 className="text-xl font-bold text-official-navy mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-official-navy text-white flex items-center justify-center text-sm">2</span>
                  Jakie dane zbieramy
                </h2>
                <div className="pl-10 space-y-3 text-official-navy/80 leading-relaxed">
                  <p>
                    W ramach serwisu abotax.pl zbieramy następujące dane osobowe:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Imię i nazwisko</strong> — wymagane do podpisania petycji</li>
                    <li><strong>Adres e-mail</strong> — wymagany do potwierdzenia i komunikacji</li>
                    <li><strong>Miejscowość</strong> — opcjonalna, do celów statystycznych</li>
                  </ul>
                </div>
              </div>

              {/* 3. Cel przetwarzania */}
              <div>
                <h2 className="text-xl font-bold text-official-navy mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-official-navy text-white flex items-center justify-center text-sm">3</span>
                  Cel i podstawa przetwarzania
                </h2>
                <div className="pl-10 space-y-3 text-official-navy/80 leading-relaxed">
                  <p>Twoje dane przetwarzamy w następujących celach:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Rejestracja poparcia dla petycji</strong> — na podstawie
                      Twojej dobrowolnej zgody (art. 6 ust. 1 lit. a RODO)
                    </li>
                    <li>
                      <strong>Wysyłka e-maili potwierdzających</strong> — realizacja
                      umowy o świadczenie usług (art. 6 ust. 1 lit. b RODO)
                    </li>
                    <li>
                      <strong>Komunikacja dotycząca inicjatywy</strong> — na podstawie
                      Twojej zgody (art. 6 ust. 1 lit. a RODO)
                    </li>
                  </ul>
                </div>
              </div>

              {/* 4. Okres przechowywania */}
              <div>
                <h2 className="text-xl font-bold text-official-navy mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-official-navy text-white flex items-center justify-center text-sm">4</span>
                  Okres przechowywania danych
                </h2>
                <div className="pl-10 space-y-3 text-official-navy/80 leading-relaxed">
                  <p>
                    Twoje dane będą przechowywane przez okres trwania inicjatywy
                    obywatelskiej, a następnie przez okres wymagany przepisami prawa
                    lub do momentu wycofania zgody.
                  </p>
                  <p>
                    Po zakończeniu inicjatywy dane mogą być przechowywane w formie
                    zanonimizowanej do celów archiwalnych i statystycznych.
                  </p>
                </div>
              </div>

              {/* 5. Twoje prawa */}
              <div>
                <h2 className="text-xl font-bold text-official-navy mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-official-navy text-white flex items-center justify-center text-sm">5</span>
                  Twoje prawa
                </h2>
                <div className="pl-10 space-y-4 text-official-navy/80 leading-relaxed">
                  <p>Zgodnie z RODO przysługują Ci następujące prawa:</p>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex items-start gap-3 p-3 bg-official-cream rounded-lg">
                      <Eye className="w-5 h-5 text-abotax-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-official-navy">Prawo dostępu</p>
                        <p className="text-sm">Możesz uzyskać informację o przetwarzanych danych</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-official-cream rounded-lg">
                      <FileText className="w-5 h-5 text-abotax-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-official-navy">Prawo do sprostowania</p>
                        <p className="text-sm">Możesz poprawić nieprawidłowe dane</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-official-cream rounded-lg">
                      <Trash2 className="w-5 h-5 text-abotax-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-official-navy">Prawo do usunięcia</p>
                        <p className="text-sm">Możesz żądać usunięcia swoich danych</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-official-cream rounded-lg">
                      <Lock className="w-5 h-5 text-abotax-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-official-navy">Prawo do ograniczenia</p>
                        <p className="text-sm">Możesz ograniczyć przetwarzanie danych</p>
                      </div>
                    </div>
                  </div>

                  <p>
                    Aby skorzystać z tych praw, skontaktuj się z nami:{" "}
                    <a href="mailto:kontakt@abotax.pl" className="text-abotax-primary underline font-medium">
                      kontakt@abotax.pl
                    </a>
                  </p>
                </div>
              </div>

              {/* 6. Cofnięcie zgody */}
              <div>
                <h2 className="text-xl font-bold text-official-navy mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-official-navy text-white flex items-center justify-center text-sm">6</span>
                  Cofnięcie zgody
                </h2>
                <div className="pl-10 space-y-3 text-official-navy/80 leading-relaxed">
                  <p>
                    Masz prawo w dowolnym momencie wycofać zgodę na przetwarzanie
                    danych osobowych. Wycofanie zgody nie wpływa na zgodność z prawem
                    przetwarzania dokonanego przed jej wycofaniem.
                  </p>
                  <p>
                    Aby wycofać zgodę, skontaktuj się z nami na adres{" "}
                    <a href="mailto:kontakt@abotax.pl" className="text-abotax-primary underline font-medium">
                      kontakt@abotax.pl
                    </a>{" "}
                    lub kliknij link rezygnacji w otrzymanych e-mailach.
                  </p>
                </div>
              </div>

              {/* 7. Odbiorcy danych */}
              <div>
                <h2 className="text-xl font-bold text-official-navy mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-official-navy text-white flex items-center justify-center text-sm">7</span>
                  Odbiorcy danych
                </h2>
                <div className="pl-10 space-y-3 text-official-navy/80 leading-relaxed">
                  <p>Twoje dane mogą być przekazywane następującym podmiotom:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Supabase Inc.</strong> — dostawca bazy danych
                      (serwery w UE, zgodność z RODO)
                    </li>
                    <li>
                      <strong>Mailgun Technologies Inc.</strong> — dostawca usług
                      e-mail (serwery w UE, zgodność z RODO)
                    </li>
                    <li>
                      <strong>Vercel Inc.</strong> — hosting strony internetowej
                    </li>
                  </ul>
                  <p>
                    Nie sprzedajemy ani nie udostępniamy Twoich danych podmiotom
                    trzecim w celach marketingowych.
                  </p>
                </div>
              </div>

              {/* 8. Bezpieczeństwo */}
              <div>
                <h2 className="text-xl font-bold text-official-navy mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-official-navy text-white flex items-center justify-center text-sm">8</span>
                  Bezpieczeństwo danych
                </h2>
                <div className="pl-10 space-y-3 text-official-navy/80 leading-relaxed">
                  <p>
                    Stosujemy odpowiednie środki techniczne i organizacyjne
                    w celu ochrony Twoich danych osobowych:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Szyfrowanie połączeń (HTTPS/TLS)</li>
                    <li>Bezpieczne przechowywanie w certyfikowanych centrach danych</li>
                    <li>Kontrola dostępu do danych</li>
                    <li>Regularne kopie zapasowe</li>
                  </ul>
                </div>
              </div>

              {/* 9. Pliki cookies */}
              <div>
                <h2 className="text-xl font-bold text-official-navy mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-official-navy text-white flex items-center justify-center text-sm">9</span>
                  Pliki cookies
                </h2>
                <div className="pl-10 space-y-3 text-official-navy/80 leading-relaxed">
                  <p>
                    Serwis wykorzystuje pliki cookies niezbędne do prawidłowego
                    działania strony. Szczegółowe informacje znajdują się w{" "}
                    <Link to={createPageUrl("Regulamin")} className="text-abotax-primary underline font-medium">
                      Regulaminie
                    </Link>
                    {" "}(punkt 6).
                  </p>
                </div>
              </div>

              {/* 10. Skarga do UODO */}
              <div>
                <h2 className="text-xl font-bold text-official-navy mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-official-navy text-white flex items-center justify-center text-sm">10</span>
                  Prawo do skargi
                </h2>
                <div className="pl-10 space-y-3 text-official-navy/80 leading-relaxed">
                  <p>
                    Jeśli uważasz, że przetwarzanie Twoich danych narusza przepisy RODO,
                    masz prawo wnieść skargę do organu nadzorczego:
                  </p>
                  <div className="bg-official-cream rounded-xl p-4 mt-3">
                    <p className="font-semibold text-official-navy">
                      Prezes Urzędu Ochrony Danych Osobowych
                    </p>
                    <p className="text-sm mt-1">ul. Stawki 2, 00-193 Warszawa</p>
                    <a
                      href="https://uodo.gov.pl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-abotax-primary underline flex items-center gap-1 mt-1"
                    >
                      uodo.gov.pl
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* 11. Zmiany */}
              <div>
                <h2 className="text-xl font-bold text-official-navy mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-official-navy text-white flex items-center justify-center text-sm">11</span>
                  Zmiany polityki prywatności
                </h2>
                <div className="pl-10 space-y-3 text-official-navy/80 leading-relaxed">
                  <p>
                    Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej
                    Polityce Prywatności. O istotnych zmianach poinformujemy
                    za pośrednictwem strony internetowej.
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
            <Link to={createPageUrl("Regulamin")}>
              <Button variant="outline" className="border-official-navy/30 text-official-navy hover:bg-official-navy/5">
                <FileText className="w-4 h-4 mr-2" />
                Regulamin serwisu
              </Button>
            </Link>
            <Link to={createPageUrl("Privacy")}>
              <Button variant="outline" className="border-official-navy/30 text-official-navy hover:bg-official-navy/5">
                <Shield className="w-4 h-4 mr-2" />
                Twoja anonimowość (system AboTax)
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

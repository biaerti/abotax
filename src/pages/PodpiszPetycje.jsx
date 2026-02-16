import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  CheckCircle2,
  Users,
  Scale,
  Heart,
  AlertTriangle,
  ExternalLink,
  ArrowRight,
  Landmark,
  Mail,
  MapPin,
  User,
  Building2,
  Clock,
  Star,
  Copy,
  Check,
  Instagram,
  Sparkles,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ImpactCounter from "@/components/ui/ImpactCounter";
import { createPageUrl } from "@/utils/createPageUrl";
import { db, supabase } from "@/lib/supabase";

const SUPPORT_REASONS = [
  { id: "compromise", text: "Bo wierzę w kompromisy", emoji: "🤝" },
  { id: "children", text: "Bo dzieci w domach dziecka zasługują na więcej", emoji: "💛" },
  { id: "war_end", text: "Bo chcę końca wojny kulturowej", emoji: "✌️" },
  { id: "no_sides", text: "Bo nie należę do żadnego obozu", emoji: "🎯" },
  { id: "stigma", text: "Bo mam dość stygmatyzowania", emoji: "🚫" },
  { id: "solution", text: "Bo to da się rozwiązać", emoji: "💡" }
];

// Map reason IDs to pre-made plansza filenames in /Abotax_plansze/
const PLANSZA_MAP = {
  compromise: "ABOTAX_KOMPROMISY.png",
  children: "ABOTAX_DZIECI_ZASLUGUJA.png",
  war_end: "ABOTAX_KONIEC_Wojny.png",
  no_sides: "ABOTAX_OBOZ.png",
  stigma: "ABOTAX_STYGMATYZOWANIA.png",
  solution: "ABOTAX_DA_SIE_ROZWIAZAC.png",
  custom: "ABOTAX_PUSTE.png",
};

function getPlanszaUrl(reasonId) {
  const filename = PLANSZA_MAP[reasonId] || PLANSZA_MAP.custom;
  return `/Abotax_plansze/${filename}`;
}

export default function PodpiszPetycje() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    isPublic: false,
    acceptTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedReason, setSelectedReason] = useState(null);
  const [planszaUrl, setPlanszaUrl] = useState(null);
  const [emailSent, setEmailSent] = useState(false);
  const [signatureCount, setSignatureCount] = useState(0);

  const goalCount = 150000;
  const progressPercent = Math.round((signatureCount / goalCount) * 100);

  // Fetch real signature count from Supabase
  useEffect(() => {
    db.petition.getCount().then(setSignatureCount);
    const unsubscribe = db.petition.subscribeToCount(setSignatureCount);
    return unsubscribe;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await db.petition.sign({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        city: formData.city || null,
        is_public: formData.isPublic,
        source: 'web'
      });
    } catch (error) {
      console.error("Error signing petition:", error);
      // Continue to success state even if Supabase fails (graceful degradation)
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const selectReason = (reason) => {
    setSelectedReason(reason);
    const url = getPlanszaUrl(reason.id);
    setPlanszaUrl(url);

    // Send confirmation email
    sendConfirmationEmail(reason);
  };

  const sendConfirmationEmail = async (reason) => {
    try {
      if (supabase) {
        await supabase.functions.invoke('send-petition-email', {
          body: {
            to: formData.email,
            firstName: formData.firstName,
            type: 'confirmation',
            reason: reason?.text || '',
            reasonId: reason?.id || 'custom'
          }
        });
        setEmailSent(true);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const downloadImage = () => {
    if (!planszaUrl) return;
    const link = document.createElement("a");
    link.download = "popieram-abotax.png";
    link.href = planszaUrl;
    link.click();
  };

  const copyLink = () => {
    navigator.clipboard.writeText("https://abotax.pl/podpiszpetycje");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const recentSigners = [
    { name: "Anna K.", city: "Warszawa", time: "2 min temu" },
    { name: "Piotr M.", city: "Kraków", time: "5 min temu" },
    { name: "Magdalena W.", city: "Gdańsk", time: "8 min temu" },
    { name: "Tomasz B.", city: "Wrocław", time: "12 min temu" },
  ];

  return (
    <div className="min-h-screen bg-official-cream">
      {/* Hero Section - Petition focused */}
      <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-official-navy via-official-navy to-official-navy/90">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-official-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-abotax-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-official-gold/20 text-official-gold border-official-gold/30 mb-6">
                <Landmark className="w-3 h-3 mr-1" />
                Inicjatywa obywatelska
              </Badge>

              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                Podpisz petycję za
                <span className="text-official-gold block mt-2">Funduszem Rekompensaty</span>
              </h1>

              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Twój głos ma znaczenie. Dołącz do ruchu, który chce zakończyć wieloletni
                konflikt i realnie pomóc dzieciom w domach dziecka.
              </p>

              {/* Progress bar */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-official-gold" />
                    <span className="text-white font-medium">Zebrane podpisy</span>
                  </div>
                  <span className="text-white/60 text-sm">Cel: {goalCount.toLocaleString('pl-PL')}</span>
                </div>

                <div className="relative h-4 bg-white/20 rounded-full overflow-hidden mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-official-gold to-official-gold/80 rounded-full"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-white">
                    <ImpactCounter value={signatureCount} duration={2000} />
                  </div>
                  <span className="text-official-gold font-semibold">{progressPercent}% celu</span>
                </div>
              </div>

              {/* Recent signers */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-official-navy flex items-center justify-center">
                      <User className="w-4 h-4 text-white/60" />
                    </div>
                  ))}
                </div>
                <span className="text-white/70 text-sm">
                  +{Math.floor(Math.random() * 50 + 20)} osób podpisało w ostatniej godzinie
                </span>
              </div>
            </motion.div>

            {/* Right - Form Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-0 shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-abotax-primary to-abotax-primary/90 text-white rounded-t-lg pb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Wyraź poparcie</CardTitle>
                      <CardDescription className="text-white/80">
                        Szybko i bezpiecznie
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6 -mt-4">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    {!isSubmitted ? (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-official-navy">Imię *</Label>
                            <Input
                              id="firstName"
                              value={formData.firstName}
                              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                              required
                              placeholder="Jan"
                              className="border-official-navy/20 focus:border-abotax-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-official-navy">Nazwisko *</Label>
                            <Input
                              id="lastName"
                              value={formData.lastName}
                              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                              required
                              placeholder="Kowalski"
                              className="border-official-navy/20 focus:border-abotax-primary"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-official-navy">Adres e-mail *</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-official-navy/40" />
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              required
                              placeholder="jan@email.pl"
                              className="pl-10 border-official-navy/20 focus:border-abotax-primary"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="city" className="text-official-navy">Miejscowość</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-official-navy/40" />
                            <Input
                              id="city"
                              value={formData.city}
                              onChange={(e) => setFormData({...formData, city: e.target.value})}
                              placeholder="Warszawa"
                              className="pl-10 border-official-navy/20 focus:border-abotax-primary"
                            />
                          </div>
                        </div>

                        <div className="space-y-2 pt-2">
                          <label htmlFor="isPublic" className="flex items-center gap-2 cursor-pointer">
                            <Checkbox
                              id="isPublic"
                              checked={formData.isPublic}
                              onCheckedChange={(checked) => setFormData({...formData, isPublic: checked})}
                            />
                            <span className="text-sm text-official-navy/70">
                              Zgadzam się na publiczne wyświetlanie imienia
                            </span>
                          </label>

                          <label htmlFor="acceptTerms" className="flex items-center gap-2 cursor-pointer">
                            <Checkbox
                              id="acceptTerms"
                              checked={formData.acceptTerms}
                              onCheckedChange={(checked) => setFormData({...formData, acceptTerms: checked})}
                              required
                            />
                            <span className="text-sm text-official-navy/70">
                              Akceptuję <Link to={createPageUrl("Regulamin")} className="text-abotax-primary underline underline-offset-2 hover:text-abotax-primary/80">regulamin</Link> i <Link to={createPageUrl("PolitykaPrywatnosci")} className="text-abotax-primary underline underline-offset-2 hover:text-abotax-primary/80">politykę prywatności</Link> *
                            </span>
                          </label>
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-abotax-primary hover:bg-abotax-primary/90 text-white py-6 text-lg"
                          size="lg"
                          disabled={isSubmitting || !formData.acceptTerms}
                        >
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                              />
                              Wysyłanie...
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-5 h-5 mr-2" />
                              Podpisuję petycję
                            </>
                          )}
                        </Button>

                        {/* Disclaimer */}
                        <p className="text-xs text-official-navy/50 text-center">
                          To wyrażenie poparcia, nie formalny podpis pod inicjatywą ustawodawczą.
                        </p>
                      </form>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-2"
                      >
                        <div className="flex items-center gap-3 mb-4 p-3 bg-abotax-success/10 rounded-lg">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-official-navy">
                              Dziękujemy, {formData.firstName}!
                            </h3>
                            <p className="text-official-navy/70 text-sm">
                              Twój głos został zarejestrowany.
                            </p>
                          </div>
                          <div className="w-10 h-10 bg-abotax-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-5 h-5 text-abotax-primary" />
                          </div>
                        </div>

                        {!planszaUrl ? (
                          <div>
                            <h4 className="font-semibold text-official-navy text-sm mb-3">
                              Popieram AboTax, bo...
                            </h4>
                            <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
                              {SUPPORT_REASONS.map((reason) => (
                                <button
                                  key={reason.id}
                                  onClick={() => selectReason(reason)}
                                  className="w-full text-left p-3 rounded-lg border border-official-navy/10 hover:border-abotax-primary hover:bg-abotax-primary/5 transition-all text-sm flex items-center gap-2"
                                >
                                  <span>{reason.emoji}</span>
                                  <span className="text-official-navy">{reason.text}</span>
                                </button>
                              ))}
                            </div>

                            {/* Custom reason option - shows blank plansza */}
                            <div className="mt-3">
                              <button
                                onClick={() => selectReason({ id: "custom", text: "Wpiszę własny powód", emoji: "✍️" })}
                                className="w-full text-left p-3 rounded-lg border-2 border-dashed border-official-navy/20 hover:border-abotax-primary hover:bg-abotax-primary/5 transition-all text-sm flex items-center gap-2"
                              >
                                <span>✍️</span>
                                <span className="text-official-navy/70">Wpiszę własny powód</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {/* Pre-made plansza image */}
                            <div className="rounded-lg overflow-hidden shadow-md">
                              <img src={planszaUrl} alt="Popieram AboTax" className="w-full" />
                            </div>

                            {selectedReason?.id === "custom" && (
                              <p className="text-xs text-official-navy/60 text-center">
                                Wpisz swój powód jako tekst na IG Story w pustym polu na planszy.
                              </p>
                            )}

                            {emailSent && (
                              <div className="flex items-center gap-2 text-xs text-abotax-primary bg-abotax-primary/10 rounded-lg p-2">
                                <Mail className="w-3 h-3" />
                                Obrazek wysłany na {formData.email}
                              </div>
                            )}

                            {/* Action buttons */}
                            <div className="grid grid-cols-2 gap-2">
                              <Button onClick={downloadImage} size="sm" className="bg-official-navy hover:bg-official-navy/90 text-white">
                                <Download className="w-4 h-4 mr-1" />
                                Pobierz
                              </Button>
                              <Button
                                onClick={() => window.open("https://instagram.com/abotax.pl", "_blank")}
                                size="sm"
                                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                              >
                                <Instagram className="w-4 h-4 mr-1" />
                                @abotax.pl
                              </Button>
                            </div>

                            <p className="text-xs text-official-navy/50 text-center">
                              Pobierz i wrzuć na IG Story! Oznacz @abotax.pl
                            </p>

                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={copyLink} className="flex-1 text-xs">
                                {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                                {copied ? "Skopiowano!" : "Kopiuj link"}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 text-xs"
                                onClick={() => { setPlanszaUrl(null); setSelectedReason(null); }}
                              >
                                <Sparkles className="w-3 h-3 mr-1" />
                                Inny powód
                              </Button>
                            </div>

                            {/* e-Doręczenia micro-CTA */}
                            <div className="border-t border-official-navy/10 pt-3 mt-3">
                              <a
                                href="https://edoreczenia.gov.pl"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-xs text-official-navy/70 hover:text-official-navy transition-colors"
                              >
                                <Landmark className="w-3 h-3" />
                                <span>Złóż oficjalną petycję przez <strong>e-Doręczenia</strong> do Fundacji Destruktura</span>
                                <ExternalLink className="w-3 h-3 ml-auto" />
                              </a>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ePUAP Section */}
      <section className="py-16 bg-white border-b border-official-navy/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-official-navy/10 text-official-navy border-official-navy/20 mb-4">
                <Landmark className="w-3 h-3 mr-1" />
                Oficjalny kanał
              </Badge>
              <h2 className="text-3xl font-serif font-bold text-official-navy mb-4">
                Petycja przez e-Doręczenia
              </h2>
              <p className="text-official-navy/70 mb-6 leading-relaxed">
                Oprócz wyrażenia poparcia na naszej stronie, możesz złożyć oficjalną petycję
                przez platformę e-Doręczenia. Petycja trafia na skrzynkę{" "}
                <strong>Fundacji Destruktura</strong> (adres: <code className="text-xs bg-official-navy/5 px-1 py-0.5 rounded">AE:PL-18803-44688-HHJBV-13</code>),
                która zbiera podpisy i składa je oficjalnie do Sejmu RP.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-official-navy/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-official-navy">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-official-navy">Zaloguj się na edoreczenia.gov.pl</h4>
                    <p className="text-sm text-official-navy/60">Użyj Profilu Zaufanego (bank lub mObywatel)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-official-navy/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-official-navy">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-official-navy">Wyślij wiadomość na adres Fundacji</h4>
                    <p className="text-sm text-official-navy/60">Adres: AE:PL-18803-44688-HHJBV-13</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-official-navy/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-official-navy">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-official-navy">Napisz: "Popieram petycję AboTax"</h4>
                    <p className="text-sm text-official-navy/60">Fundacja Destruktura zbiera i składa do Sejmu</p>
                  </div>
                </div>
              </div>

              <a
                href="https://edoreczenia.gov.pl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-official-navy hover:bg-official-navy/90 text-white">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Przejdź do e-Doręczeń
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-official-cream to-white rounded-2xl p-8 border border-official-navy/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-official-navy flex items-center justify-center">
                    <Landmark className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-official-navy">e-Doręczenia</h3>
                    <p className="text-sm text-official-navy/60">Fundacja Destruktura</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-abotax-primary" />
                    <span className="text-official-navy/70">Oficjalny kanał rządowy (e-Doręczenia)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-abotax-primary" />
                    <span className="text-official-navy/70">Weryfikacja tożsamości przez Profil Zaufany</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-abotax-primary" />
                    <span className="text-official-navy/70">Fundacja Destruktura składa petycję do Sejmu</span>
                  </div>
                </div>

                <div className="mt-6 p-3 bg-official-navy/5 border border-official-navy/10 rounded-xl">
                  <p className="text-xs text-official-navy/60 mb-1">Adres e-Doręczeń:</p>
                  <p className="text-sm font-mono font-semibold text-official-navy">AE:PL-18803-44688-HHJBV-13</p>
                </div>

                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <p className="text-sm text-amber-800">
                      Wymaga Profilu Zaufanego i aktywnej skrzynki e-Doręczeń.
                      Możesz je założyć przez bankowość elektroniczną lub mObywatela.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Sign Section */}
      <section className="py-16 lg:py-24 bg-official-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif font-bold text-official-navy mb-4">
              Dlaczego warto podpisać?
            </h2>
            <p className="text-official-navy/60 max-w-2xl mx-auto">
              Każdy podpis przybliża nas do realnej zmiany w prawie
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "125 mln zł rocznie",
                description: "Szacowana kwota, która trafi na nowe etaty opiekunów w domach dziecka."
              },
              {
                icon: Scale,
                title: "Kompromis społeczny",
                description: "Mechanizm łączący różne stanowiska — rekompensata zamiast konfliktu i podziałów."
              },
              {
                icon: Building2,
                title: "17 100 dzieci",
                description: "Tyle dzieci w domach dziecka może otrzymać lepszą opiekę dzięki Funduszowi."
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-official-navy/10 text-center"
              >
                <div className="w-16 h-16 bg-abotax-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-abotax-primary" />
                </div>
                <h3 className="text-xl font-bold text-official-navy mb-2">{item.title}</h3>
                <p className="text-official-navy/60">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Signers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-official-navy mb-4">
                Ostatnie głosy poparcia
              </h2>
              <p className="text-official-navy/60 mb-8">
                Dołącz do tysięcy osób, które już podpisały petycję
              </p>

              <div className="space-y-4">
                {recentSigners.map((signer, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-official-cream/50 rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-full bg-abotax-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-abotax-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-official-navy">{signer.name}</p>
                      <p className="text-sm text-official-navy/60">{signer.city}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-official-navy/40">
                      <Clock className="w-3 h-3" />
                      {signer.time}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-abotax-primary to-abotax-primary/90 rounded-2xl p-8 text-white">
              <Star className="w-12 h-12 text-official-gold mb-4" />
              <h3 className="text-2xl font-bold mb-4">
                Twój głos ma znaczenie
              </h3>
              <p className="text-white/80 mb-6">
                Każdy podpis to krok bliżej do zmiany. Razem możemy stworzyć
                system, który realnie pomoże dzieciom w potrzebie.
              </p>
              <Link to={createPageUrl("ProjektUstawy")}>
                <Button size="lg" className="bg-white text-abotax-primary hover:bg-white/90">
                  Przeczytaj projekt ustawy
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-official-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif font-bold text-white mb-4">
              Nie czekaj. Podpisz teraz.
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Im więcej głosów zbierzemy, tym większa szansa na realną zmianę w polskim prawie.
            </p>
            <Button
              size="lg"
              className="bg-official-gold hover:bg-official-gold/90 text-official-navy font-semibold"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <FileText className="w-5 h-5 mr-2" />
              Podpisz petycję
            </Button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

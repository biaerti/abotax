import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Mail, Phone, MapPin, Users, CheckCircle2, Send, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export default function RegisterHome() {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    region: "",
    email: "",
    phone: "",
    description: "",
    children_count: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Zgłoszenie wysłane! Skontaktujemy się w ciągu 2 dni roboczych.");
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-official-cream flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="max-w-lg w-full border-official-navy/10 shadow-xl">
            <CardContent className="p-8 lg:p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-abotax-success flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-serif font-bold text-official-navy mb-4">Dziękujemy!</h1>
              <p className="text-official-navy/70 mb-8">
                Otrzymaliśmy zgłoszenie domu dziecka <span className="font-semibold text-abotax-primary">{formData.name}</span>.
                Skontaktujemy się w ciągu 2 dni roboczych, aby omówić szczegóły współpracy.
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="border-official-navy/20 text-official-navy"
              >
                Zgłoś kolejny dom
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

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
            <Badge className="bg-official-gold/20 text-official-gold border-official-gold/30 mb-6">
              <Scale className="w-3 h-3 mr-1" />
              Rejestracja placówki
            </Badge>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 mb-6">
              <Building2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
              Zarejestruj dom dziecka
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Dołącz do sieci placówek otrzymujących wsparcie przez Fundusz Rekompensaty Społecznej.
              Wypełnij formularz, a my skontaktujemy się w ciągu 2 dni roboczych.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-official-navy/10 shadow-xl">
              <CardContent className="p-8 lg:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-official-navy/70">Nazwa placówki *</Label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="np. Dom Dziecka 'Słoneczny'"
                        className="mt-2 border-official-navy/20 focus:border-abotax-primary"
                      />
                    </div>
                    <div>
                      <Label className="text-official-navy/70">Miasto *</Label>
                      <Input
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        placeholder="np. Warszawa"
                        className="mt-2 border-official-navy/20 focus:border-abotax-primary"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-official-navy/70">Email kontaktowy *</Label>
                      <div className="relative mt-2">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-official-navy/40" />
                        <Input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="kontakt@domdziecka.pl"
                          className="pl-10 border-official-navy/20 focus:border-abotax-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-official-navy/70">Telefon *</Label>
                      <div className="relative mt-2">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-official-navy/40" />
                        <Input
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="+48 123 456 789"
                          className="pl-10 border-official-navy/20 focus:border-abotax-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-official-navy/70">Województwo *</Label>
                      <div className="relative mt-2">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-official-navy/40" />
                        <select
                          required
                          value={formData.region}
                          onChange={(e) => setFormData({...formData, region: e.target.value})}
                          className="w-full pl-10 pr-4 py-2 border border-official-navy/20 rounded-lg focus:border-abotax-primary focus:outline-none bg-white text-official-navy"
                        >
                          <option value="">Wybierz województwo</option>
                          <option value="mazowieckie">Mazowieckie</option>
                          <option value="śląskie">Śląskie</option>
                          <option value="małopolskie">Małopolskie</option>
                          <option value="wielkopolskie">Wielkopolskie</option>
                          <option value="dolnośląskie">Dolnośląskie</option>
                          <option value="pomorskie">Pomorskie</option>
                          <option value="zachodniopomorskie">Zachodniopomorskie</option>
                          <option value="łódzkie">Łódzkie</option>
                          <option value="kujawsko-pomorskie">Kujawsko-pomorskie</option>
                          <option value="lubelskie">Lubelskie</option>
                          <option value="podkarpackie">Podkarpackie</option>
                          <option value="warmińsko-mazurskie">Warmińsko-mazurskie</option>
                          <option value="podlaskie">Podlaskie</option>
                          <option value="opolskie">Opolskie</option>
                          <option value="lubuskie">Lubuskie</option>
                          <option value="świętokrzyskie">Świętokrzyskie</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <Label className="text-official-navy/70">Liczba dzieci</Label>
                      <div className="relative mt-2">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-official-navy/40" />
                        <Input
                          type="number"
                          value={formData.children_count}
                          onChange={(e) => setFormData({...formData, children_count: e.target.value})}
                          placeholder="np. 24"
                          className="pl-10 border-official-navy/20 focus:border-abotax-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-official-navy/70">Krótki opis placówki</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Powiedz nam coś o Waszej placówce, potrzebach, specyfice..."
                      className="mt-2 h-32 border-official-navy/20 focus:border-abotax-primary"
                    />
                  </div>

                  <div className="bg-abotax-primary/5 rounded-xl p-6 border border-abotax-primary/10">
                    <h3 className="font-semibold text-official-navy mb-3">Co dalej?</h3>
                    <ul className="space-y-2 text-sm text-official-navy/70">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-abotax-success flex-shrink-0 mt-0.5" />
                        <span>Weryfikujemy dane placówki</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-abotax-success flex-shrink-0 mt-0.5" />
                        <span>Umówimy spotkanie/rozmowę online</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-abotax-success flex-shrink-0 mt-0.5" />
                        <span>Stworzymy profil placówki w systemie</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-abotax-success flex-shrink-0 mt-0.5" />
                        <span>Pomożemy zdefiniować pierwsze cele wsparcia</span>
                      </li>
                    </ul>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-abotax-primary hover:bg-abotax-primary-light text-white rounded-xl"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Wyślij zgłoszenie
                  </Button>

                  <p className="text-sm text-official-navy/50 text-center">
                    * Pola wymagane
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils/createPageUrl";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  CreditCard, 
  Building2, 
  Target, 
  ChevronRight,
  ChevronLeft,
  Check,
  Copy,
  Download,
  Users,
  Sparkles,
  Upload,
  FileText,
  AlertCircle,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const DOCUMENT_TYPES = [
  { 
    id: "invoice", 
    label: "Faktura / rachunek (prywatnie)", 
    description: "Dokument z prywatnej kliniki",
    icon: "📄"
  },
  { 
    id: "nfz", 
    label: "Dokument NFZ", 
    description: "Informacja o koszcie świadczenia finansowanego ze środków publicznych",
    icon: "🏥"
  },
  { 
    id: "manual", 
    label: "Wpłata dobrowolna (bez dokumentu)", 
    description: "Wsparcie systemu - wybierz kwotę samodzielnie",
    icon: "💝"
  }
];

const PROCEDURE_COSTS = [
  { label: "Zabieg farmakologiczny", amount: 1500 },
  { label: "Zabieg chirurgiczny (do 12 tyg.)", amount: 2500 },
  { label: "Zabieg chirurgiczny (12-20 tyg.)", amount: 4000 },
  { label: "Inna kwota", amount: 0 },
];

const PAYMENT_METHODS = [
  { id: "blik", name: "BLIK", icon: "📱" },
  { id: "card", name: "Karta płatnicza", icon: "💳" },
  { id: "transfer", name: "Przelew bankowy", icon: "🏦" },
];

export default function Contribute() {
  const urlParams = new URLSearchParams(window.location.search);
  const preselectedHome = urlParams.get("home");
  const preselectedGoal = urlParams.get("goal");

  const [step, setStep] = useState(1);
  const [documentType, setDocumentType] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);
  const [isProcessingDocument, setIsProcessingDocument] = useState(false);
  const [documentError, setDocumentError] = useState(null);
  const [extractedAmount, setExtractedAmount] = useState(null);
  const [amount, setAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedCost, setSelectedCost] = useState(2500);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isInstallment, setIsInstallment] = useState(false);
  const [installmentMonths, setInstallmentMonths] = useState(3);
  const [partnerSplit, setPartnerSplit] = useState(false);
  const [allocationType, setAllocationType] = useState(preselectedGoal ? "goal" : preselectedHome ? "home" : "auto");
  const [selectedHome, setSelectedHome] = useState(preselectedHome || "");
  const [selectedGoal, setSelectedGoal] = useState(preselectedGoal || "");
  const [anonymous, setAnonymous] = useState(true);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [contributionId, setContributionId] = useState(null);

  const queryClient = useQueryClient();

  const { data: homes = [] } = useQuery({
    queryKey: ['homes-all'],
    queryFn: () => db.homes.list(200),
  });

  const { data: goals = [] } = useQuery({
    queryKey: ['goals-all'],
    queryFn: () => db.goals.listActive(500),
  });

  const createContribution = useMutation({
    mutationFn: (data) => db.contributions.create(data),
    onSuccess: (result) => {
      setContributionId(result?.id);
      setIsComplete(true);
      queryClient.invalidateQueries({ queryKey: ['contributions'] });
    },
  });

  useEffect(() => {
    if (documentType === "manual") {
      if (selectedCost === 0) {
        setAmount(parseInt(customAmount) || 0);
      } else {
        setAmount(selectedCost);
      }
    } else if (extractedAmount) {
      setAmount(extractedAmount);
    }
  }, [documentType, selectedCost, customAmount, extractedAmount]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedFile(file);
    setIsProcessingDocument(true);
    setDocumentError(null);

    try {
      // TODO: Integrate with Supabase Storage + OCR service
      // For now, accept the file and prompt user for manual amount entry
      await new Promise(resolve => setTimeout(resolve, 1500));
      setDocumentError("Automatyczne odczytywanie kwoty będzie dostępne wkrótce. Wpisz kwotę ręcznie poniżej.");
      setDocumentType("manual");
      toast.info("Wpisz kwotę z dokumentu ręcznie.");
    } catch (error) {
      setDocumentError(error.message || "Błąd przetwarzania dokumentu");
      toast.error("Nie udało się przetworzyć dokumentu. Spróbuj ponownie lub wybierz wpłatę ręczną.");
    } finally {
      setIsProcessingDocument(false);
    }
  };

  const childrenHelped = Math.max(1, Math.floor(amount / 450));
  const monthlyAmount = isInstallment ? Math.ceil(amount / installmentMonths) : amount;
  const splitAmount = partnerSplit ? Math.ceil(amount / 2) : amount;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const contributionData = {
      amount: partnerSplit ? splitAmount : amount,
      payment_method: paymentMethod,
      is_installment: isInstallment,
      installment_months: isInstallment ? installmentMonths : null,
      allocation_type: allocationType,
      home_id: allocationType === "home" ? selectedHome : (allocationType === "goal" ? goals.find(g => g.id === selectedGoal)?.home_id : null),
      goal_id: allocationType === "goal" ? selectedGoal : null,
      status: "completed", // In real app would be "pending" until payment confirmation
      anonymous,
      email: email || null,
      partner_split: partnerSplit,
    };

    await createContribution.mutateAsync(contributionData);
    setIsSubmitting(false);
  };

  const copyPartnerLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}${createPageUrl("Contribute")}?amount=${splitAmount}`);
    toast.success("Link skopiowany!");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-official-navy mb-2">Ustalenie kwoty rekompensaty</h2>
              <p className="text-official-navy/60">Dodaj dokument lub wybierz wpłatę dobrowolną</p>
            </div>

            {/* Document type selection */}
            <RadioGroup value={documentType} onValueChange={setDocumentType}>
              <div className="space-y-3">
                {DOCUMENT_TYPES.map((type) => (
                  <label
                    key={type.id}
                    className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      documentType === type.id 
                        ? "border-abotax-primary bg-abotax-primary/5" 
                        : "border-abotax-primary/10 hover:border-abotax-primary/30"
                    }`}
                  >
                    <RadioGroupItem value={type.id} className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{type.icon}</span>
                        <span className="font-medium text-official-navy">{type.label}</span>
                      </div>
                      <p className="text-sm text-official-navy/60">{type.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </RadioGroup>

            {/* Document upload (for invoice/NFZ) */}
            {(documentType === "invoice" || documentType === "nfz") && (
              <div className="p-6 bg-official-cream rounded-xl border-2 border-dashed border-abotax-primary/20">
                <div className="text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-abotax-primary/40" />
                  <h3 className="font-semibold text-official-navy mb-2">
                    {documentType === "invoice" ? "Dodaj fakturę lub rachunek" : "Dodaj dokument NFZ"}
                  </h3>
                  <p className="text-sm text-official-navy/60 mb-4">
                    {documentType === "invoice" 
                      ? "PDF lub zdjęcie dokumentu z prywatnej kliniki"
                      : "Informacja o koszcie świadczenia zdrowotnego"
                    }
                  </p>
                  
                  <input
                    type="file"
                    id="document-upload"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={isProcessingDocument}
                  />
                  <label htmlFor="document-upload">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-abotax-primary text-abotax-primary cursor-pointer"
                      disabled={isProcessingDocument}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('document-upload').click();
                      }}
                    >
                      {isProcessingDocument ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Przetwarzanie...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          Wybierz plik
                        </>
                      )}
                    </Button>
                  </label>

                  {uploadedFile && (
                    <div className="mt-4 p-3 bg-white rounded-lg border border-abotax-primary/10">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-abotax-primary" />
                        <div className="flex-1 text-left">
                          <p className="font-medium text-sm text-official-navy">{uploadedFile.name}</p>
                          {extractedAmount && (
                            <p className="text-sm text-abotax-success">
                              ✓ Wykryto kwotę: {extractedAmount.toLocaleString("pl-PL")} zł
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {documentError && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-red-900">Błąd przetwarzania</p>
                        <p className="text-sm text-red-700">{documentError}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Manual amount (for voluntary contributions) */}
            {documentType === "manual" && (
              <div className="space-y-4">
                <RadioGroup value={selectedCost.toString()} onValueChange={(v) => setSelectedCost(parseInt(v))}>
                  <div className="space-y-3">
                    {PROCEDURE_COSTS.map((cost) => (
                      <label
                        key={cost.amount}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedCost === cost.amount 
                            ? "border-abotax-primary bg-abotax-primary/5" 
                            : "border-abotax-primary/10 hover:border-abotax-primary/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value={cost.amount.toString()} />
                          <span className="font-medium text-official-navy">{cost.label}</span>
                        </div>
                        {cost.amount > 0 && (
                          <span className="font-bold text-abotax-primary">{cost.amount.toLocaleString("pl-PL")} zł</span>
                        )}
                      </label>
                    ))}
                  </div>
                </RadioGroup>

                {selectedCost === 0 && (
                  <div>
                    <Label className="text-official-navy/70">Wpisz kwotę</Label>
                    <div className="relative mt-2">
                      <Input
                        type="number"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        placeholder="0"
                        className="text-2xl font-bold pr-12 border-abotax-primary/20 focus:border-abotax-primary"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-official-navy/40">zł</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Amount summary */}
            {extractedAmount && (documentType === "invoice" || documentType === "nfz") && (
              <div className="p-6 bg-gradient-to-r from-abotax-primary to-abotax-primary-light rounded-xl text-white">
                <div className="text-center">
                  <p className="text-white/80 mb-2">Na podstawie dokumentu ustalono:</p>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-white/90">Koszt zabiegu:</span>
                      <span className="text-2xl font-bold">{extractedAmount.toLocaleString("pl-PL")} zł</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-white/20">
                      <span className="text-white/90">Wymagana rekompensata społeczna:</span>
                      <span className="text-2xl font-bold">{extractedAmount.toLocaleString("pl-PL")} zł</span>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm mt-3">
                    = 100% wartości dokumentu
                  </p>
                </div>
              </div>
            )}

            {/* Impact preview */}
            {amount > 0 && (
              <div className="p-4 bg-gradient-to-r from-abotax-primary/5 to-abotax-secondary/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-abotax-secondary/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-abotax-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-official-navy">
                      Twoja wpłata = wsparcie dla {childrenHelped} {childrenHelped === 1 ? "dziecka" : "dzieci"}
                    </p>
                    <p className="text-sm text-official-navy/60">przez cały miesiąc</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-official-navy mb-2">Forma płatności</h2>
              <p className="text-official-navy/60">Jak chcesz uregulować rekompensatę?</p>
            </div>

            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="grid grid-cols-3 gap-3">
                {PAYMENT_METHODS.map((method) => (
                  <label
                    key={method.id}
                    className={`flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === method.id 
                        ? "border-abotax-primary bg-abotax-primary/5" 
                        : "border-abotax-primary/10 hover:border-abotax-primary/30"
                    }`}
                  >
                    <RadioGroupItem value={method.id} className="sr-only" />
                    <span className="text-3xl mb-2">{method.icon}</span>
                    <span className="text-sm font-medium text-official-navy">{method.name}</span>
                  </label>
                ))}
              </div>
            </RadioGroup>

            {/* Installments */}
            <div className="p-4 rounded-xl border border-abotax-primary/10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-official-navy">Płatność w ratach</h3>
                  <p className="text-sm text-official-navy/60">Rozłóż wpłatę na mniejsze części</p>
                </div>
                <Checkbox
                  checked={isInstallment}
                  onCheckedChange={setIsInstallment}
                  className="border-abotax-primary data-[state=checked]:bg-abotax-primary"
                />
              </div>

              {isInstallment && (
                <div className="mt-4 pt-4 border-t border-abotax-primary/10">
                  <Label className="text-official-navy/70 mb-2 block">Liczba rat</Label>
                  <div className="flex gap-2">
                    {[3, 6, 12].map((months) => (
                      <Button
                        key={months}
                        type="button"
                        variant={installmentMonths === months ? "default" : "outline"}
                        className={installmentMonths === months ? "gradient-primary text-white" : "border-abotax-primary/20 text-abotax-primary"}
                        onClick={() => setInstallmentMonths(months)}
                      >
                        {months} mies.
                      </Button>
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-abotax-primary font-medium">
                    Rata miesięczna: {monthlyAmount.toLocaleString("pl-PL")} zł
                  </p>
                </div>
              )}
            </div>

            {/* Partner split */}
            <div className="p-4 rounded-xl border border-abotax-secondary/30 bg-abotax-secondary/5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-official-navy">Podziel z partnerem 50/50</h3>
                  <p className="text-sm text-official-navy/60">Wygenerujemy link do drugiej wpłaty</p>
                </div>
                <Checkbox
                  checked={partnerSplit}
                  onCheckedChange={setPartnerSplit}
                  className="border-abotax-secondary data-[state=checked]:bg-abotax-secondary"
                />
              </div>

              {partnerSplit && (
                <div className="mt-4 pt-4 border-t border-abotax-secondary/20">
                  <p className="text-sm text-official-navy/70 mb-2">
                    Twoja część: <span className="font-bold text-abotax-primary">{splitAmount.toLocaleString("pl-PL")} zł</span>
                  </p>
                  <p className="text-sm text-official-navy/70">
                    Część partnera: <span className="font-bold text-abotax-secondary">{splitAmount.toLocaleString("pl-PL")} zł</span>
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-official-navy mb-2">Gdzie trafią środki?</h2>
              <p className="text-official-navy/60">Zdecyduj, jak rozdysponować wpłatę</p>
            </div>

            <RadioGroup value={allocationType} onValueChange={setAllocationType}>
              <div className="space-y-3">
                <label
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    allocationType === "auto" 
                      ? "border-abotax-primary bg-abotax-primary/5" 
                      : "border-abotax-primary/10 hover:border-abotax-primary/30"
                  }`}
                >
                  <RadioGroupItem value="auto" className="mt-1" />
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-abotax-secondary" />
                      <span className="font-medium text-official-navy">Pozwól nam rozdysponować</span>
                    </div>
                    <p className="text-sm text-official-navy/60 mt-1">
                      Środki trafią tam, gdzie są najbardziej potrzebne
                    </p>
                  </div>
                </label>

                <label
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    allocationType === "home" 
                      ? "border-abotax-primary bg-abotax-primary/5" 
                      : "border-abotax-primary/10 hover:border-abotax-primary/30"
                  }`}
                >
                  <RadioGroupItem value="home" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-abotax-primary" />
                      <span className="font-medium text-official-navy">Wybierz dom dziecka</span>
                    </div>
                    <p className="text-sm text-official-navy/60 mt-1 mb-3">
                      Wsparcie trafi do wybranego domu
                    </p>
                    {allocationType === "home" && (
                      <select
                        value={selectedHome}
                        onChange={(e) => setSelectedHome(e.target.value)}
                        className="w-full p-3 rounded-lg border border-abotax-primary/20 focus:border-abotax-primary focus:outline-none"
                      >
                        <option value="">Wybierz dom dziecka...</option>
                        {homes.map((home) => (
                          <option key={home.id} value={home.id}>
                            {home.name} - {home.city}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </label>

                <label
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    allocationType === "goal" 
                      ? "border-abotax-primary bg-abotax-primary/5" 
                      : "border-abotax-primary/10 hover:border-abotax-primary/30"
                  }`}
                >
                  <RadioGroupItem value="goal" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-abotax-secondary" />
                      <span className="font-medium text-official-navy">Wybierz konkretny cel</span>
                    </div>
                    <p className="text-sm text-official-navy/60 mt-1 mb-3">
                      Wpłata na konkretny przedmiot lub projekt
                    </p>
                    {allocationType === "goal" && (
                      <select
                        value={selectedGoal}
                        onChange={(e) => setSelectedGoal(e.target.value)}
                        className="w-full p-3 rounded-lg border border-abotax-primary/20 focus:border-abotax-primary focus:outline-none"
                      >
                        <option value="">Wybierz cel...</option>
                        {goals.map((goal) => {
                          const home = homes.find(h => h.id === goal.home_id);
                          const progress = Math.min(100, (goal.current_amount / goal.target_amount) * 100);
                          return (
                            <option key={goal.id} value={goal.id}>
                              {goal.title} ({home?.name}) - {progress.toFixed(0)}% zebrane
                            </option>
                          );
                        })}
                      </select>
                    )}
                  </div>
                </label>
              </div>
            </RadioGroup>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-official-navy mb-2">Dane kontaktowe</h2>
              <p className="text-official-navy/60">Opcjonalnie - możesz pozostać anonimowy/a</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-abotax-primary/10">
                <div>
                  <h3 className="font-medium text-official-navy">Pełna anonimowość</h3>
                  <p className="text-sm text-official-navy/60">Nie przechowujemy żadnych danych</p>
                </div>
                <Checkbox
                  checked={anonymous}
                  onCheckedChange={setAnonymous}
                  className="border-abotax-primary data-[state=checked]:bg-abotax-primary"
                />
              </div>

              {!anonymous && (
                <div>
                  <Label className="text-official-navy/70">Email (do potwierdzenia)</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="twoj@email.pl"
                    className="mt-2 border-abotax-primary/20 focus:border-abotax-primary"
                  />
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="p-6 bg-official-cream rounded-xl">
              <h3 className="font-bold text-official-navy mb-4">Podsumowanie</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-official-navy/60">Kwota wpłaty</span>
                  <span className="font-semibold text-official-navy">
                    {(partnerSplit ? splitAmount : amount).toLocaleString("pl-PL")} zł
                  </span>
                </div>
                {isInstallment && (
                  <div className="flex justify-between">
                    <span className="text-official-navy/60">Rata miesięczna</span>
                    <span className="font-semibold text-official-navy">
                      {Math.ceil((partnerSplit ? splitAmount : amount) / installmentMonths).toLocaleString("pl-PL")} zł × {installmentMonths}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-official-navy/60">Metoda płatności</span>
                  <span className="font-semibold text-official-navy">
                    {PAYMENT_METHODS.find(m => m.id === paymentMethod)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-official-navy/60">Alokacja</span>
                  <span className="font-semibold text-official-navy">
                    {allocationType === "auto" && "Automatyczna"}
                    {allocationType === "home" && homes.find(h => h.id === selectedHome)?.name}
                    {allocationType === "goal" && goals.find(g => g.id === selectedGoal)?.title}
                  </span>
                </div>
                <div className="pt-3 border-t border-abotax-primary/10 flex justify-between">
                  <span className="font-medium text-official-navy">Wpływ na dzieci</span>
                  <span className="font-bold text-abotax-primary">
                    ~{Math.max(1, Math.floor((partnerSplit ? splitAmount : amount) / 450))} dzieci / miesiąc
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-official-cream flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-8 lg:p-12 max-w-lg w-full text-center shadow-xl"
        >
          <div className="w-20 h-20 rounded-full bg-abotax-success flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-official-navy mb-4">Dziękujemy!</h1>
          <p className="text-official-navy/70 mb-8">
            Twoja wpłata {(partnerSplit ? splitAmount : amount).toLocaleString("pl-PL")} zł została przyjęta. 
            Razem zmieniamy życie dzieci na lepsze.
          </p>

          {partnerSplit && (
            <div className="p-4 bg-abotax-secondary/10 rounded-xl mb-6">
              <p className="text-sm text-official-navy/70 mb-3">Link do wpłaty dla partnera:</p>
              <div className="flex gap-2">
                <Input 
                  readOnly 
                  value={`${window.location.origin}${createPageUrl("Contribute")}?amount=${splitAmount}`}
                  className="text-xs"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={copyPartnerLink}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="outline" 
              className="flex-1 border-abotax-primary text-abotax-primary"
              onClick={() => toast.success("Certyfikat pobrany!")}
            >
              <Download className="w-4 h-4 mr-2" />
              Pobierz certyfikat
            </Button>
            <Link to={createPageUrl("Home")} className="flex-1">
              <Button className="w-full gradient-primary text-white">
                Wróć do strony głównej
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-official-cream">
      {/* Progress bar */}
      <div className="fixed top-16 left-0 right-0 h-1 bg-abotax-primary/10 z-40">
        <motion.div 
          className="h-full gradient-primary"
          initial={{ width: 0 }}
          animate={{ width: `${(step / 4) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Steps indicator - desktop */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-32">
              <h1 className="text-3xl font-bold text-official-navy mb-8">Wpłać rekompensatę</h1>
              <div className="space-y-4">
                {[
                  { num: 1, title: "Dokument", desc: "Ustal kwotę rekompensaty" },
                  { num: 2, title: "Forma płatności", desc: "Metoda i opcje rozłożenia" },
                  { num: 3, title: "Alokacja", desc: "Gdzie trafią środki?" },
                  { num: 4, title: "Podsumowanie", desc: "Potwierdź i wpłać" },
                ].map((s) => (
                  <div 
                    key={s.num}
                    className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                      step === s.num ? "bg-abotax-primary/10" : ""
                    }`}
                  >
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                        step > s.num 
                          ? "bg-abotax-success text-white" 
                          : step === s.num 
                            ? "gradient-primary text-white"
                            : "bg-abotax-primary/10 text-official-navy/40"
                      }`}
                    >
                      {step > s.num ? <Check className="w-5 h-5" /> : s.num}
                    </div>
                    <div>
                      <p className={`font-medium ${step >= s.num ? "text-official-navy" : "text-official-navy/40"}`}>
                        {s.title}
                      </p>
                      <p className={`text-sm ${step >= s.num ? "text-official-navy/60" : "text-official-navy/30"}`}>
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Amount preview */}
              <div className="mt-8 p-6 bg-gradient-to-br from-abotax-primary to-abotax-primary-light rounded-2xl text-white">
                <p className="text-white/70 text-sm">Twoja rekompensata</p>
                <p className="text-4xl font-bold mt-1">
                  {(partnerSplit ? splitAmount : amount).toLocaleString("pl-PL")} zł
                </p>
                {isInstallment && (
                  <p className="text-white/70 text-sm mt-2">
                    {Math.ceil((partnerSplit ? splitAmount : amount) / installmentMonths).toLocaleString("pl-PL")} zł / miesiąc × {installmentMonths}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {/* Mobile header */}
            <div className="lg:hidden mb-6">
              <h1 className="text-2xl font-bold text-official-navy">Wpłać rekompensatę</h1>
              <p className="text-official-navy/60 mt-1">Krok {step} z 4</p>
            </div>

            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-abotax-primary/5">
              <AnimatePresence mode="wait">
                {renderStep()}
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-abotax-primary/10">
                <Button
                  variant="ghost"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1}
                  className="text-official-navy/60"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Wstecz
                </Button>

                {step < 4 ? (
                  <Button
                    onClick={() => setStep(step + 1)}
                    className="gradient-primary text-white"
                    disabled={
                      (step === 1 && !documentType) ||
                      (step === 1 && (documentType === "invoice" || documentType === "nfz") && !extractedAmount) ||
                      (step === 1 && documentType === "manual" && amount <= 0) ||
                      (step === 3 && allocationType === "home" && !selectedHome) ||
                      (step === 3 && allocationType === "goal" && !selectedGoal)
                    }
                  >
                    Dalej
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="gradient-primary text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Przetwarzanie...
                      </>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 mr-2" />
                        Wpłać {(partnerSplit ? splitAmount : amount).toLocaleString("pl-PL")} zł
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
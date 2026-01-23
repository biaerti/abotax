import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Download,
  Share2,
  Instagram,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Scale,
  Heart,
  Edit3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { createPageUrl } from "@/utils/createPageUrl";
import html2canvas from "html2canvas";

const PRESET_REASONS = [
  {
    id: "compromise",
    text: "Bo wierzę w kompromisy",
    emoji: "🤝"
  },
  {
    id: "children",
    text: "Bo dzieci w domach dziecka zasługują na więcej",
    emoji: "💛"
  },
  {
    id: "war_end",
    text: "Bo chcę końca wojny kulturowej",
    emoji: "✌️"
  },
  {
    id: "no_sides",
    text: "Bo nie należę do żadnego obozu",
    emoji: "🎯"
  },
  {
    id: "stigma",
    text: "Bo mam dość stygmatyzowania",
    emoji: "🚫"
  },
  {
    id: "solution",
    text: "Bo to da się rozwiązać",
    emoji: "💡"
  }
];

export default function GeneratorIG() {
  const [selectedReason, setSelectedReason] = useState(null);
  const [customText, setCustomText] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const canvasRef = useRef(null);

  const currentText = isCustom ? customText : (selectedReason?.text || "");

  const generateImage = async () => {
    if (!currentText) return;

    setIsGenerating(true);

    try {
      const element = canvasRef.current;
      if (element) {
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          backgroundColor: null
        });

        const dataUrl = canvas.toDataURL("image/png");
        setGeneratedImage(dataUrl);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    }

    setIsGenerating(false);
  };

  const downloadImage = () => {
    if (!generatedImage) return;

    const link = document.createElement("a");
    link.download = "popieram-abotax.png";
    link.href = generatedImage;
    link.click();
  };

  const shareToInstagram = () => {
    // On mobile, try to open Instagram
    window.open("https://instagram.com/abotax.pl", "_blank");
  };

  return (
    <div className="min-h-screen bg-official-cream">
      {/* Header */}
      <section className="bg-gradient-to-br from-official-navy via-official-navy to-official-navy/90 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to={createPageUrl("PodpiszPetycje")} className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Wróć do petycji
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="bg-official-gold/20 text-official-gold border-official-gold/30 mb-4">
              <Instagram className="w-3 h-3 mr-1" />
              Generator na Instagram Story
            </Badge>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
              Podziel się na social media
            </h1>
            <p className="text-white/80 max-w-xl">
              Wygeneruj obrazek i wrzuć na Instagram Story. Oznacz @abotax.pl!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Options */}
            <div>
              <h2 className="text-xl font-bold text-official-navy mb-6">
                Dlaczego popierasz AboTax?
              </h2>

              {/* Preset reasons */}
              <div className="space-y-3 mb-8">
                {PRESET_REASONS.map((reason) => (
                  <motion.button
                    key={reason.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedReason(reason);
                      setIsCustom(false);
                      setGeneratedImage(null);
                    }}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      selectedReason?.id === reason.id && !isCustom
                        ? "border-abotax-primary bg-abotax-primary/5"
                        : "border-official-navy/10 bg-white hover:border-official-navy/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{reason.emoji}</span>
                      <span className="font-medium text-official-navy">{reason.text}</span>
                      {selectedReason?.id === reason.id && !isCustom && (
                        <CheckCircle2 className="w-5 h-5 text-abotax-primary ml-auto" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Custom text option */}
              <div className="mb-8">
                <button
                  onClick={() => {
                    setIsCustom(true);
                    setSelectedReason(null);
                    setGeneratedImage(null);
                  }}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all mb-3 ${
                    isCustom
                      ? "border-abotax-primary bg-abotax-primary/5"
                      : "border-official-navy/10 bg-white hover:border-official-navy/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Edit3 className="w-6 h-6 text-official-navy/60" />
                    <span className="font-medium text-official-navy">Napisz własny powód</span>
                    {isCustom && (
                      <CheckCircle2 className="w-5 h-5 text-abotax-primary ml-auto" />
                    )}
                  </div>
                </button>

                {isCustom && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <Input
                      value={customText}
                      onChange={(e) => {
                        setCustomText(e.target.value);
                        setGeneratedImage(null);
                      }}
                      placeholder="Bo..."
                      maxLength={60}
                      className="border-official-navy/20"
                    />
                    <p className="text-xs text-official-navy/50 mt-1">{customText.length}/60 znaków</p>
                  </motion.div>
                )}
              </div>

              {/* Generate button */}
              <Button
                onClick={generateImage}
                disabled={!currentText || isGenerating}
                size="lg"
                className="w-full bg-abotax-primary hover:bg-abotax-primary/90 text-white"
              >
                {isGenerating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                    />
                    Generuję...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Wygeneruj obrazek
                  </>
                )}
              </Button>
            </div>

            {/* Right - Preview */}
            <div>
              <h2 className="text-xl font-bold text-official-navy mb-6">
                Podgląd
              </h2>

              {/* Canvas for generation (hidden but rendered) */}
              <div
                ref={canvasRef}
                className="w-[360px] h-[640px] mx-auto rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, #1a365d 0%, #1A5F5A 100%)"
                }}
              >
                <div className="h-full flex flex-col justify-between p-8">
                  {/* Top */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <Scale className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white/70 text-xs">Inicjatywa obywatelska</p>
                        <p className="text-official-gold font-bold text-sm">AboTax</p>
                      </div>
                    </div>

                    <h2 className="text-white text-3xl font-serif font-bold leading-tight mb-2">
                      Popieram<br />
                      <span className="text-official-gold">Fundusz Rekompensaty</span>
                    </h2>
                  </div>

                  {/* Middle - Reason */}
                  <div className="flex-1 flex items-center justify-center py-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <p className="text-white text-xl font-medium text-center leading-relaxed">
                        {currentText || "Wybierz powód..."}
                      </p>
                    </div>
                  </div>

                  {/* Bottom */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Heart className="w-5 h-5 text-official-gold" />
                      <span className="text-white/90 text-sm">Życie za życie — rekompensata, nie kara</span>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                      <Instagram className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-medium">@abotax.pl</span>
                    </div>
                    <p className="text-white/60 text-xs mt-3">abotax.pl • #AboTax</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {generatedImage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex gap-3"
                >
                  <Button
                    onClick={downloadImage}
                    size="lg"
                    className="flex-1 bg-official-navy hover:bg-official-navy/90 text-white"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Pobierz
                  </Button>
                  <Button
                    onClick={shareToInstagram}
                    size="lg"
                    variant="outline"
                    className="flex-1 border-official-navy/20"
                  >
                    <Instagram className="w-5 h-5 mr-2" />
                    @abotax.pl
                  </Button>
                </motion.div>
              )}

              {/* Instructions */}
              <Card className="mt-6 border-official-navy/10">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-official-navy text-sm mb-2">Jak udostępnić?</h4>
                  <ol className="text-sm text-official-navy/70 space-y-1">
                    <li>1. Pobierz obrazek</li>
                    <li>2. Wrzuć na Instagram Story</li>
                    <li>3. Oznacz @abotax.pl</li>
                    <li>4. Dodaj #AboTax</li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

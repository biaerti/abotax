import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Coins, Home, Upload, Check, ArrowRight, Sparkles } from "lucide-react";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  // Auto-advance steps every 1.5 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      icon: FileText,
      title: "Wrzuć dokument",
      description: "Faktura lub dokument NFZ z kosztem zabiegu",
      detail: "System automatycznie odczyta kwotę"
    },
    {
      icon: Coins,
      title: "Opłata solidarnościowa",
      description: "100% wartości dokumentu",
      detail: "Możliwość rat lub wolontariatu"
    },
    {
      icon: Home,
      title: "Wsparcie dla dzieci",
      description: "Środki trafiają do domów dziecka",
      detail: "Ty wybierasz konkretny cel lub dom"
    }
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-[#2D3436] mb-4">
            Jak to działa?
          </h2>
          <p className="text-[#2D3436]/70 text-lg lg:text-xl max-w-3xl mx-auto">
            Prosty proces, który zamienia decyzję życiową w realne wsparcie dla dzieci potrzebujących pomocy
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Phone Mockup with Animation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Phone Frame */}
            <div className="relative mx-auto w-[320px] h-[640px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[50px] shadow-2xl p-4 border-8 border-gray-900">
              {/* Screen */}
              <div className="relative w-full h-full bg-white rounded-[42px] overflow-hidden">
                {/* Status Bar */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-white z-10 flex items-center justify-between px-6">
                  <span className="text-xs font-semibold">9:41</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-2 bg-gray-300 rounded-sm" />
                    <div className="w-4 h-2 bg-gray-300 rounded-sm" />
                    <div className="w-4 h-2 bg-gray-800 rounded-sm" />
                  </div>
                </div>

                {/* Content - Animated Steps */}
                <div className="pt-8 px-6 h-full overflow-hidden">
                  <AnimatePresence mode="wait">
                    {activeStep === 0 && (
                      <motion.div
                        key="step0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                      >
                        <h3 className="text-lg font-bold text-[#1A5F5A]">Dodaj dokument</h3>
                        
                        {/* Upload Area */}
                        <motion.div
                          animate={{
                            scale: [1, 1.02, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="border-2 border-dashed border-[#1A5F5A]/30 rounded-2xl p-8 bg-[#1A5F5A]/5 text-center"
                        >
                          <motion.div
                            animate={{
                              y: [0, -10, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <Upload className="w-12 h-12 mx-auto mb-3 text-[#1A5F5A]" />
                          </motion.div>
                          <p className="text-sm font-medium text-[#2D3436]">Wrzuć fakturę lub dokument NFZ</p>
                        </motion.div>

                        {/* Example Document */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="bg-gray-50 rounded-xl p-4 flex items-center gap-3"
                        >
                          <FileText className="w-8 h-8 text-[#E8A87C]" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-[#2D3436]">faktura_2024.pdf</p>
                            <p className="text-xs text-[#2D3436]/50">2,430 zł</p>
                          </div>
                          <Check className="w-5 h-5 text-[#95B89C]" />
                        </motion.div>
                      </motion.div>
                    )}

                    {activeStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                      >
                        <h3 className="text-lg font-bold text-[#1A5F5A]">Kwota rekompensaty</h3>
                        
                        {/* Amount Display */}
                        <div className="bg-gradient-to-br from-[#1A5F5A] to-[#2A7A74] rounded-2xl p-6 text-white text-center">
                          <p className="text-sm opacity-80 mb-2">Na podstawie dokumentu:</p>
                          <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="text-4xl font-bold mb-1"
                          >
                            2,430 zł
                          </motion.div>
                          <p className="text-xs opacity-70">= 100% wartości zabiegu</p>
                        </div>

                        {/* Payment Options */}
                        <div className="space-y-2">
                          <div className="bg-white border-2 border-[#1A5F5A] rounded-xl p-3 flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full bg-[#1A5F5A]" />
                            <span className="text-sm font-medium">Jednorazowo</span>
                          </div>
                          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                            <span className="text-sm text-[#2D3436]/70">Raty (12 × 202 zł)</span>
                          </div>
                          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                            <span className="text-sm text-[#2D3436]/70">Wolontariat</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                      >
                        <h3 className="text-lg font-bold text-[#1A5F5A]">Wybierz cel</h3>
                        
                        {/* Goal Cards */}
                        <div className="space-y-3">
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-gradient-to-br from-[#E8A87C]/10 to-white border-2 border-[#E8A87C] rounded-xl p-4"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Sparkles className="w-4 h-4 text-[#E8A87C]" />
                              <span className="text-sm font-bold text-[#2D3436]">PlayStation 5</span>
                            </div>
                            <p className="text-xs text-[#2D3436]/60 mb-2">Dom Dziecka "Słoneczny" - Warszawa</p>
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                              <div className="bg-[#E8A87C] h-2 rounded-full" style={{ width: '68%' }} />
                            </div>
                            <p className="text-xs text-[#2D3436]/50">1,720 / 2,500 zł</p>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white border border-gray-200 rounded-xl p-4"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Home className="w-4 h-4 text-[#95B89C]" />
                              <span className="text-sm font-medium text-[#2D3436]">Remont pokoi</span>
                            </div>
                            <p className="text-xs text-[#2D3436]/60 mb-2">Dom Dziecka "Promyk" - Kraków</p>
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                              <div className="bg-[#95B89C] h-2 rounded-full" style={{ width: '45%' }} />
                            </div>
                            <p className="text-xs text-[#2D3436]/50">4,500 / 10,000 zł</p>
                          </motion.div>
                        </div>

                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="w-full bg-[#1A5F5A] text-white rounded-xl py-3 font-medium flex items-center justify-center gap-2"
                        >
                          Wpłać 2,430 zł
                          <Check className="w-5 h-5" />
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Home Button */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-700 rounded-full" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#E8A87C]/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#1A5F5A]/20 rounded-full blur-2xl" />
          </motion.div>

          {/* Steps List */}
          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              const isPast = activeStep > index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveStep(index)}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    isActive ? 'scale-105' : 'hover:scale-102'
                  }`}
                >
                  <div className={`p-6 rounded-2xl border-2 transition-all ${
                    isActive 
                      ? 'border-[#1A5F5A] bg-[#1A5F5A]/5 shadow-lg' 
                      : isPast
                      ? 'border-[#95B89C] bg-white shadow-md'
                      : 'border-gray-200 bg-white'
                  }`}>
                    <div className="flex items-start gap-4">
                      {/* Step Number/Icon */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                        isActive 
                          ? 'bg-[#1A5F5A] text-white' 
                          : isPast
                          ? 'bg-[#95B89C] text-white'
                          : 'bg-gray-100 text-[#2D3436]/40'
                      }`}>
                        {isPast ? (
                          <Check className="w-6 h-6" />
                        ) : (
                          <Icon className="w-6 h-6" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`text-xl font-bold ${
                            isActive ? 'text-[#1A5F5A]' : 'text-[#2D3436]'
                          }`}>
                            {index + 1}. {step.title}
                          </h3>
                          {isActive && (
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <ArrowRight className="w-5 h-5 text-[#1A5F5A]" />
                            </motion.div>
                          )}
                        </div>
                        <p className="text-[#2D3436]/70 mb-1">{step.description}</p>
                        <p className="text-sm text-[#1A5F5A] font-medium">{step.detail}</p>
                      </div>
                    </div>
                  </div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-[38px] top-full w-0.5 h-6 bg-gradient-to-b from-gray-300 to-transparent" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
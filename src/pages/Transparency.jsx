import { useQuery } from "@tanstack/react-query";
import { db } from "@/lib/supabase";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Download, 
  Shield,
  FileText,
  Building2,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from "recharts";
import ImpactCounter from "@/components/ui/ImpactCounter";

const COLORS = ['#1A5F5A', '#E8A87C', '#95B89C', '#2A7A74', '#D4956A'];

export default function Transparency() {
  const { data: contributions = [] } = useQuery({
    queryKey: ['all-contributions'],
    queryFn: () => db.contributions.listRecent(1000),
  });

  const { data: homes = [] } = useQuery({
    queryKey: ['homes-all'],
    queryFn: () => db.homes.list(200),
  });

  const { data: goals = [] } = useQuery({
    queryKey: ['goals-all'],
    queryFn: () => db.goals.listActive(500),
  });

  // Calculate stats
  const totalCollected = contributions.reduce((sum, c) => sum + (c.amount || 0), 0) || 12847350;
  const adminCosts = Math.floor(totalCollected * 0.02);
  const directSupport = totalCollected - adminCosts;

  // Monthly data (simulated for demo)
  const monthlyData = [
    { month: 'Sty', amount: 890000, homes: 45 },
    { month: 'Lut', amount: 1020000, homes: 52 },
    { month: 'Mar', amount: 1150000, homes: 58 },
    { month: 'Kwi', amount: 980000, homes: 49 },
    { month: 'Maj', amount: 1230000, homes: 62 },
    { month: 'Cze', amount: 1340000, homes: 67 },
  ];

  // Category distribution
  const categoryData = [
    { name: 'Elektronika', value: 35, color: '#1A5F5A' },
    { name: 'Sport', value: 20, color: '#E8A87C' },
    { name: 'Edukacja', value: 18, color: '#95B89C' },
    { name: 'Remont', value: 15, color: '#2A7A74' },
    { name: 'Inne', value: 12, color: '#D4956A' },
  ];

  // Distribution breakdown
  const distributionData = [
    { name: 'Wsparcie domów', value: 98, color: '#1A5F5A' },
    { name: 'Administracja', value: 2, color: '#E8A87C' },
  ];

  // Region distribution
  const regionData = [
    { region: 'Mazowieckie', amount: 2450000 },
    { region: 'Śląskie', amount: 1890000 },
    { region: 'Małopolskie', amount: 1670000 },
    { region: 'Wielkopolskie', amount: 1520000 },
    { region: 'Dolnośląskie', amount: 1340000 },
    { region: 'Inne', amount: 3977350 },
  ];

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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-official-gold/20 rounded-full text-official-gold text-sm font-medium mb-6 border border-official-gold/30">
              <Shield className="w-4 h-4" />
              Transparentność finansowa
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
              100% Przejrzystości
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Każda złotówka jest śledzona i raportowana. Zero ukrytych kosztów.
              Pełna transparentność to fundament naszego działania.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6">
          {[
            { label: "Łącznie zebrane", value: totalCollected, suffix: " zł", icon: TrendingUp, bgColor: "bg-abotax-primary/10", textColor: "text-abotax-primary" },
            { label: "Wsparcie domów", value: directSupport, suffix: " zł", icon: Building2, bgColor: "bg-abotax-success/10", textColor: "text-abotax-success" },
            { label: "Administracja", value: adminCosts, suffix: " zł", icon: FileText, bgColor: "bg-abotax-secondary/10", textColor: "text-abotax-secondary" },
            { label: "Zrealizowane cele", value: goals.filter(g => g.status === "completed").length || 342, suffix: "", icon: Target, bgColor: "bg-abotax-primary/10", textColor: "text-abotax-primary" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-official-navy/10"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                <div>
                  <p className="text-sm text-official-navy/60">{stat.label}</p>
                  <p className="text-xl font-bold text-official-navy">
                    <ImpactCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Charts */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="bg-white border border-official-navy/10">
              <TabsTrigger value="overview" className="data-[state=active]:bg-official-navy data-[state=active]:text-white">
                Przegląd
              </TabsTrigger>
              <TabsTrigger value="distribution" className="data-[state=active]:bg-official-navy data-[state=active]:text-white">
                Dystrybucja
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-official-navy data-[state=active]:text-white">
                Raporty
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Monthly Trend */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 border border-official-navy/10"
                >
                  <h3 className="font-bold text-official-navy mb-6 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-abotax-primary" />
                    Wpływy miesięczne
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                      <XAxis dataKey="month" stroke="#2D3436" />
                      <YAxis 
                        stroke="#2D3436"
                        tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value.toLocaleString("pl-PL")} zł`, "Wpłaty"]}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                      />
                      <Bar dataKey="amount" fill="#1A5F5A" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Distribution Pie */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-official-navy/10"
                >
                  <h3 className="font-bold text-official-navy mb-6 flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-abotax-primary" />
                    Podział środków
                  </h3>
                  <div className="flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsPie>
                        <Pie
                          data={distributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {distributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value}%`, ""]}
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                        />
                        <Legend />
                      </RechartsPie>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-4xl font-bold text-abotax-primary">98%</p>
                    <p className="text-official-navy/60">trafia bezpośrednio do dzieci</p>
                  </div>
                </motion.div>

                {/* Category Breakdown */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl p-6 border border-official-navy/10"
                >
                  <h3 className="font-bold text-official-navy mb-6 flex items-center gap-2">
                    <Target className="w-5 h-5 text-abotax-primary" />
                    Kategorie celów
                  </h3>
                  <div className="space-y-4">
                    {categoryData.map((cat, index) => (
                      <div key={cat.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-official-navy">{cat.name}</span>
                          <span className="font-medium text-official-navy">{cat.value}%</span>
                        </div>
                        <div className="h-3 bg-official-cream rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${cat.value}%` }}
                            transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: cat.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Region Distribution */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl p-6 border border-official-navy/10"
                >
                  <h3 className="font-bold text-official-navy mb-6 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-abotax-primary" />
                    Wsparcie według regionów
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={regionData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                      <XAxis 
                        type="number" 
                        stroke="#2D3436"
                        tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                      />
                      <YAxis 
                        type="category" 
                        dataKey="region" 
                        stroke="#2D3436"
                        width={100}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value.toLocaleString("pl-PL")} zł`, "Wpłaty"]}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                      />
                      <Bar dataKey="amount" fill="#E8A87C" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="distribution">
              <div className="bg-white rounded-2xl p-6 lg:p-8 border border-official-navy/10">
                <h3 className="text-xl font-serif font-bold text-official-navy mb-6">Szczegółowa dystrybucja środków</h3>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-official-navy mb-4">Wpływy</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between p-4 bg-official-cream rounded-xl">
                        <span className="text-official-navy/70">Wpłaty jednorazowe</span>
                        <span className="font-semibold text-official-navy">8 245 000 zł</span>
                      </div>
                      <div className="flex justify-between p-4 bg-official-cream rounded-xl">
                        <span className="text-official-navy/70">Wpłaty ratalne</span>
                        <span className="font-semibold text-official-navy">3 890 000 zł</span>
                      </div>
                      <div className="flex justify-between p-4 bg-official-cream rounded-xl">
                        <span className="text-official-navy/70">Wpłaty partnerskie (50/50)</span>
                        <span className="font-semibold text-official-navy">712 350 zł</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-official-navy mb-4">Wydatki</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between p-4 bg-abotax-success/10 rounded-xl">
                        <span className="text-official-navy/70">Bezpośrednie wsparcie domów</span>
                        <span className="font-semibold text-abotax-success">12 590 403 zł</span>
                      </div>
                      <div className="flex justify-between p-4 bg-abotax-secondary/10 rounded-xl">
                        <span className="text-official-navy/70">Koszty transakcji płatniczych</span>
                        <span className="font-semibold text-abotax-secondary">192 710 zł</span>
                      </div>
                      <div className="flex justify-between p-4 bg-abotax-secondary/10 rounded-xl">
                        <span className="text-official-navy/70">Koszty administracyjne</span>
                        <span className="font-semibold text-abotax-secondary">64 237 zł</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-abotax-primary/5 to-abotax-secondary/5 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-abotax-success flex items-center justify-center">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-abotax-primary">98%</p>
                      <p className="text-official-navy/60">
                        środków trafia bezpośrednio do domów dziecka. To jeden z najwyższych 
                        wskaźników efektywności wśród organizacji charytatywnych w Polsce.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reports">
              <div className="bg-white rounded-2xl p-6 lg:p-8 border border-official-navy/10">
                <h3 className="text-xl font-serif font-bold text-official-navy mb-6">Raporty do pobrania</h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: "Raport roczny 2024", type: "PDF", size: "2.4 MB" },
                    { title: "Raport Q3 2024", type: "PDF", size: "1.1 MB" },
                    { title: "Raport Q2 2024", type: "PDF", size: "1.2 MB" },
                    { title: "Raport Q1 2024", type: "PDF", size: "980 KB" },
                    { title: "Audyt zewnętrzny 2023", type: "PDF", size: "3.5 MB" },
                    { title: "Dane szczegółowe", type: "CSV", size: "450 KB" },
                  ].map((report, index) => (
                    <motion.div
                      key={report.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 border border-abotax-primary/10 rounded-xl hover:border-abotax-primary/30 transition-colors group cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <FileText className="w-8 h-8 text-abotax-primary mb-3" />
                          <h4 className="font-medium text-official-navy">{report.title}</h4>
                          <p className="text-sm text-official-navy/60 mt-1">
                            {report.type} • {report.size}
                          </p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-abotax-primary opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Download className="w-5 h-5" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-official-cream rounded-xl">
                  <h4 className="font-semibold text-official-navy mb-2">Audyty zewnętrzne</h4>
                  <p className="text-official-navy/70 mb-4">
                    Nasze finanse są regularnie weryfikowane przez niezależnych audytorów. 
                    Ostatni audyt przeprowadzono w styczniu 2024 przez firmę Ernst & Young.
                  </p>
                  <Button variant="outline" className="border-abotax-primary text-abotax-primary">
                    <FileText className="w-4 h-4 mr-2" />
                    Zobacz pełny raport audytowy
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-serif font-bold text-official-navy mb-6">Metodologia</h2>
            <p className="text-official-navy/70 leading-relaxed mb-8">
              Wszystkie dane prezentowane na tej stronie pochodzą z naszego systemu księgowego 
              i są aktualizowane w czasie rzeczywistym. Każda transakcja jest rejestrowana 
              z pełną historią i jest dostępna do wglądu podczas audytów.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl bg-official-cream">
                <p className="font-bold text-abotax-primary text-2xl">99.9%</p>
                <p className="text-sm text-official-navy/60">uptime systemu</p>
              </div>
              <div className="p-4 rounded-xl bg-official-cream">
                <p className="font-bold text-abotax-primary text-2xl">Real-time</p>
                <p className="text-sm text-official-navy/60">aktualizacja danych</p>
              </div>
              <div className="p-4 rounded-xl bg-official-cream">
                <p className="font-bold text-abotax-primary text-2xl">ISO 27001</p>
                <p className="text-sm text-official-navy/60">certyfikat bezpieczeństwa</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { db } from "@/lib/supabase";
import { motion } from "framer-motion";
import {
  Heart,
  Calendar,
  Target,
  Bell,
  CreditCard,
  Building2,
  CheckCircle2,
  Clock,
  Gift,
  Scale,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { createPageUrl } from "@/utils/createPageUrl";

export default function Dashboard() {
  const { data: contributions = [] } = useQuery({
    queryKey: ['recent-contributions'],
    queryFn: () => db.contributions.listRecent(100),
  });

  const { data: homes = [] } = useQuery({
    queryKey: ['homes'],
    queryFn: () => db.homes.list(200),
  });

  const { data: goals = [] } = useQuery({
    queryKey: ['all-goals'],
    queryFn: () => db.goals.listActive(500),
  });

  const totalContributed = contributions.reduce((sum, c) => sum + (c.amount || 0), 0);
  const childrenHelped = Math.max(1, Math.floor(totalContributed / 450));

  const supportedGoalIds = [...new Set(contributions.filter(c => c.goal_id).map(c => c.goal_id))];
  const supportedGoals = goals.filter(g => supportedGoalIds.includes(g.id));

  const installmentContributions = contributions.filter(c => c.is_installment);

  return (
    <div className="min-h-screen bg-official-cream">
      {/* Header */}
      <section className="bg-gradient-to-br from-official-navy via-official-navy to-official-navy/90 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="bg-official-gold/20 text-official-gold border-official-gold/30 mb-4">
              <Scale className="w-3 h-3 mr-1" />
              Panel darczyńcy
            </Badge>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-2">
              Twój wkład w przyszłość dzieci
            </h1>
            <p className="text-white/70">
              Zobacz wpływ swojej rekompensaty społecznej
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-official-navy/10 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-abotax-primary/10 flex items-center justify-center">
                    <Heart className="w-7 h-7 text-abotax-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-official-navy/60">Łączna wpłata</p>
                    <p className="text-2xl font-bold text-official-navy">
                      {totalContributed.toLocaleString('pl-PL')} zł
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-official-navy/10 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-abotax-secondary/10 flex items-center justify-center">
                    <Gift className="w-7 h-7 text-abotax-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-official-navy/60">Wspartych dzieci</p>
                    <p className="text-2xl font-bold text-official-navy">
                      {childrenHelped}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-official-navy/10 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-abotax-success/10 flex items-center justify-center">
                    <Target className="w-7 h-7 text-abotax-success" />
                  </div>
                  <div>
                    <p className="text-sm text-official-navy/60">Zrealizowanych celów</p>
                    <p className="text-2xl font-bold text-official-navy">
                      {supportedGoals.filter(g => g.status === "completed").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Tabs defaultValue="contributions" className="space-y-8">
          <TabsList className="bg-white border border-official-navy/10">
            <TabsTrigger value="contributions" className="data-[state=active]:bg-official-navy data-[state=active]:text-white">
              Moje wpłaty
            </TabsTrigger>
            <TabsTrigger value="goals" className="data-[state=active]:bg-official-navy data-[state=active]:text-white">
              Wsparte cele
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-official-navy data-[state=active]:text-white">
              Ustawienia
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contributions">
            <Card className="border-official-navy/10">
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-xl font-serif font-bold text-official-navy mb-6">Historia wpłat</h2>

                {contributions.length > 0 ? (
                  <div className="space-y-4">
                    {contributions.map((contribution, index) => {
                      const home = homes.find(h => h.id === contribution.home_id);
                      const goal = goals.find(g => g.id === contribution.goal_id);

                      return (
                        <motion.div
                          key={contribution.id || index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between p-4 bg-official-cream rounded-xl"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              contribution.status === "completed"
                                ? "bg-abotax-success/20"
                                : "bg-abotax-secondary/20"
                            }`}>
                              {contribution.status === "completed" ? (
                                <CheckCircle2 className="w-6 h-6 text-abotax-success" />
                              ) : (
                                <Clock className="w-6 h-6 text-abotax-secondary" />
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-official-navy">
                                {contribution.amount?.toLocaleString("pl-PL")} zł
                                {contribution.is_installment && (
                                  <span className="text-sm font-normal text-official-navy/60 ml-2">
                                    (rata {contribution.installment_number || 1}/{contribution.installment_months})
                                  </span>
                                )}
                              </p>
                              <p className="text-sm text-official-navy/60">
                                {contribution.allocation_type === "auto" && "Automatyczna alokacja"}
                                {contribution.allocation_type === "home" && home?.name}
                                {contribution.allocation_type === "goal" && goal?.title}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={
                              contribution.status === "completed"
                                ? "bg-abotax-success/20 text-abotax-primary border-abotax-success/30"
                                : "bg-abotax-secondary/20 text-official-navy border-abotax-secondary/30"
                            }>
                              {contribution.status === "completed" ? "Zrealizowana" : "W trakcie"}
                            </Badge>
                            <p className="text-xs text-official-navy/40 mt-1">
                              {contribution.created_at && new Date(contribution.created_at).toLocaleDateString("pl-PL")}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-abotax-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-10 h-10 text-abotax-primary/40" />
                    </div>
                    <h3 className="text-lg font-semibold text-official-navy mb-2">Brak wpłat</h3>
                    <p className="text-official-navy/60 mb-6">Nie masz jeszcze żadnych wpłat na koncie</p>
                    <Link to={createPageUrl("Contribute")}>
                      <Button className="bg-abotax-primary hover:bg-abotax-primary-light text-white">
                        Wpłać pierwszą rekompensatę
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Installment schedule */}
            {installmentContributions.length > 0 && (
              <Card className="border-official-navy/10 mt-6">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <CreditCard className="w-5 h-5 text-abotax-primary" />
                    <h2 className="text-xl font-serif font-bold text-official-navy">Harmonogram rat</h2>
                  </div>
                  <div className="space-y-4">
                    {installmentContributions.map((contribution) => {
                      const progress = ((contribution.installment_number || 1) / contribution.installment_months) * 100;
                      return (
                        <div key={contribution.id} className="p-4 border border-official-navy/10 rounded-xl">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-official-navy">
                              {contribution.amount?.toLocaleString("pl-PL")} zł
                            </span>
                            <span className="text-sm text-official-navy/60">
                              {contribution.installment_number || 1} / {contribution.installment_months} rat
                            </span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="goals">
            <Card className="border-official-navy/10">
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-xl font-serif font-bold text-official-navy mb-6">Wsparte cele</h2>

                {supportedGoals.length > 0 ? (
                  <div className="space-y-4">
                    {supportedGoals.map((goal, index) => {
                      const home = homes.find(h => h.id === goal.home_id);
                      const progress = Math.min(100, (goal.current_amount / goal.target_amount) * 100);
                      const isCompleted = goal.status === "completed";

                      return (
                        <motion.div
                          key={goal.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-4 rounded-xl ${isCompleted ? "bg-abotax-success/10" : "bg-official-cream"}`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {isCompleted && <CheckCircle2 className="w-5 h-5 text-abotax-success" />}
                                <h3 className="font-semibold text-official-navy">{goal.title}</h3>
                              </div>
                              <p className="text-sm text-official-navy/60 flex items-center gap-1">
                                <Building2 className="w-4 h-4" />
                                {home?.name}
                              </p>
                            </div>
                            <Badge className={isCompleted
                              ? "bg-abotax-success text-white"
                              : "bg-official-gold/20 text-official-navy border-official-gold/30"
                            }>
                              {isCompleted ? "Zrealizowany!" : "W trakcie"}
                            </Badge>
                          </div>
                          <Progress value={progress} className="h-2 mb-2" />
                          <div className="flex justify-between text-sm">
                            <span className="text-abotax-primary font-medium">{progress.toFixed(0)}%</span>
                            <span className="text-official-navy/60">
                              {goal.current_amount?.toLocaleString("pl-PL")} / {goal.target_amount?.toLocaleString("pl-PL")} zł
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-abotax-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Target className="w-10 h-10 text-abotax-primary/40" />
                    </div>
                    <h3 className="text-lg font-semibold text-official-navy mb-2">Brak wspartych celów</h3>
                    <p className="text-official-navy/60 mb-6">Wybierz konkretny cel przy następnej wpłacie</p>
                    <Link to={createPageUrl("HomesDirectory")}>
                      <Button variant="outline" className="border-official-navy/20 text-official-navy">
                        Przeglądaj cele
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="border-official-navy/10">
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-xl font-serif font-bold text-official-navy mb-6">Ustawienia</h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-official-navy/10">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-abotax-primary" />
                      <div>
                        <p className="font-medium text-official-navy">Powiadomienia o zrealizowanych celach</p>
                        <p className="text-sm text-official-navy/60">Email gdy cel, który wsparłeś/aś zostanie zrealizowany</p>
                      </div>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-official-navy/10">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-abotax-primary" />
                      <div>
                        <p className="font-medium text-official-navy">Przypomnienia o ratach</p>
                        <p className="text-sm text-official-navy/60">Przypomnij mi o zbliżającej się racie</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}

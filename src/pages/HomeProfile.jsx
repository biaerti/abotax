import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { db } from "@/lib/supabase";
import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  Calendar,
  Target,
  ArrowLeft,
  Heart,
  CheckCircle2,
  Clock,
  Building2,
  Scale
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createPageUrl } from "@/utils/createPageUrl";

export default function HomeProfile() {
  const { id: homeId } = useParams();

  const { data: home, isLoading: homeLoading } = useQuery({
    queryKey: ['home', homeId],
    queryFn: () => db.homes.getById(homeId),
    enabled: !!homeId,
  });

  const { data: goals = [] } = useQuery({
    queryKey: ['home-goals', homeId],
    queryFn: () => db.goals.listByHome(homeId),
    enabled: !!homeId,
  });

  const { data: updates = [] } = useQuery({
    queryKey: ['home-updates', homeId],
    queryFn: () => db.updates.listByHome(homeId),
    enabled: !!homeId,
  });

  const activeGoals = goals.filter(g => g.status === "active" || g.is_active);
  const completedGoals = goals.filter(g => g.status === "completed");

  const categoryColors = {
    elektronika: "bg-blue-100 text-blue-700",
    sport: "bg-green-100 text-green-700",
    edukacja: "bg-purple-100 text-purple-700",
    remont: "bg-orange-100 text-orange-700",
    wyposażenie: "bg-pink-100 text-pink-700",
    wyjazdy: "bg-cyan-100 text-cyan-700",
    inne: "bg-gray-100 text-gray-700",
  };

  if (homeLoading) {
    return (
      <div className="min-h-screen bg-official-cream flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-abotax-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!home) {
    return (
      <div className="min-h-screen bg-official-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-official-navy/10 flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-10 h-10 text-official-navy/40" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-official-navy mb-4">Nie znaleziono domu dziecka</h2>
          <Link to={createPageUrl("HomesDirectory")}>
            <Button className="bg-abotax-primary hover:bg-abotax-primary-light text-white">
              Wróć do listy
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-official-cream">
      {/* Hero */}
      <section className="relative h-64 lg:h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-official-navy via-official-navy to-official-navy/90" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-64 h-64 bg-official-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-abotax-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8">
            <Link to={createPageUrl("HomesDirectory")} className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Wróć do listy
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge className="bg-official-gold/20 text-official-gold border-official-gold/30 mb-3">
                <Scale className="w-3 h-3 mr-1" />
                Placówka pieczy zastępczej
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-2">{home.name}</h1>
              <div className="flex flex-wrap gap-4 text-white/80">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {home.city}{home.region && `, ${home.region}`}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {home.children_count} dzieci
                </span>
                {home.age_range_min && home.age_range_max && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Wiek: {home.age_range_min}-{home.age_range_max} lat
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Goals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-official-navy/10">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-serif font-bold text-official-navy flex items-center gap-2">
                      <Target className="w-5 h-5 text-official-gold" />
                      Aktualne cele
                    </h2>
                    <Badge className="bg-abotax-primary/10 text-abotax-primary border-abotax-primary/20">
                      {activeGoals.length} aktywnych
                    </Badge>
                  </div>

                  {activeGoals.length > 0 ? (
                    <div className="space-y-4">
                      {activeGoals.map((goal, index) => {
                        const progress = Math.min(100, (goal.current_amount / goal.target_amount) * 100);
                        return (
                          <motion.div
                            key={goal.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 bg-official-cream rounded-xl"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="font-semibold text-official-navy">{goal.title}</h3>
                                {goal.category && (
                                  <Badge className={`mt-1 ${categoryColors[goal.category] || categoryColors.inne}`}>
                                    {goal.category}
                                  </Badge>
                                )}
                              </div>
                              <Link to={createPageUrl(`Contribute?goal=${goal.id}`)}>
                                <Button size="sm" className="bg-abotax-primary hover:bg-abotax-primary-light text-white">
                                  <Heart className="w-4 h-4 mr-1" />
                                  Wspieraj
                                </Button>
                              </Link>
                            </div>
                            {goal.description && (
                              <p className="text-sm text-official-navy/60 mb-3">{goal.description}</p>
                            )}
                            <Progress value={progress} className="h-3 mb-2" />
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
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-abotax-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Target className="w-8 h-8 text-abotax-primary/40" />
                      </div>
                      <p className="text-official-navy/60">Brak aktywnych celów</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-official-navy/10">
                <CardContent className="p-6 lg:p-8">
                  <h2 className="text-xl font-serif font-bold text-official-navy mb-4">O nas</h2>
                  {home.description ? (
                    <p className="text-official-navy/70 leading-relaxed">{home.description}</p>
                  ) : (
                    <p className="text-official-navy/50 italic">Opis wkrótce...</p>
                  )}

                  {home.photo_urls?.length > 0 && (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                      {home.photo_urls.map((url, index) => (
                        <div key={index} className="aspect-video rounded-xl overflow-hidden bg-official-cream">
                          <img
                            src={url}
                            alt={`${home.name} - zdjęcie ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Impact History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-official-navy/10">
                <CardContent className="p-6 lg:p-8">
                  <Tabs defaultValue="completed">
                    <TabsList className="mb-6 bg-official-cream">
                      <TabsTrigger value="completed" className="data-[state=active]:bg-official-navy data-[state=active]:text-white">
                        Zrealizowane cele
                      </TabsTrigger>
                      <TabsTrigger value="updates" className="data-[state=active]:bg-official-navy data-[state=active]:text-white">
                        Aktualności
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="completed">
                      {completedGoals.length > 0 ? (
                        <div className="space-y-4">
                          {completedGoals.map((goal) => (
                            <div
                              key={goal.id}
                              className="flex items-start gap-4 p-4 bg-abotax-success/10 rounded-xl"
                            >
                              <div className="w-10 h-10 rounded-full bg-abotax-success flex items-center justify-center flex-shrink-0">
                                <CheckCircle2 className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-medium text-official-navy">{goal.title}</h4>
                                <p className="text-sm text-official-navy/60">
                                  Zebrano {goal.target_amount?.toLocaleString("pl-PL")} zł
                                </p>
                                {goal.completed_date && (
                                  <p className="text-xs text-official-navy/40 mt-1">
                                    Zrealizowano: {new Date(goal.completed_date).toLocaleDateString("pl-PL")}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-official-navy/60">Brak zrealizowanych celów</p>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="updates">
                      {updates.length > 0 ? (
                        <div className="space-y-4">
                          {updates.map((update) => (
                            <div
                              key={update.id}
                              className="p-4 border border-official-navy/10 rounded-xl"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <Clock className="w-4 h-4 text-official-navy/40" />
                                <span className="text-xs text-official-navy/40">
                                  {new Date(update.created_at).toLocaleDateString("pl-PL")}
                                </span>
                                {update.type && (
                                  <Badge variant="outline" className="text-xs border-official-navy/20">
                                    {update.type}
                                  </Badge>
                                )}
                              </div>
                              <h4 className="font-medium text-official-navy mb-1">{update.title}</h4>
                              <p className="text-sm text-official-navy/60">{update.content}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-official-navy/60">Brak aktualności</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-official-navy/10">
                <CardContent className="p-6">
                  <h3 className="font-serif font-bold text-official-navy mb-4">Informacje</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-official-navy/60">Dzieci</span>
                      <span className="font-semibold text-official-navy">{home.children_count || "-"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-official-navy/60">Personel</span>
                      <span className="font-semibold text-official-navy">{home.staff_count || "-"}</span>
                    </div>
                    {home.staff_count && home.children_count && (
                      <div className="flex justify-between items-center">
                        <span className="text-official-navy/60">Ratio opiekun/dziecko</span>
                        <span className="font-semibold text-official-navy">
                          1:{Math.round(home.children_count / home.staff_count)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-official-navy/60">Wiek podopiecznych</span>
                      <span className="font-semibold text-official-navy">
                        {home.age_range_min && home.age_range_max
                          ? `${home.age_range_min}-${home.age_range_max} lat`
                          : "-"
                        }
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-official-navy/10">
                      <span className="text-official-navy/60">Zebrane środki</span>
                      <span className="font-semibold text-abotax-primary">
                        {(home.total_received || 0).toLocaleString("pl-PL")} zł
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Support CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-official-navy via-official-navy to-official-navy/90 rounded-2xl p-6 text-white"
            >
              <h3 className="font-serif font-bold mb-2">Wspieraj {home.name}</h3>
              <p className="text-white/80 text-sm mb-4">
                Twoja wpłata trafi bezpośrednio do tego domu dziecka.
              </p>
              <Link to={createPageUrl(`Contribute?home=${home.id}`)}>
                <Button className="w-full bg-white text-official-navy hover:bg-white/90">
                  <Heart className="w-4 h-4 mr-2" />
                  Wpłać rekompensatę
                </Button>
              </Link>
            </motion.div>

            {/* Contact */}
            {(home.contact_email || home.contact_phone) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-official-navy/10">
                  <CardContent className="p-6">
                    <h3 className="font-serif font-bold text-official-navy mb-4">Kontakt</h3>
                    {home.contact_email && (
                      <p className="text-sm text-official-navy/70 mb-2">
                        Email: <a href={`mailto:${home.contact_email}`} className="text-abotax-primary hover:underline">{home.contact_email}</a>
                      </p>
                    )}
                    {home.contact_phone && (
                      <p className="text-sm text-official-navy/70">
                        Tel: <a href={`tel:${home.contact_phone}`} className="text-abotax-primary hover:underline">{home.contact_phone}</a>
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

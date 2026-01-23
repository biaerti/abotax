import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { db } from "@/lib/supabase";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Search, MapPin, List, Grid3X3, Filter, QrCode, Info, Heart, Building2, Users, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import HomeCard from "@/components/home/HomeCard";
import { createPageUrl } from "@/utils/createPageUrl";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const REGIONS = [
  "dolnośląskie", "kujawsko-pomorskie", "lubelskie", "lubuskie", 
  "łódzkie", "małopolskie", "mazowieckie", "opolskie", 
  "podkarpackie", "podlaskie", "pomorskie", "śląskie", 
  "świętokrzyskie", "warmińsko-mazurskie", "wielkopolskie", "zachodniopomorskie"
];

export default function HomesDirectory() {
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const { data: homes = [], isLoading } = useQuery({
    queryKey: ['homes'],
    queryFn: () => db.homes.list(100),
  });

  const { data: goals = [] } = useQuery({
    queryKey: ['all-goals'],
    queryFn: () => db.goals.listActive(500),
  });

  const filteredHomes = useMemo(() => {
    let result = [...homes];
    
    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(home => 
        home.name?.toLowerCase().includes(searchLower) ||
        home.city?.toLowerCase().includes(searchLower)
      );
    }
    
    // Region filter
    if (regionFilter !== "all") {
      result = result.filter(home => home.region === regionFilter);
    }
    
    // Sort
    result.sort((a, b) => {
      if (sortBy === "name") return (a.name || "").localeCompare(b.name || "");
      if (sortBy === "children") return (b.children_count || 0) - (a.children_count || 0);
      if (sortBy === "funding") {
        const aGoals = goals.filter(g => g.home_id === a.id && g.status === "active");
        const bGoals = goals.filter(g => g.home_id === b.id && g.status === "active");
        const aProgress = aGoals.length > 0 
          ? (aGoals[0].current_amount / aGoals[0].target_amount) 
          : 1;
        const bProgress = bGoals.length > 0 
          ? (bGoals[0].current_amount / bGoals[0].target_amount) 
          : 1;
        return aProgress - bProgress; // Show most needed first
      }
      return 0;
    });
    
    return result;
  }, [homes, search, regionFilter, sortBy, goals]);

  // Map center - Poland
  const mapCenter = [52.0, 19.0];

  return (
    <div className="min-h-screen bg-official-cream">
      {/* Header */}
      <section className="bg-gradient-to-br from-official-navy via-official-navy to-official-navy/90 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <Badge className="bg-official-gold/20 text-official-gold border-official-gold/30 mb-4">
              <Building2 className="w-3 h-3 mr-1" />
              Przykładowe placówki
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
              Domy dziecka w Polsce
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Poznaj miejsca, które mogą otrzymać wsparcie z Funduszu. Zobacz ich cele i potrzeby.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Explanation Banner */}
      <section className="bg-white border-b border-official-navy/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-r from-abotax-primary/5 to-abotax-secondary/5 rounded-2xl p-6 border border-abotax-primary/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <QrCode className="w-5 h-5 text-abotax-primary" />
                  <h3 className="font-bold text-official-navy">Jak działa wybór domu dziecka?</h3>
                </div>
                <p className="text-official-navy/70 text-sm leading-relaxed mb-4">
                  Każda pacjentka otrzymuje <strong>Token Solidarnościowy</strong> — anonimowy kod QR,
                  który pozwala przeznaczyć <strong>do 50% opłaty AboTax</strong> na wybrany dom dziecka.
                  Pozostałe środki są rozdzielane według potrzeb.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-xs bg-white px-3 py-1.5 rounded-full">
                    <Heart className="w-3 h-3 text-abotax-primary" />
                    <span className="text-official-navy/70">Redukcja poczucia winy</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs bg-white px-3 py-1.5 rounded-full">
                    <Users className="w-3 h-3 text-abotax-primary" />
                    <span className="text-official-navy/70">Widzisz gdzie idą pieniądze</span>
                  </div>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-800 text-sm mb-1">To są przykładowe placówki</h4>
                    <p className="text-xs text-amber-700">
                      Pokazujemy jak będzie wyglądał system gdy ustawa wejdzie w życie.
                      Dane są demonstracyjne. Rzeczywiste placówki będą dodawane po uruchomieniu Funduszu.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-40 bg-white border-b border-official-navy/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-official-navy/40" />
                <Input
                  placeholder="Szukaj po nazwie lub mieście..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 border-abotax-primary/20 focus:border-abotax-primary rounded-xl"
                />
              </div>

              {/* Region filter */}
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="w-full sm:w-48 border-abotax-primary/20 rounded-xl">
                  <Filter className="w-4 h-4 mr-2 text-official-navy/40" />
                  <SelectValue placeholder="Województwo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie regiony</SelectItem>
                  {REGIONS.map(region => (
                    <SelectItem key={region} value={region}>
                      {region.charAt(0).toUpperCase() + region.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48 border-abotax-primary/20 rounded-xl">
                  <SelectValue placeholder="Sortuj" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Alfabetycznie</SelectItem>
                  <SelectItem value="children">Liczba dzieci</SelectItem>
                  <SelectItem value="funding">Najbardziej potrzebujące</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View toggle */}
            <Tabs value={view} onValueChange={setView} className="w-full sm:w-auto">
              <TabsList className="bg-abotax-primary/5">
                <TabsTrigger value="grid" className="data-[state=active]:bg-abotax-primary data-[state=active]:text-white">
                  <Grid3X3 className="w-4 h-4 mr-2" />
                  Siatka
                </TabsTrigger>
                <TabsTrigger value="list" className="data-[state=active]:bg-abotax-primary data-[state=active]:text-white">
                  <List className="w-4 h-4 mr-2" />
                  Lista
                </TabsTrigger>
                <TabsTrigger value="map" className="data-[state=active]:bg-abotax-primary data-[state=active]:text-white">
                  <MapPin className="w-4 h-4 mr-2" />
                  Mapa
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results count */}
          <p className="text-sm text-official-navy/60 mb-6">
            Znaleziono <span className="font-semibold text-abotax-primary">{filteredHomes.length}</span> domów dziecka
          </p>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : view === "map" ? (
            <div className="h-[600px] rounded-2xl overflow-hidden border border-abotax-primary/10">
              <MapContainer 
                center={mapCenter} 
                zoom={6} 
                className="h-full w-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                {filteredHomes.filter(h => h.latitude && h.longitude).map(home => (
                  <Marker 
                    key={home.id} 
                    position={[home.latitude, home.longitude]}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold text-abotax-primary">{home.name}</h3>
                        <p className="text-sm text-official-navy/60">{home.city}</p>
                        <p className="text-sm mt-1">{home.children_count} dzieci</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          ) : view === "list" ? (
            <div className="space-y-4">
              {filteredHomes.map((home, index) => (
                <motion.div
                  key={home.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <HomeCard 
                    home={home} 
                    goals={goals.filter(g => g.home_id === home.id)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHomes.map((home, index) => (
                <HomeCard 
                  key={home.id}
                  home={home} 
                  goals={goals.filter(g => g.home_id === home.id)}
                  index={index}
                />
              ))}
            </div>
          )}

          {filteredHomes.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-abotax-primary/10 flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-abotax-primary/40" />
              </div>
              <h3 className="text-xl font-semibold text-official-navy mb-2">
                Brak wyników
              </h3>
              <p className="text-official-navy/60">
                Spróbuj zmienić filtry lub wyszukiwaną frazę
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
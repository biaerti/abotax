import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { MapPin, Users, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function HomeCard({ home, goals = [], index = 0 }) {
  const activeGoal = goals.find(g => g.status === "active");
  const progress = activeGoal 
    ? Math.min(100, (activeGoal.current_amount / activeGoal.target_amount) * 100)
    : 0;

  const illustrations = [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden card-hover border border-[#1A5F5A]/5"
    >
      {/* Abstract illustration header */}
      <div className="h-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A5F5A]/20 to-[#E8A87C]/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1A5F5A]/30 to-[#E8A87C]/30 animate-float" />
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-[#E8A87C]/40 to-[#1A5F5A]/40 -translate-x-8 translate-y-8" 
               style={{ animationDelay: "1s" }} />
        </div>
        {home.photo_urls?.[0] && (
          <img 
            src={home.photo_urls[0]} 
            alt={home.name}
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-lg text-[#2D3436] mb-1">{home.name}</h3>
            <div className="flex items-center gap-1 text-sm text-[#2D3436]/60">
              <MapPin className="w-4 h-4" />
              {home.city}, {home.region}
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-[#1A5F5A] bg-[#1A5F5A]/10 px-2 py-1 rounded-lg">
            <Users className="w-4 h-4" />
            {home.children_count}
          </div>
        </div>

        {activeGoal && (
          <div className="mt-4 p-4 bg-[#FDF6E3] rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-[#E8A87C]" />
              <span className="text-sm font-medium text-[#2D3436]">{activeGoal.title}</span>
            </div>
            <Progress value={progress} className="h-2 mb-2" />
            <div className="flex justify-between text-xs text-[#2D3436]/60">
              <span>{progress.toFixed(0)}% zebrane</span>
              <span>{(activeGoal.target_amount - activeGoal.current_amount).toLocaleString("pl-PL")} zł do celu</span>
            </div>
          </div>
        )}

        <Link to={createPageUrl(`HomeProfile?id=${home.id}`)}>
          <Button 
            variant="ghost" 
            className="w-full mt-4 text-[#1A5F5A] hover:bg-[#1A5F5A]/10 group"
          >
            Zobacz więcej
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
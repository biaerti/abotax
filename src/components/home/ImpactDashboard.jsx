import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, Building2, TrendingUp } from "lucide-react";
import ImpactCounter from "@/components/ui/ImpactCounter";

export default function ImpactDashboard({ stats }) {
  const items = [
    {
      icon: Heart,
      label: "Zebrane środki",
      value: stats?.totalCollected || 12847350,
      suffix: " zł",
      color: "#1A5F5A"
    },
    {
      icon: Users,
      label: "Wspartych dzieci",
      value: stats?.childrenHelped || 2847,
      suffix: "",
      color: "#E8A87C"
    },
    {
      icon: Building2,
      label: "Domów dziecka",
      value: stats?.homesCount || 127,
      suffix: "",
      color: "#95B89C"
    },
    {
      icon: TrendingUp,
      label: "Śr. miesięczne wsparcie",
      value: stats?.avgMonthlySupport || 4250,
      suffix: " zł",
      color: "#1A5F5A"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-2xl p-6 border border-[#1A5F5A]/5 card-hover"
        >
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            style={{ backgroundColor: `${item.color}15` }}
          >
            <item.icon className="w-6 h-6" style={{ color: item.color }} />
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-[#2D3436]">
            <ImpactCounter 
              value={item.value} 
              suffix={item.suffix}
              duration={2000 + index * 300}
            />
          </div>
          <p className="text-sm text-[#2D3436]/60 mt-1">{item.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
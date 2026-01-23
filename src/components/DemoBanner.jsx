import React from "react";
import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";

export default function DemoBanner({ onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  return (
    <div className="bg-amber-100 border-l-4 border-amber-500 p-4 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <div>
            <p className="text-amber-800 font-medium">
              Wersja demonstracyjna
            </p>
            <p className="text-amber-700 text-sm">
              Prezentowane dane są przykładowe i służą tylko do pokazania funkcjonalności systemu.
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={handleClose}
            className="p-1 hover:bg-amber-200 rounded-lg transition-colors"
            aria-label="Zamknij"
          >
            <X className="w-4 h-4 text-amber-600" />
          </button>
        )}
      </div>
    </div>
  );
}

// Mniejsza wersja - badge
export function DemoBadge({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full border border-amber-200 ${className}`}>
      <AlertTriangle className="w-3 h-3" />
      Demo
    </span>
  );
}

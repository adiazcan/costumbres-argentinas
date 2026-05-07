import { AlertTriangle } from "lucide-react";

export default function NoticeBar() {
  return (
    <div className="bg-[#1B3A6B] text-white py-3">
      <div className="container mx-auto px-4 flex items-center justify-center gap-3">
        <AlertTriangle size={18} className="text-[#F4A261] flex-shrink-0" />
        <p className="text-sm md:text-base font-bold text-center">
          MARTES CERRADO{" "}
          <span className="font-normal opacity-80">
            — Excepto festivos y vísperas de festivos
          </span>
        </p>
      </div>
    </div>
  );
}

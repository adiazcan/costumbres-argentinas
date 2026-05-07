import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

const categoryIcons: Record<string, string> = {
  "Empanadas": "🥟",
  "Pastas": "🍝",
  "Pizzas": "🍕",
  "Bebidas": "🥤",
  "Postres y Café": "🍮",
};

export default function MenuSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { data: menuData, isLoading } = trpc.menu.fullMenu.useQuery();

  // Filter only active categories and items
  const activeMenu = useMemo(() => {
    if (!menuData) return [];
    return menuData
      .filter((cat) => cat.isActive)
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => item.isActive),
      }));
  }, [menuData]);

  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  // Set default active category once data loads
  const effectiveCategory = activeCategory ?? activeMenu[0]?.id ?? null;

  const currentCategory = activeMenu.find((c) => c.id === effectiveCategory);

  return (
    <section id="menu" className="py-20 lg:py-28 relative" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-[#FFF8F0]" />
      
      {/* Wave top */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
          <path d="M0,0 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" fill="#A8D4F0" fillOpacity="0.3" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#A8D4F0] font-bold uppercase tracking-widest text-sm mb-2">
            Nuestra Carta
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#1B3A6B]">
            Menú
          </h2>
          <div className="w-20 h-1 bg-[#E63946] mx-auto mt-4 rounded-full" />
          <p className="text-[#1B3A6B]/70 mt-4 max-w-lg mx-auto">
            Pizza tamaño mediano de 6 porciones. Opción elección mitad y mitad. 
            También ofrecemos pizzas sin gluten, veganas y sin lactosa.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin w-8 h-8 text-[#1B3A6B]" />
          </div>
        ) : (
          <>
            {/* Category Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12"
            >
              {activeMenu.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 md:px-6 py-2.5 rounded-full font-bold text-sm md:text-base transition-all duration-300 ${
                    effectiveCategory === category.id
                      ? "bg-[#1B3A6B] text-white shadow-lg scale-105"
                      : "bg-white text-[#1B3A6B] hover:bg-[#1B3A6B]/10 shadow-sm"
                  }`}
                >
                  <span className="mr-1.5">{categoryIcons[category.name] || "📋"}</span>
                  {category.name}
                </button>
              ))}
            </motion.div>

            {/* Menu Items Grid */}
            {currentCategory && (
              <motion.div
                key={effectiveCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {currentCategory.items.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border hover:border-[#A8D4F0]/50 group ${
                      item.isHighlighted
                        ? "border-[#F4A261] ring-1 ring-[#F4A261]/30"
                        : "border-[#A8D4F0]/20"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-[#1B3A6B] group-hover:text-[#E63946] transition-colors">
                          {item.isHighlighted && <span className="text-[#F4A261] mr-1">★</span>}
                          {item.name}
                        </h4>
                        {item.description && (
                          <p className="text-sm text-[#1B3A6B]/60 mt-1 leading-snug">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <span className="text-[#E63946] font-black text-lg whitespace-nowrap">
                        {item.price} €
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

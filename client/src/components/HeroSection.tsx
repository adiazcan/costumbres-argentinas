import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663054429692/esqaQbP7xMqVwuqZD2aLsY/hero-pizza-horno-f4DwRDPkSCM9PfWoWknETz.webp"
          alt="Pizza argentina en horno de leña"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B3A6B]/85 via-[#1B3A6B]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A6B]/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-20">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#A8D4F0] font-bold uppercase tracking-widest text-sm mb-4"
          >
            Pizzería
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Costumbres<br />
            <span className="text-[#A8D4F0]">Argentinas</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-white/90 font-semibold italic mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Sabés lo que comés
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/80 text-lg mb-10 max-w-lg leading-relaxed"
          >
            Desde 2005 elaboramos cada día de manera artesanal las mejores pizzas, 
            empanadas y pastas frescas en Ejea de los Caballeros.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#menu"
              className="bg-[#E63946] hover:bg-[#c62d3a] text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Ver nuestro menú
            </a>
            <a
              href="#ubicacion"
              className="border-2 border-white/60 hover:border-white text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:bg-white/10"
            >
              Contáctanos
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="text-white/70" size={32} />
        </motion.div>
      </motion.div>

      {/* Wave SVG separator - ondas celestes y blancas (bandera argentina) */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          {/* Onda celeste de fondo */}
          <path
            d="M0,60 C240,110 480,10 720,60 C960,110 1200,10 1440,60 L1440,150 L0,150 Z"
            fill="#A8D4F0"
            fillOpacity="0.6"
          />
          {/* Onda blanca intermedia */}
          <path
            d="M0,75 C300,120 600,30 900,75 C1100,100 1300,40 1440,70 L1440,150 L0,150 Z"
            fill="#FFFFFF"
            fillOpacity="0.7"
          />
          {/* Onda celeste clara */}
          <path
            d="M0,90 C200,120 500,60 750,90 C1000,120 1250,60 1440,85 L1440,150 L0,150 Z"
            fill="#A8D4F0"
            fillOpacity="0.35"
          />
          {/* Onda crema final (transición al fondo) */}
          <path
            d="M0,110 C360,140 720,100 1080,120 C1260,130 1380,110 1440,115 L1440,150 L0,150 Z"
            fill="#FFF8F0"
          />
        </svg>
        {/* Estrella decorativa dorada */}
        <div className="absolute right-12 top-2">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path d="M16 2L18.5 13.5L30 16L18.5 18.5L16 30L13.5 18.5L2 16L13.5 13.5L16 2Z" fill="#F4A261"/>
          </svg>
        </div>
      </div>
    </section>
  );
}

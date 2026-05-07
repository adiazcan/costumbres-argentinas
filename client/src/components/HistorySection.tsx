import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function HistorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="historia" className="py-20 lg:py-28 bg-[#FFF8F0]" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#A8D4F0] font-bold uppercase tracking-widest text-sm mb-2">
            Nuestra Historia
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#1B3A6B]">
            Pasión por la Pizza
          </h2>
          <div className="w-20 h-1 bg-[#E63946] mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-lg text-[#1B3A6B]/80 leading-relaxed mb-6">
              Desde 2005 elaboramos cada día de manera artesanal las mejores pizzas, 
              empanadas, pastas frescas y especialidades para que las disfrutes en 
              nuestro local o en tu casa.
            </p>
            <p className="text-lg text-[#1B3A6B]/80 leading-relaxed mb-8">
              Nuestra masa se prepara diariamente con ingredientes seleccionados y 
              fermenta naturalmente para lograr ese sabor único que nos caracteriza. 
              Cada pizza es una obra de arte que combina la tradición argentina con 
              los mejores productos locales.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="tel:976663344"
                className="bg-[#1B3A6B] hover:bg-[#142d54] text-white px-6 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Pedir para llevar
              </a>
              <a
                href="#ubicacion"
                className="border-2 border-[#1B3A6B] text-[#1B3A6B] px-6 py-3 rounded-full font-bold transition-all duration-300 hover:bg-[#1B3A6B] hover:text-white"
              >
                Comer en el local
              </a>
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <img
                src="/manus-storage/Bolasdemasalistasparafermentar_edf1d274.png"
                alt="Bolas de masa fermentando"
                className="w-full h-48 object-cover rounded-2xl shadow-lg"
              />
              <img
                src="/manus-storage/Pizzashorneándoseenhornoindustrial_b40deb89.png"
                alt="Pizzas horneándose"
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img
                src="/manus-storage/Prepizzapreparada_688f196a.png"
                alt="Prepizza preparada"
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />
              <img
                src="/manus-storage/Bollospizza_e288ce0f.png"
                alt="Bollos de pizza"
                className="w-full h-48 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

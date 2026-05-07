import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";

export default function LocationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ubicacion" className="py-20 lg:py-28 bg-[#FFF8F0]" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[#A8D4F0] font-bold uppercase tracking-widest text-sm mb-2">
            Ubicación & Horarios
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#1B3A6B]">
            ¡Descubre un sabor inolvidable!
          </h2>
          <div className="w-20 h-1 bg-[#E63946] mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Address Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#A8D4F0]/20 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1B3A6B] rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1B3A6B] text-lg mb-1">Dirección</h3>
                  <p className="text-[#1B3A6B]/70">Calle Toril 2</p>
                  <p className="text-[#1B3A6B]/70">50600, Ejea de los Caballeros</p>
                  <p className="text-[#1B3A6B]/70">Zaragoza, Aragón</p>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#A8D4F0]/20 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#E63946] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="text-white" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1B3A6B] text-lg mb-1">Horarios de atención</h3>
                  <p className="text-[#1B3A6B]/70">Lunes – Domingo</p>
                  <p className="text-[#1B3A6B]/70 font-semibold">desde las 20:00 hasta las 23:00</p>
                  <p className="text-[#E63946] font-bold mt-2 text-sm">
                    Martes cerrado (excepto festivos y vísperas)
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#A8D4F0]/20 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F4A261] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="text-white" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1B3A6B] text-lg mb-1">Teléfono</h3>
                  <a href="tel:976663344" className="text-[#1B3A6B] font-bold text-xl hover:text-[#E63946] transition-colors">
                    976 66 33 44
                  </a>
                  <p className="text-[#1B3A6B]/60 text-sm mt-1">Pedidos y reservas</p>
                </div>
              </div>
            </div>

            {/* Directions Button */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Calle+Toril+2+Ejea+de+los+Caballeros"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#1B3A6B] hover:bg-[#142d54] text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-[1.02] shadow-lg w-full"
            >
              <Navigation size={18} />
              Cómo llegar
            </a>
          </motion.div>

          {/* Map / Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="/manus-storage/PizzeríaCostumbresArgentinasencalleempedrada_e68b4278.png"
                alt="Pizzería Costumbres Argentinas - Exterior"
                className="w-full h-64 object-cover"
              />
              <div className="bg-white p-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2960.5!2d-1.1373!3d42.1267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDA3JzM2LjEiTiAxwrAwOCcxNC4zIlc!5e0!3m2!1ses!2ses!4v1"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Pizzería Costumbres Argentinas"
                  className="rounded-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

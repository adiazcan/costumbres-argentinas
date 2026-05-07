import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { PartyPopper, Gift, Users } from "lucide-react";

export default function EventsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="eventos" className="py-20 lg:py-28 relative overflow-hidden" ref={ref}>
      {/* Background with image */}
      <div className="absolute inset-0">
        <img
          src="/manus-storage/Celebracióndecostumbresargentinas_e18fbbce.png"
          alt="Celebración en Costumbres Argentinas"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1B3A6B]/80" />
      </div>

      {/* Wave top */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
          <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,30 L1440,0 L0,0 Z" fill="#FFF8F0" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#A8D4F0] font-bold uppercase tracking-widest text-sm mb-2">
              Eventos privados
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              ¿Qué tal una<br />
              <span className="text-[#F4A261]">Pizza Party?</span>
            </h2>
            <p className="text-white/85 text-lg leading-relaxed mb-8">
              Un cumpleaños, un festejo con familia o una reunión con amigos en la peña 
              puede ser una excelente ocasión para disfrutar de una rica pizza. 
              Además, el día de tu cumpleaños te esperamos en nuestro local para 
              celebrarlo y te regalamos una pizza.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-14 h-14 bg-[#A8D4F0]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <PartyPopper className="text-[#A8D4F0]" size={24} />
                </div>
                <p className="text-white font-bold text-sm">Cumpleaños</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-[#F4A261]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="text-[#F4A261]" size={24} />
                </div>
                <p className="text-white font-bold text-sm">Reuniones</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-[#E63946]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Gift className="text-[#E63946]" size={24} />
                </div>
                <p className="text-white font-bold text-sm">Pizza gratis</p>
              </div>
            </div>

            <a
              href="tel:976663344"
              className="inline-block bg-[#E63946] hover:bg-[#c62d3a] text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
            >
              Reservar evento
            </a>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663054429692/esqaQbP7xMqVwuqZD2aLsY/empanadas-hero-8SWgXSgdw9UPH9x8gzzniF.webp"
                alt="Empanadas argentinas"
                className="w-full rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#F4A261] text-white p-6 rounded-2xl shadow-xl">
                <p className="text-3xl font-black">20+</p>
                <p className="text-sm font-bold">Años de experiencia</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
          <path d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="#FFF8F0" />
        </svg>
      </div>
    </section>
  );
}

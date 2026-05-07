import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const galleryImages = [
  {
    src: "/manus-storage/Amasadoenmezcladoraindustrial_be3d940b.png",
    alt: "Amasado en mezcladora industrial",
    label: "Amasado",
  },
  {
    src: "/manus-storage/Tríosdebandejasconmasadescansando_d489212e.png",
    alt: "Bandejas con masa descansando",
    label: "Fermentación",
  },
  {
    src: "/manus-storage/Empanadaslistasparahornear_98f58e08.png",
    alt: "Empanadas listas para hornear",
    label: "Preparación",
  },
  {
    src: "/manus-storage/Pizzashorneándoseenhornoindustrial_b40deb89.png",
    alt: "Pizzas horneándose",
    label: "Horneado",
  },
  {
    src: "/manus-storage/Motocicletasderepartoenlacalle_a664c26a.png",
    alt: "Motos de reparto",
    label: "Delivery",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663054429692/esqaQbP7xMqVwuqZD2aLsY/pizza-close-up-DpCLBTCPKUvTmjEzE4LG8R.webp",
    alt: "Pizza lista para servir",
    label: "A tu mesa",
  },
];

export default function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 lg:py-28 bg-[#FFF8F0]" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[#A8D4F0] font-bold uppercase tracking-widest text-sm mb-2">
            Nuestro Proceso
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#1B3A6B]">
            De la masa a tu mesa
          </h2>
          <div className="w-20 h-1 bg-[#E63946] mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg aspect-square"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A6B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-bold text-lg">{image.label}</p>
              </div>
              {/* Step number */}
              <div className="absolute top-3 left-3 w-8 h-8 bg-[#E63946] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{index + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

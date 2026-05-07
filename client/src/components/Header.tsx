import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#historia", label: "Nuestra Historia" },
    { href: "#menu", label: "Menú" },
    { href: "#eventos", label: "Eventos" },
    { href: "#ubicacion", label: "Ubicación" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3">
            <img
              src="/manus-storage/Logocostumbres(Opcion1)_31a77d93.png"
              alt="Costumbres Argentinas"
              className={`h-16 lg:h-20 w-auto transition-all duration-300 ${
                isScrolled ? "" : "brightness-0 invert"
              }`}
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-bold uppercase tracking-wide transition-colors duration-200 ${
                  isScrolled
                    ? "text-[#1B3A6B] hover:text-[#E63946]"
                    : "text-white hover:text-[#A8D4F0]"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:976663344"
              className="flex items-center gap-2 bg-[#E63946] hover:bg-[#c62d3a] text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <Phone size={16} />
              976 66 33 44
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg ${
              isScrolled ? "text-[#1B3A6B]" : "text-white"
            }`}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-md border-t border-gray-100 shadow-xl">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#1B3A6B] font-bold text-lg py-2 border-b border-gray-100 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:976663344"
              className="flex items-center justify-center gap-2 bg-[#E63946] text-white px-5 py-3 rounded-full font-bold text-base mt-2"
            >
              <Phone size={18} />
              976 66 33 44
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

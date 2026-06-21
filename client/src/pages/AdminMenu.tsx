import { Button } from "@/components/ui/button";
import { buildStaticFullMenu } from "@shared/staticMenu";
import { ArrowLeft, ChefHat, FilePenLine } from "lucide-react";
import { useMemo } from "react";
import { Link } from "wouter";

export default function AdminMenu() {
  const menu = useMemo(() => buildStaticFullMenu(), []);

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <header className="bg-[#1B3A6B] text-white py-4 px-6 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al sitio
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <ChefHat className="w-6 h-6" />
              <h1 className="text-xl font-bold">Edición del Menú</h1>
            </div>
          </div>
          <span className="text-sm opacity-75">Sitio estático</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <section className="bg-white rounded-2xl shadow-sm border border-[#A8D4F0]/20 p-8">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#E63946]/10 text-[#E63946] flex items-center justify-center flex-shrink-0">
              <FilePenLine className="w-7 h-7" />
            </div>
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-black text-[#1B3A6B]">Cómo editar el menú sin servidor</h2>
                <p className="text-[#1B3A6B]/70 mt-2">
                  El menú se renderiza directamente desde{" "}
                  <code className="font-mono text-sm">seed-menu.mjs</code>. No hay base de datos,
                  auth ni API: cambiás ese archivo y el sitio queda actualizado.
                </p>
              </div>
              <ol className="list-decimal pl-5 text-[#1B3A6B]/80 space-y-2">
                <li>Editá <code className="font-mono text-sm">categories</code> para renombrar, ordenar o describir secciones.</li>
                <li>Editá <code className="font-mono text-sm">items</code> para añadir, quitar o actualizar platos y precios.</li>
                <li>Ejecutá <code className="font-mono text-sm">pnpm build</code> para exportar el HTML estático final.</li>
              </ol>
              <Link href="/">
                <Button className="bg-[#1B3A6B] hover:bg-[#142d54] text-white">
                  Ver la portada
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {menu.map((category) => (
            <article
              key={category.id}
              className="bg-white rounded-2xl shadow-sm border border-[#A8D4F0]/20 p-6"
            >
              <div className="mb-4">
                <h3 className="text-xl font-black text-[#1B3A6B]">{category.name}</h3>
                {category.description && (
                  <p className="text-sm text-[#1B3A6B]/70 mt-1">{category.description}</p>
                )}
              </div>
              <div className="space-y-3">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-4 border-b border-[#A8D4F0]/15 pb-3 last:border-b-0 last:pb-0"
                  >
                    <div>
                      <p className="font-bold text-[#1B3A6B]">{item.name}</p>
                      {item.description && (
                        <p className="text-sm text-[#1B3A6B]/60">{item.description}</p>
                      )}
                    </div>
                    <p className="font-black text-[#E63946] whitespace-nowrap">{item.price} €</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

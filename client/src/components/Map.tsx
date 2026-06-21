import { cn } from "@/lib/utils";

interface MapViewProps {
  className?: string;
  title?: string;
  embedUrl?: string;
}

export function MapView({
  className,
  title = "Mapa",
  embedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2960.5!2d-1.1373!3d42.1267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDA3JzM2LjEiTiAxwrAwOCcxNC4zIlc!5e0!3m2!1ses!2ses!4v1",
}: MapViewProps) {
  return (
    <iframe
      src={embedUrl}
      title={title}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={cn("w-full h-[500px] border-0 rounded-lg", className)}
    />
  );
}

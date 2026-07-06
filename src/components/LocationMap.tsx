import { MapPin } from "lucide-react";

const ADDRESS = "Avenida Ulisses Guimarães, 3201, Iparana, Caucaia - CE";
const MAPS_QUERY = encodeURIComponent(ADDRESS);
const EMBED_SRC = `https://maps.google.com/maps?q=${MAPS_QUERY}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

export default function LocationMap() {
  return (
    <section className="flex min-h-dvh flex-col justify-center bg-areia px-5 py-16 pb-20 sm:py-24 sm:pb-[100px]">
      <h2 className="m-0 mb-3 text-center font-display text-[clamp(1.8rem,6vw,2.4rem)] font-bold text-mar italic">
        Como chegar
      </h2>
      <p className="mx-auto mb-9 max-w-[380px] text-center text-[15.5px] leading-[1.5] text-mar/80">
        A casa fica na Avenida Ulisses Guimarães, 3201, em Iparana.
      </p>

      <div className="mx-auto w-full max-w-[460px] overflow-hidden rounded-[20px] bg-branco shadow-[0_20px_50px_-20px_rgba(26,79,110,0.35)]">
        <iframe
          title="Localização da Casa de Praia Iparana"
          src={EMBED_SRC}
          width="100%"
          height="320"
          style={{ border: 0, display: "block" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <a
          href={MAPS_LINK}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2.5 px-[22px] py-4 text-[14.5px] font-bold text-mar transition-colors hover:text-turquesa sm:px-11"
        >
          <MapPin size={18} className="shrink-0 text-coral" />
          {ADDRESS}
        </a>
      </div>
    </section>
  );
}

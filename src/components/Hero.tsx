import { ArrowDown } from "lucide-react";

const DOT_LAYERS = [
  "radial-gradient(circle at 15% 20%, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.08) 2px, transparent 3px)",
  "radial-gradient(circle at 65% 55%, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 2px, transparent 3px)",
  "radial-gradient(circle at 35% 80%, rgba(255,255,255,0.07) 0, rgba(255,255,255,0.07) 2px, transparent 3px)",
  "radial-gradient(circle at 85% 30%, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 2px, transparent 3px)",
  "radial-gradient(circle at 50% 10%, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 2px, transparent 3px)",
  "linear-gradient(135deg, var(--color-mar) 0%, var(--color-turquesa) 100%)",
].join(", ");

export default function Hero() {
  return (
    <section
      className="relative flex min-h-dvh items-center justify-center overflow-hidden snap-start snap-always"
      style={{
        backgroundImage: DOT_LAYERS,
        backgroundSize: "120px 120px, 90px 90px, 100px 100px, 110px 110px, 80px 80px, cover",
      }}
    >
      <div className="relative z-10 max-w-[560px] px-6 text-center">
        <p className="m-0 mb-[18px] text-[13px] font-bold tracking-[3px] text-areia uppercase opacity-85">
          Aluguel por temporada
        </p>
        <h1
          className="m-0 mb-5 font-display text-[clamp(2.6rem,10vw,4.6rem)] leading-[1.08] text-branco italic"
          style={{ textShadow: "0 4px 24px rgba(0,0,0,0.15)" }}
        >
          Casa de Praia
          <br />
          Iparana
        </h1>
        <p className="m-0 text-[17px] tracking-[0.3px] text-areia opacity-92">
          Tranquilidade e natureza para você desacelerar.
        </p>
      </div>

      <svg
        className="absolute -bottom-px left-0 z-[1] w-full leading-none"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        width="100%"
        height="90"
      >
        <path
          d="M0,64 C240,100 480,20 720,50 C960,80 1200,20 1440,60 L1440,120 L0,120 Z"
          fill="#F5EDD6"
        />
      </svg>

      <button
        type="button"
        onClick={() =>
          document
            .getElementById("form-section")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        aria-label="Rolar para o formulário"
        className="absolute bottom-[34px] left-1/2 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border-[1.5px] border-branco/55 bg-mar/35 p-0 text-branco backdrop-blur-[2px] cursor-pointer"
      >
        <ArrowDown
          size={26}
          strokeWidth={2}
          className="animate-bounce-slow drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
        />
      </button>
    </section>
  );
}

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { CircleCheck, Minus, Plus } from "lucide-react";

const WHATSAPP_NUMBER = "558599975766";

type FormState = {
  nome: string;
  checkinData: string;
  checkinHora: string;
  checkoutData: string;
  checkoutHora: string;
  pessoas: string;
  evento: string;
};

type FormErrors = Partial<Record<"nome" | "checkin" | "checkout" | "pessoas" | "evento", boolean>>;

const initialForm: FormState = {
  nome: "",
  checkinData: "",
  checkinHora: "",
  checkoutData: "",
  checkoutHora: "",
  pessoas: "",
  evento: "",
};

function formatDateTimeBR(isoDate: string, time: string) {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year} às ${time}`;
}

const inputClasses =
  "w-full font-sans text-base min-h-12 rounded-xl border-2 border-[#E4DCC4] bg-branco px-4 py-3.5 text-mar transition-colors focus:border-turquesa focus:shadow-[0_0_0_4px_rgba(75,169,200,0.18)] focus:outline-none";

function fieldClasses(hasError: boolean) {
  return hasError ? "[&_input]:border-coral [&_textarea]:border-coral" : "";
}

export default function ReservationForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function step(delta: number) {
    const current = parseInt(form.pessoas, 10) || 0;
    const next = Math.min(20, Math.max(1, current + delta));
    updateField("pessoas", String(next));
  }

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};

    if (!form.nome.trim()) nextErrors.nome = true;
    if (!form.checkinData || !form.checkinHora) nextErrors.checkin = true;
    if (!form.checkoutData || !form.checkoutHora) nextErrors.checkout = true;

    const pessoasVal = parseInt(form.pessoas, 10);
    if (!form.pessoas || Number.isNaN(pessoasVal) || pessoasVal < 1) {
      nextErrors.pessoas = true;
    }

    if (!form.evento.trim()) nextErrors.evento = true;

    return nextErrors;
  }

  function handleSubmit() {
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSuccess(false);
      return;
    }

    const nome = form.nome.trim();
    const entrada = formatDateTimeBR(form.checkinData, form.checkinHora);
    const saida = formatDateTimeBR(form.checkoutData, form.checkoutHora);
    const pessoas = form.pessoas;
    const evento = form.evento.trim();

    const mensagem = `Olá! Gostaria de verificar a disponibilidade da Casa de Praia Iparana. \u{1F60A}\n\n\u{1F464} Nome: ${nome}\n\u{1F4C5} Entrada: ${entrada}\n\u{1F4C5} Saída: ${saida}\n\u{1F465} Número de pessoas: ${pessoas}\n\u{1F389} Tipo de evento: ${evento}\n\nAguardo retorno para confirmarmos os detalhes!`;

    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(mensagem)}`;

    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setSuccess(true);
  }

  return (
    <section
      id="form-section"
      className="flex min-h-dvh flex-col justify-center bg-areia px-5 py-16 pb-20 sm:py-24 sm:pb-[100px]"
    >
      <h2 className="m-0 mb-3 text-center font-display text-[clamp(1.8rem,6vw,2.4rem)] font-bold text-mar italic">
        Verifique a disponibilidade
      </h2>
      <p className="mx-auto mb-9 max-w-[380px] text-center text-[15.5px] leading-[1.5] text-mar/80">
        Preencha abaixo e entraremos em contato pelo WhatsApp.
      </p>

      <div className="mx-auto w-full max-w-[460px] rounded-[20px] bg-branco px-[22px] pt-7 pb-8 shadow-[0_20px_50px_-20px_rgba(26,79,110,0.35)] sm:px-11 sm:pt-10 sm:pb-11">
        <div className={`mb-[22px] ${fieldClasses(!!errors.nome)}`}>
          <label htmlFor="nome" className="mb-2 block text-sm font-bold tracking-[0.2px] text-mar">
            Nome completo
          </label>
          <input
            type="text"
            id="nome"
            name="name"
            autoComplete="name"
            placeholder="Seu nome"
            className={inputClasses}
            value={form.nome}
            onChange={(e) => updateField("nome", e.target.value)}
          />
          {errors.nome && (
            <span className="mt-1.5 block text-[13px] font-medium text-coral">
              Por favor, preencha seu nome.
            </span>
          )}
        </div>

        <div className={`mb-[22px] ${fieldClasses(!!errors.checkin)}`}>
          <label htmlFor="checkin-data" className="mb-2 block text-sm font-bold tracking-[0.2px] text-mar">
            Data e hora de entrada
          </label>
          <div className="flex gap-2.5">
            <input
              type="date"
              id="checkin-data"
              name="checkin-data"
              autoComplete="off"
              className={inputClasses}
              value={form.checkinData}
              onChange={(e) => updateField("checkinData", e.target.value)}
            />
            <input
              type="time"
              id="checkin-hora"
              name="checkin-hora"
              autoComplete="off"
              className={`${inputClasses} max-w-[120px]`}
              value={form.checkinHora}
              onChange={(e) => updateField("checkinHora", e.target.value)}
            />
          </div>
          {errors.checkin && (
            <span className="mt-1.5 block text-[13px] font-medium text-coral">
              Selecione a data e hora de entrada.
            </span>
          )}
        </div>

        <div className={`mb-[22px] ${fieldClasses(!!errors.checkout)}`}>
          <label htmlFor="checkout-data" className="mb-2 block text-sm font-bold tracking-[0.2px] text-mar">
            Data e hora de saída
          </label>
          <div className="flex gap-2.5">
            <input
              type="date"
              id="checkout-data"
              name="checkout-data"
              autoComplete="off"
              className={inputClasses}
              value={form.checkoutData}
              onChange={(e) => updateField("checkoutData", e.target.value)}
            />
            <input
              type="time"
              id="checkout-hora"
              name="checkout-hora"
              autoComplete="off"
              className={`${inputClasses} max-w-[120px]`}
              value={form.checkoutHora}
              onChange={(e) => updateField("checkoutHora", e.target.value)}
            />
          </div>
          {errors.checkout && (
            <span className="mt-1.5 block text-[13px] font-medium text-coral">
              Selecione a data e hora de saída.
            </span>
          )}
        </div>

        <div className={`mb-[22px] ${fieldClasses(!!errors.pessoas)}`}>
          <label htmlFor="pessoas" className="mb-2 block text-sm font-bold tracking-[0.2px] text-mar">
            Número de pessoas
          </label>
          <div className="flex items-stretch gap-2.5">
            <button
              type="button"
              aria-label="Diminuir número de pessoas"
              onClick={() => step(-1)}
              className="flex min-h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-xl border-2 border-[#E4DCC4] bg-areia text-mar transition-transform active:scale-95 active:bg-[#ECE3C8]"
            >
              <Minus size={18} strokeWidth={2.5} />
            </button>
            <input
              type="number"
              id="pessoas"
              name="pessoas"
              min={1}
              max={20}
              value={form.pessoas}
              placeholder="0"
              inputMode="numeric"
              onChange={(e) => updateField("pessoas", e.target.value)}
              className={`${inputClasses} text-center font-bold`}
            />
            <button
              type="button"
              aria-label="Aumentar número de pessoas"
              onClick={() => step(1)}
              className="flex min-h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-xl border-2 border-[#E4DCC4] bg-areia text-mar transition-transform active:scale-95 active:bg-[#ECE3C8]"
            >
              <Plus size={18} strokeWidth={2.5} />
            </button>
          </div>
          {errors.pessoas && (
            <span className="mt-1.5 block text-[13px] font-medium text-coral">
              Informe o número de pessoas.
            </span>
          )}
        </div>

        <div className={`mb-[22px] ${fieldClasses(!!errors.evento)}`}>
          <label htmlFor="evento" className="mb-2 block text-sm font-bold tracking-[0.2px] text-mar">
            Tipo de evento
          </label>
          <textarea
            id="evento"
            name="evento"
            rows={3}
            placeholder="Ex: férias em família, aniversário, lua de mel..."
            className={`${inputClasses} resize-y leading-[1.5]`}
            value={form.evento}
            onChange={(e) => updateField("evento", e.target.value)}
          />
          {errors.evento && (
            <span className="mt-1.5 block text-[13px] font-medium text-coral">
              Conte pra gente o tipo de evento.
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="mt-2 flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border-none bg-coral font-sans text-[16.5px] font-bold text-branco shadow-[0_10px_24px_-10px_rgba(232,115,90,0.6)] transition-transform active:scale-[0.97]"
        >
          <FaWhatsapp size={20} />
          Quero reservar minha data
        </button>

        {success && (
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-turquesa/35 bg-turquesa/12 p-4">
            <CircleCheck size={22} strokeWidth={2.5} className="mt-0.5 shrink-0 fill-[#E4F5EA] text-[#2E9E5B]" />
            <p className="m-0 text-[14.5px] font-medium leading-[1.5] text-mar">
              Sua mensagem foi preparada! Finalize o envio no WhatsApp.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

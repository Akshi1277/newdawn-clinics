"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, Check, Mail } from "lucide-react";
import { useId, useRef, useState, type FormEvent } from "react";
import { messages, treatmentCategories, featured } from "@/config/site";
import { mailLink, waLink } from "@/lib/links";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

type Fields = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  day: string;
  concern: string;
  message: string;
};
type Errors = Partial<Record<keyof Fields, string>>;

const DAYS = ["Any day", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const CONCERNS = [...featured.map((f) => f.title), ...treatmentCategories.map((c) => `${c.name} (general)`), "Something else"];

const empty: Fields = { firstName: "", lastName: "", phone: "", email: "", day: "Any day", concern: "", message: "" };

function validate(v: Fields): Errors {
  const e: Errors = {};
  if (!v.firstName.trim()) e.firstName = "Enter your first name.";
  const digits = v.phone.replace(/\D/g, "");
  if (!digits) e.phone = "Enter a phone number so the clinic can reach you.";
  else if (digits.length < 10 || digits.length > 13) e.phone = "Enter a valid phone number with 10 digits, e.g. 98765 43210.";
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = "Enter a valid email address, like name@example.com, or leave it blank.";
  if (!v.concern) e.concern = "Choose the area you’d like to discuss.";
  return e;
}

function compose(v: Fields) {
  const lines = [
    "Hello, I would like to enquire about booking a dermatology consultation with Dr. Aditya Tolat at New Dawn Clinics.",
    "",
    `Name: ${[v.firstName.trim(), v.lastName.trim()].filter(Boolean).join(" ")}`,
    `Phone: ${v.phone.trim()}`,
    `Preferred day: ${v.day}`,
    `Area of concern: ${v.concern}`,
  ];
  if (v.message.trim()) lines.push(`Message: ${v.message.trim()}`);
  return lines.join("\n");
}

export function EnquiryForm() {
  const [v, setV] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [sent, setSent] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  const set = (k: keyof Fields) => (val: string) => {
    const next = { ...v, [k]: val };
    setV(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k: keyof Fields) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(v));
  };

  const check = () => {
    const e = validate(v);
    setErrors(e);
    setTouched({ firstName: true, phone: true, email: true, concern: true });
    const first = Object.keys(e)[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    return !first;
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (!check()) return;
    const url = waLink(compose(v));
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(url);
  };

  const onEmail = () => {
    if (!check()) return;
    const body = compose(v) + (v.email.trim() ? `\nEmail: ${v.email.trim()}` : "");
    window.location.href = mailLink("Consultation enquiry: New Dawn Clinics", body);
  };

  const err = (k: keyof Fields) => (touched[k] ? errors[k] : undefined);

  return (
    <div id="enquiry" className="relative bg-porcelain p-6 text-espresso shadow-[0_40px_90px_-40px_rgba(20,10,8,0.6)] sm:p-9 md:p-12">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <m.div
            key="sent"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            role="status"
            className="flex min-h-[420px] flex-col justify-center"
          >
            <span className="grid size-14 place-items-center rounded-full bg-olive text-ivory">
              <Check className="size-6" strokeWidth={1.75} />
            </span>
            <h3 className="mt-6 font-serif text-display-m">
              Your message is <span className="italic">ready to send.</span>
            </h3>
            <p className="mt-4 max-w-[44ch] text-espresso/80">
              WhatsApp has opened in a new tab with your enquiry filled in. Press send there to reach the clinic. If it didn’t open,{" "}
              <a href={sent} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                open WhatsApp here
              </a>
              .
            </p>
            <p className="mt-6 text-sm text-espresso/75">{messages.enquiryDisclaimer}</p>
            <button
              type="button"
              onClick={() => {
                setSent(null);
                setV(empty);
                setTouched({});
                setErrors({});
              }}
              className="mt-8 w-fit text-sm font-semibold underline decoration-espresso/30 hover:decoration-espresso"
            >
              Start a new enquiry
            </button>
          </m.div>
        ) : (
          <m.form
            key="form"
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            initial={false}
            exit={{ opacity: 0 }}
            aria-labelledby={`${uid}-title`}
          >
            <h3 id={`${uid}-title`} className="font-serif text-display-m">
              Send an <span className="italic">enquiry</span>
            </h3>
            <p className="mt-3 max-w-[48ch] text-[0.95rem] text-espresso/75">
              Fill in a few details and we’ll prepare a WhatsApp message for you to send to the clinic.
            </p>

            <div className="mt-8 grid gap-x-5 gap-y-6 sm:grid-cols-2">
              <Field
                id={`${uid}-fn`}
                name="firstName"
                label="First name"
                required
                autoComplete="given-name"
                value={v.firstName}
                onChange={set("firstName")}
                onBlur={blur("firstName")}
                error={err("firstName")}
              />
              <Field
                id={`${uid}-ln`}
                name="lastName"
                label="Last name"
                autoComplete="family-name"
                value={v.lastName}
                onChange={set("lastName")}
                onBlur={blur("lastName")}
              />
              <Field
                id={`${uid}-ph`}
                name="phone"
                label="Phone number"
                type="tel"
                inputMode="tel"
                required
                autoComplete="tel"
                value={v.phone}
                onChange={set("phone")}
                onBlur={blur("phone")}
                error={err("phone")}
              />
              <Field
                id={`${uid}-em`}
                name="email"
                label="Email (optional)"
                type="email"
                autoComplete="email"
                value={v.email}
                onChange={set("email")}
                onBlur={blur("email")}
                error={err("email")}
              />
              <Select id={`${uid}-day`} name="day" label="Preferred consultation day" value={v.day} onChange={set("day")} options={DAYS} />
              <Select
                id={`${uid}-co`}
                name="concern"
                label="Area of concern"
                required
                value={v.concern}
                onChange={set("concern")}
                onBlur={blur("concern")}
                options={CONCERNS}
                placeholder="Choose one"
                error={err("concern")}
              />
              <div className="sm:col-span-2">
                <Field
                  id={`${uid}-msg`}
                  name="message"
                  label="Message (optional)"
                  textarea
                  value={v.message}
                  onChange={set("message")}
                  onBlur={blur("message")}
                  maxLength={500}
                />
                <p className="mt-2 text-[0.82rem] text-espresso/75">{messages.privacyNote}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-espresso py-2.5 pl-7 pr-2.5 text-[1.02rem] font-semibold text-ivory transition-colors duration-500 hover:bg-burgundy"
              >
                <WhatsAppIcon className="size-[1.1rem]" />
                Send via WhatsApp
                <span
                  aria-hidden
                  className="grid size-10 place-items-center rounded-full bg-ivory/15 transition-transform duration-500 group-hover:-rotate-45"
                >
                  <ArrowRight className="size-[1.1rem]" strokeWidth={1.75} />
                </span>
              </button>
              <button
                type="button"
                onClick={onEmail}
                className="inline-flex items-center gap-2 text-[0.95rem] font-semibold underline decoration-espresso/30 underline-offset-4 hover:decoration-espresso"
              >
                <Mail className="size-4" strokeWidth={1.6} /> Prefer email?
              </button>
            </div>
            <p className="mt-6 border-t border-line pt-5 text-[0.85rem] text-espresso/70">{messages.enquiryDisclaimer}</p>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}

type FieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  type?: string;
  textarea?: boolean;
  autoComplete?: string;
  inputMode?: "tel" | "text" | "email";
  maxLength?: number;
};

const control =
  "peer block w-full rounded-none border-0 border-b bg-transparent px-0 pb-2.5 pt-6 text-[1.05rem] text-espresso outline-none transition-colors placeholder:text-transparent focus:border-espresso focus-visible:outline-none";

function Field({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  required,
  type = "text",
  textarea,
  autoComplete,
  inputMode,
  maxLength,
}: FieldProps) {
  const describedBy = error ? `${id}-err` : undefined;
  const common = {
    id,
    name,
    value,
    placeholder: " ",
    required,
    autoComplete,
    maxLength,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    onBlur,
    className: `${control} ${error ? "border-burgundy" : "border-espresso/30"} ${textarea ? "min-h-28 resize-y" : ""}`,
  };
  return (
    <div className="relative">
      {textarea ? (
        <textarea {...common} rows={3} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input {...common} type={type} inputMode={inputMode} onChange={(e) => onChange(e.target.value)} />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-0 origin-left text-[0.78rem] font-semibold tracking-[0.02em] text-espresso/70 transition-all duration-300 ease-out-expo peer-placeholder-shown:top-6 peer-placeholder-shown:text-[1.05rem] peer-placeholder-shown:font-normal peer-focus:top-0 peer-focus:text-[0.78rem] peer-focus:font-semibold peer-focus:text-espresso"
      >
        {label}
        {required && (
          <span aria-hidden className="text-burgundy">
            {" "}
            *
          </span>
        )}
      </label>
      {/* Focus underline */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] origin-left scale-x-0 bg-espresso transition-transform duration-500 ease-out-expo peer-focus:scale-x-100"
      />
      {error && (
        <p id={`${id}-err`} className="mt-2 text-[0.85rem] font-medium text-burgundy">
          {error}
        </p>
      )}
    </div>
  );
}

function Select({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  options,
  placeholder,
  required,
  error,
}: Omit<FieldProps, "type" | "textarea"> & { options: string[]; placeholder?: string }) {
  return (
    <div>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          required={required}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-err` : undefined}
          className={`${control} appearance-none pr-8 ${error ? "border-burgundy" : "border-espresso/30"} ${value ? "" : "text-espresso/75"}`}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-0 top-0 text-[0.78rem] font-semibold tracking-[0.02em] text-espresso/70"
        >
          {label}
          {required && (
            <span aria-hidden className="text-burgundy">
              {" "}
              *
            </span>
          )}
        </label>
        <svg
          aria-hidden
          viewBox="0 0 12 8"
          className="pointer-events-none absolute bottom-4 right-1 w-3 text-espresso/70"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        >
          <path d="M1 1.5l5 5 5-5" />
        </svg>
      </div>
      {error && (
        <p id={`${id}-err`} className="mt-2 text-[0.85rem] font-medium text-burgundy">
          {error}
        </p>
      )}
    </div>
  );
}

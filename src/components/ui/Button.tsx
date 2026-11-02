import Link from "next/link";
import { ArrowUpRight, ArrowRight, Phone } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

type Variant = "solid" | "outline" | "light" | "outline-light" | "burgundy";
type Icon = "arrow" | "external" | "whatsapp" | "phone" | "none";

const styles: Record<Variant, string> = {
  solid: "bg-espresso text-ivory hover:bg-burgundy",
  burgundy: "bg-burgundy text-ivory hover:bg-espresso",
  outline: "border border-espresso/35 text-espresso hover:border-espresso hover:bg-espresso hover:text-ivory",
  light: "bg-ivory text-espresso hover:bg-peach",
  "outline-light": "border border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory hover:text-espresso",
};

const disc: Record<Variant, string> = {
  solid: "bg-ivory/15",
  burgundy: "bg-ivory/15",
  outline: "bg-espresso text-ivory group-hover:bg-ivory group-hover:text-espresso",
  light: "bg-espresso text-ivory",
  "outline-light": "bg-ivory text-espresso group-hover:bg-espresso group-hover:text-ivory",
};

const icons = {
  arrow: ArrowRight,
  external: ArrowUpRight,
  whatsapp: WhatsAppIcon,
  phone: Phone,
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  icon?: Icon;
  external?: boolean;
  className?: string;
  size?: "md" | "lg";
  ariaLabel?: string;
  onClick?: () => void;
};

/** The single signature control: a capsule whose icon disc turns on hover. */
export function Button({
  href,
  children,
  variant = "solid",
  icon = "arrow",
  external,
  className = "",
  size = "md",
  ariaLabel,
  onClick,
}: Props) {
  const Ico = icon === "none" ? null : icons[icon];
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
  // Dynamic-route pages in the static export are loaded as plain documents.
  const plainDoc = href.startsWith("/treatments/");
  const cls = `group inline-flex items-center gap-3 rounded-full font-sans font-semibold tracking-[0.01em] transition-[color,background-color,border-color,transform] duration-500 ease-out-expo active:scale-[0.98] ${
    size === "lg" ? "py-2.5 pl-7 pr-2.5 text-[1.02rem]" : "py-2 pl-5 pr-2 text-[0.94rem]"
  } ${styles[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {Ico && (
        <span
          aria-hidden
          className={`grid place-items-center rounded-full transition-[transform,background-color,color] duration-500 ease-out-expo ${
            size === "lg" ? "size-10" : "size-8"
          } ${disc[variant]} ${icon === "arrow" ? "group-hover:-rotate-45" : icon === "external" ? "group-hover:rotate-45" : ""}`}
        >
          <Ico className={size === "lg" ? "size-[1.15rem]" : "size-4"} strokeWidth={1.75} />
        </span>
      )}
    </>
  );
  if (plainDoc && !isExternal) {
    return (
      <a href={href} className={cls} aria-label={ariaLabel} onClick={onClick}>
        {inner}
      </a>
    );
  }
  if (isExternal) {
    const newTab = /^https?:/.test(href);
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        onClick={onClick}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
        {newTab && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel} onClick={onClick}>
      {inner}
    </Link>
  );
}

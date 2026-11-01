import { Reveal } from "@/components/motion/Reveal";

/** Section heading: plain roman serif with a quiet fade. Expressive italics are reserved for a few moments. */
export function Heading({ id, text, className = "" }: { id: string; text: string; className?: string }) {
  return (
    <Reveal variant="soft">
      <h2 id={id} className={`font-serif text-display-l ${className}`}>
        {text}
      </h2>
    </Reveal>
  );
}

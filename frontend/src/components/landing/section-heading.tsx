type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const alignmentClass = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <div className={["max-w-3xl", alignmentClass, className].filter(Boolean).join(" ")}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 md:text-5xl">{title}</h2>
      {description ? <p className="mt-5 text-base leading-relaxed text-zinc-300 md:text-lg">{description}</p> : null}
    </div>
  );
}

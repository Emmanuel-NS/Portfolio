type SectionHeadingProps = {
  eyebrow: string
  title: string
  description: string
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10 flex flex-col gap-3 text-center md:text-left">
      <p className="badge-pill w-fit text-xs uppercase tracking-[0.3em] text-muted/70">{eyebrow}</p>
      <h2 className="text-3xl font-semibold text-white md:text-4xl">
        <span className="gradient-text">{title}</span>
      </h2>
      <p className="text-balance text-base text-muted md:max-w-2xl">{description}</p>
    </div>
  )
}

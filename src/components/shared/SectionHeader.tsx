interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeader({ title, subtitle, centered = true, light = false }: SectionHeaderProps) {
  return (
    <div className={`space-y-4 ${centered ? 'text-center' : ''}`}>
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${light ? 'text-white' : 'text-foreground'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl leading-relaxed ${centered ? 'mx-auto' : ''} ${light ? 'text-white/60' : 'text-muted-foreground'}`}>
          {subtitle}
        </p>
      )}
      {centered && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <div className="w-12 h-1 bg-accent-500 rounded-full" />
          <div className="w-3 h-1 bg-accent-500/50 rounded-full" />
          <div className="w-1.5 h-1 bg-accent-500/30 rounded-full" />
        </div>
      )}
    </div>
  );
}

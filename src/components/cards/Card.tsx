import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  title: string;
  childrenClassName?: string;
  className?: string;
}

export default function Card({ children, title, childrenClassName, className }: Props) {
  return (
    <div className={cn(
      "p-5 md:p-6 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/60 shadow-lg flex flex-col gap-5 transition-all duration-300 hover:shadow-xl hover:border-primary/30",
      className
    )}>
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/80 border-b border-border/40 pb-3">{title}</h2>
      <div className={cn("flex-1", childrenClassName)}>{children}</div>
    </div>
  );
};

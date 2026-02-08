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
      "p-6 rounded-3xl bg-card/40 backdrop-blur-xl border border-border/40 shadow-xl flex flex-col gap-6 transition-all duration-300 hover:shadow-2xl hover:border-primary/20",
      className
    )}>
      <h2 className="text-xl font-bold tracking-tight text-foreground/90 border-b border-border/30 pb-3">{title}</h2>
      <div className={cn("flex-1", childrenClassName)}>{children}</div>
    </div>
  );
};

import { cn } from "@/lib/utils";

interface PillProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  text: string;
  className?: string;
  /**
   * @default true
   */
  animate?: boolean;
}

export function Pill({
  icon,
  text,
  className,
  animate = true,
  ...props
}: PillProps) {
  return (
    <div
      className={cn(animate && "animate-slide-up-fade", className)}
      {...props}
    >
      <p className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-background px-3 py-1 text-[13px] font-medium text-foreground shadow-sm shadow-black/[.12] dark:bg-accent hover:bg-accent/80 transition-colors">
        {icon && (
          <span className="mr-2 flex shrink-0 border-r border-border pr-2">
            {icon}
          </span>
        )}
        {text}
      </p>
    </div>
  );
}

Pill.displayName = "Pill";

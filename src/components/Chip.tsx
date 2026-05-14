import { cn } from "../lib/utils";

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export function Chip({ label, className, ...props }: ChipProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-medium",
        "bg-white/50 text-[#0f7a82] border hover:bg-[#0f7a82]/10 transition-colors",
        "dark:bg-[#1a232c] dark:text-[#b08434] dark:border-[#b08434]/20 dark:hover:bg-[#b08434]/10",
        className
      )}
      {...props}
    >
      {label}
    </button>
  );
}

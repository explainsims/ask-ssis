import { Chip } from "./Chip";

interface EmptyStateProps {
  onSuggest: (query: string) => void;
}

export function EmptyState({ onSuggest }: EmptyStateProps) {
  const suggestions = [
    "Where is Ryan?",
    "Jenny’s Chemistry grade last semester",
    "Dave is struggling with tests in my class"
  ];

  return (
    <div className="flex flex-col items-center justify-center mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {suggestions.map((s, i) => (
          <Chip key={i} label={s} onClick={() => onSuggest(s)} />
        ))}
      </div>
    </div>
  );
}

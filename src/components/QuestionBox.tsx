import { Search, Loader2 } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface QuestionBoxProps {
  query: string;
  setQuery: (q: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function QuestionBox({ query, setQuery, onSubmit, isLoading }: QuestionBoxProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto z-10 flex">
      <div className="relative flex-1 group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-gray-400 group-focus-within:text-[#0f7a82] dark:group-focus-within:text-[#b08434] transition-colors" />
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="How can I help?"
          className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-white/70 dark:bg-[#1a232c]/70 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0f7a82] dark:focus:ring-[#b08434] shadow-sm backdrop-blur-sm transition-all disabled:opacity-50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 text-lg"
          autoFocus
        />
        {isLoading && (
          <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-gray-100 dark:bg-gray-800 overflow-hidden rounded-full">
            <div className="h-full bg-[#0f7a82] dark:bg-[#b08434] w-1/3 animate-[slide_1.5s_ease-in-out_infinite]"></div>
          </div>
        )}
      </div>
      <div className="absolute -right-16 top-1/2 -translate-y-1/2">
        <ThemeToggle />
      </div>
    </div>
  );
}

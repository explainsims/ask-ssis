import ReactMarkdown from "react-markdown";
import { Chip } from "./Chip";
import { Message } from "../lib/types";

interface MessageCardProps {
  message: Message;
  onChipClick: (query: string) => void;
}

export function MessageCard({ message, onChipClick }: MessageCardProps) {
  if (message.role === "user") {
    return (
      <div className="flex w-full justify-end mb-6 animate-in slide-in-from-right-4 fade-in duration-300">
        <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-5 py-3 rounded-2xl max-w-[85%] text-left">
          {message.content}
        </div>
      </div>
    );
  }

  // If we couldn't parse the response shape, just show text.
  if (!message.parsedResponse) {
    return (
      <div className="flex w-full justify-start mb-6 animate-in slide-in-from-left-4 fade-in duration-300">
        <div className="text-gray-900 dark:text-gray-100 px-5 py-3 rounded-2xl max-w-[85%] text-left bg-white dark:bg-[#1a232c] shadow-sm border border-gray-100 dark:border-gray-800">
           {message.content}
        </div>
      </div>
    );
  }

  const { type, text, chips } = message.parsedResponse;
  
  return (
    <div className="flex w-full justify-start mb-6 animate-in slide-in-from-left-4 fade-in duration-300">
      <div className="flex flex-col gap-4 max-w-[85%]">
        <div className="text-gray-900 dark:text-gray-100 px-5 py-4 rounded-2xl text-left bg-white dark:bg-[#1a232c] shadow-sm border border-gray-100 dark:border-gray-800 markdown-body prose dark:prose-invert">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
        
        {chips && chips.length > 0 && (
          <div className="flex flex-wrap gap-2 pl-2">
            {chips.map((chip, idx) => (
              <Chip
                key={idx}
                label={chip.label}
                onClick={() => onChipClick(chip.query)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

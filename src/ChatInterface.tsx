import { useState, useRef, useEffect } from "react";
import { QuestionBox } from "./components/QuestionBox";
import { EmptyState } from "./components/EmptyState";
import { MessageCard } from "./components/MessageCard";
import { Message, AskResponse } from "./lib/types";
import { getSystemPrompt } from "./lib/systemPrompt";
import { ai } from "./lib/gemini";

export function ChatInterface() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState<any>(null); // Gemini chat session
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat session
  useEffect(() => {
    async function initChat() {
      const systemPromptStr = await getSystemPrompt();
      const chat = ai.chats.create({
        model: "gemini-2.5-pro",
        config: {
          systemInstruction: systemPromptStr,
          temperature: 0.2, // Be somewhat deterministic
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              type: { type: "string", enum: ["answer", "disambiguation", "no_match"] },
              text: { type: "string" },
              chips: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    label: { type: "string" },
                    query: { type: "string" }
                  },
                  required: ["label", "query"]
                }
              }
            },
            required: ["type", "text", "chips"]
          }
        }
      });
      setSession(chat);
    }
    initChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (overrideQuery?: string) => {
    const textToSubmit = overrideQuery || query;
    if (!textToSubmit.trim() || isLoading) return;

    setQuery("");
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: textToSubmit };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      if (!session) {
         throw new Error("Chat session not initialized");
      }
      
      const response = await session.sendMessage({ message: textToSubmit });
      let responseText = response.text;
      
      let parsed: AskResponse | undefined = undefined;
      try {
        // Strip markdown codeblock if present
        let cleaned = responseText.trim();
        if (cleaned.startsWith("```json")) {
           cleaned = cleaned.substring(7);
        } else if (cleaned.startsWith("```")) {
           cleaned = cleaned.substring(3);
        }
        if (cleaned.endsWith("```")) {
           cleaned = cleaned.substring(0, cleaned.length - 3);
        }
        parsed = JSON.parse(cleaned);
      } catch (e) {
        console.error("Failed to parse JSON response", e, responseText);
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseText,
        parsedResponse: parsed,
      };
      
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry, I encountered an error fulfilling your request.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto px-4 py-8">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto pb-4 space-y-6 scrollbar-hide">
        <div className="h-full flex flex-col justify-end min-h-full">
          {messages.length === 0 ? (
            <div className="w-full flex-1 flex flex-col items-center justify-center">
              <h1 className="text-4xl font-serif font-medium text-gray-900 dark:text-gray-100 mb-8 opacity-80">
                Ask SSIS
              </h1>
            </div>
          ) : (
            messages.map((m) => (
              <MessageCard key={m.id} message={m} onChipClick={(q) => handleSubmit(q)} />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="shrink-0 pt-4">
        <QuestionBox
          query={query}
          setQuery={setQuery}
          onSubmit={() => handleSubmit()}
          isLoading={isLoading}
        />
        {messages.length === 0 && <EmptyState onSuggest={(q) => handleSubmit(q)} />}
      </div>
    </div>
  );
}

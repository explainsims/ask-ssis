export type ResponseType = 'answer' | 'disambiguation' | 'no_match';

export interface ChipData {
  label: string;
  query: string;
}

export interface AskResponse {
  type: ResponseType;
  text: string;
  chips: ChipData[];
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  parsedResponse?: AskResponse;
}

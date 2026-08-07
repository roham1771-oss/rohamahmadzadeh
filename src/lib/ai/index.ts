export interface AIProvider {
  chat(messages: AIMessage[], options?: AIOptions): Promise<AIResponse>;
  name: string;
}

export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIOptions {
  temperature?: number;
  maxTokens?: number;
  model?: string;
}

export interface AIResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface AIProviderConfig {
  provider: string;
  apiKey?: string;
  model?: string;
  baseUrl?: string;
}

let currentProvider: AIProvider | null = null;

export function getAIProvider(): AIProvider {
  if (currentProvider) return currentProvider;

  const providerName = process.env.AI_PROVIDER || 'openai';

  switch (providerName) {
    case 'openai':
    default:
      currentProvider = new OpenAIProvider();
      break;
  }

  return currentProvider;
}

export function setAIProvider(provider: AIProvider) {
  currentProvider = provider;
}

class OpenAIProvider implements AIProvider {
  name = 'openai';

  async chat(messages: AIMessage[], options?: AIOptions): Promise<AIResponse> {
    const apiKey = process.env.AI_API_KEY;
    if (!apiKey) {
      throw new Error('AI API key not configured');
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: options?.model || process.env.AI_MODEL || 'gpt-4',
          messages,
          temperature: options?.temperature || 0.7,
          max_tokens: options?.maxTokens || 2048,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      return {
        content: data.choices[0].message.content,
        usage: data.usage ? {
          promptTokens: data.usage.prompt_tokens,
          completionTokens: data.usage.completion_tokens,
          totalTokens: data.usage.total_tokens,
        } : undefined,
      };
    } catch (error) {
      throw new Error(`AI Provider error: ${error}`);
    }
  }
}

export const LEGAL_SYSTEM_PROMPT = `شما دستیار حقوقی هوش مصنوعی دفتر وکالت احمدزاده هستید.

قوانین مهم:
1. شما فقط اطلاعات عمومی حقوقی ارائه می‌دهید.
2. هرگز جایگزین مشاوره حقوقی تخصصی نیستید.
3. همیشه توصیه کنید برای مسائل خاص با وکیل مشورت شود.
4. پاسخ‌ها باید دقیق، مختصر و به زبان ساده باشند.
5. از ارائه نظر قاطع در مورد پرونده‌های خاص خودداری کنید.
6. منابع قانونی معتبر را ذکر کنید.

هشدار: پاسخ‌های هوش مصنوعی صرفاً جنبه اطلاع‌رسانی دارند و جایگزین مشاوره حقوقی تخصصی نیستند.`;

export const LEGAL_SYSTEM_PROMPT_EN = `You are the AI Legal Assistant of Ahmadzadeh Law Office.

Important rules:
1. You only provide general legal information.
2. You never replace professional legal advice.
3. Always recommend consulting an attorney for specific matters.
4. Responses should be accurate, concise, and in simple language.
5. Avoid giving definitive opinions on specific cases.
6. Cite credible legal sources when possible.

Disclaimer: AI responses are for informational purposes only and do not replace professional legal advice.`;

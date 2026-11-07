import { ChatOpenRouter } from '@langchain/openrouter';

export const llm = new ChatOpenRouter({
  model: 'openai/gpt-4o-mini',
  temperature: 0,
});

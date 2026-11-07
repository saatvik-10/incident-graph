import { ChatOpenRouter } from '@langchain/openrouter';
import { IncidentAnalysisSchema } from '../graph/schemas/incident-analysis.schema';

export const llm = new ChatOpenRouter({
  model: 'openai/gpt-4o-mini',
  temperature: 0,
});

export const incidentAnalyzer = llm.withStructuredOutput(
  IncidentAnalysisSchema,
);

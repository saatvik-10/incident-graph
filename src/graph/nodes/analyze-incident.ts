import type { GraphNode } from '@langchain/langgraph';
import type { IncidentStateType } from '../state';
import { incidentAnalyzer } from '../../providers/llm.provider';
import { incidentAnalysisPrompt } from '../../prompts/incident-analysis.prompt';

export const analyzeIncident: GraphNode<IncidentStateType> = async (state) => {
  console.log('Analyzing Incident with LLM...');

  const res = await incidentAnalyzer.invoke([
    {
      role: 'system',
      content: incidentAnalysisPrompt,
    },
    {
      role: 'user',
      content: state.userInput,
    },
  ]);

  return {
    analysis: res.analysis,
    needMoreInfo: res.needMoreInfo,
    followUpQuestion: res.followUpQuestion,
  };
};

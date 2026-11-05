import type { GraphNode } from '@langchain/langgraph';
import type { IncidentStateType } from '../state';

export const analyzeIncident: GraphNode<IncidentStateType> = (state) => {
  console.log('Analyzing Incident');

  const userInput = state.userInput.toLowerCase();

  const needsMoreInfo =
    userInput.includes('500') && !userInput.includes('database is down');

  return {
    analysis: 'API may be experiencing a database connection issue',
    needsMoreInfo,
    followUpQuestion: needsMoreInfo
      ? 'Are database connection errors appearing in the logs?'
      : '',
  };
};

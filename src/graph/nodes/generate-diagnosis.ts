import type { GraphNode } from '@langchain/langgraph';
import type { IncidentStateType } from '../state';

export const generateDiagnosis: GraphNode<IncidentStateType> = (state) => {
  console.log('Generating diagnosis...');

  return {
    diagnosis: `Based on the analysis: ${state.analysis}`,
  };
};

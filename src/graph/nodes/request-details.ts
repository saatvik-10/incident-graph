import type { GraphNode } from '@langchain/langgraph';
import type { IncidentStateType } from '../state';

export const requestDetails: GraphNode<IncidentStateType> = (state) => {
  console.log('Requesting more details...');
  console.log(state.followUpQuestion);

  return {};
};

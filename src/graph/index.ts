import { StateGraph, START, END, MemorySaver } from '@langchain/langgraph';
import { IncidentState } from './state';
import { analyzeIncident } from './nodes/analyze-incident';
import { requestDetails } from './nodes/request-details';
import { generateDiagnosis } from './nodes/generate-diagnosis';
import { routeAfterAnalysis } from './edges/routing';

const builder = new StateGraph(IncidentState)
  .addNode('analyzeIncident', analyzeIncident)
  .addNode('requestDetails', requestDetails)
  .addNode('generateDiagnosis', generateDiagnosis)

  .addEdge(START, 'analyzeIncident')
  .addConditionalEdges('analyzeIncident', routeAfterAnalysis)
  .addEdge('requestDetails', 'generateDiagnosis')
  .addEdge('generateDiagnosis', END);

const checkpointer = new MemorySaver();

export const incidentGraph = builder.compile({
  checkpointer,
});

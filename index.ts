import {
  StateGraph,
  StateSchema,
  START,
  END,
  type GraphNode,
} from '@langchain/langgraph';
import { z } from 'zod';

const IncidentState = new StateSchema({
  userInput: z.string(),
  analysis: z.string().default(''),
  needsMoreInfo: z.boolean().default(false),
  followUpQuestion: z.string().default(''),
  diagnosis: z.string().default(''),
});

const analyzeIncident: GraphNode<typeof IncidentState> = (state) => {
  console.log('Analyzing Incident');

  const userInput = state.userInput.toLowerCase();

  const needsMoreInfo =
    userInput.includes('500') && !userInput.includes('database is down');

  return {
    analysis: 'API may be experiencing a db connection issue',
    needsMoreInfo,
    followUpQuestion: needsMoreInfo
      ? 'Are database connection errors appearing in the logs?'
      : '',
  };
};

const requestDetails: GraphNode<typeof IncidentState> = (state) => {
  console.log('Generating Diagnosis');
  console.log(state.followUpQuestion);

  return {};
};

const generateDiagnosis: GraphNode<typeof IncidentState> = (state) => {
  console.log('Generating diagnosis...');

  return {
    diagnosis: `Based on the analysis: ${state.analysis}`,
  };
};

const routeAfterAnalysis = (state: typeof IncidentState.State) => {
  return state.needsMoreInfo ? 'requestDetails' : 'generateDiagnosis';
};

const graph = new StateGraph(IncidentState)
  .addNode('analyzeIncident', analyzeIncident)
  .addNode('requestDetails', requestDetails)
  .addNode('generateDiagnosis', generateDiagnosis)

  .addEdge(START, 'analyzeIncident')
  .addConditionalEdges('analyzeIncident', routeAfterAnalysis)
  .addEdge('requestDetails', 'generateDiagnosis')
  .addEdge('generateDiagnosis', END)

  .compile();

const res = await graph.invoke({
  userInput: 'My API is returning that database is down.',
});

console.log('\nFinal State:');
console.log(res);

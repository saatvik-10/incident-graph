import { StateGraph, START, END } from "@langchain/langgraph";

import { IncidentState } from "./state";

import { analyzeIncident } from "./nodes/analyze-incident";
import { requestDetails } from "./nodes/request-details";
import { generateDiagnosis } from "./nodes/generate-diagnosis";

import { routeAfterAnalysis } from "./edges/routing";

export const incidentGraph = new StateGraph(IncidentState)
  .addNode("analyzeIncident", analyzeIncident)
  .addNode("requestDetails", requestDetails)
  .addNode("generateDiagnosis", generateDiagnosis)

  .addEdge(START, "analyzeIncident")
  .addConditionalEdges("analyzeIncident", routeAfterAnalysis)
  .addEdge("requestDetails", "generateDiagnosis")
  .addEdge("generateDiagnosis", END)

  .compile();
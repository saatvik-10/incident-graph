import { IncidentAnalysisSchema } from '../graph/schemas/incident-analysis.schema';

const result = IncidentAnalysisSchema.safeParse({
  needMoreInfo: false,
  followUpQuestion: '',
  analysis: 'The API returns a 500 error.',
});

console.log(result);

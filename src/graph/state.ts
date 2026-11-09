import { StateSchema } from '@langchain/langgraph';
import { z } from 'zod';

export const IncidentState = new StateSchema({
  userInput: z.string(),
  analysis: z.string().default(''),
  needMoreInfo: z.boolean().default(false),
  followUpQuestion: z.string().default(''),
  diagnosis: z.string().default(''),
  additionalInfo: z.string().default(''),
});

export type IncidentStateType = typeof IncidentState.State;

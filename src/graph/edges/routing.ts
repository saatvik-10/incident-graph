import type { IncidentStateType } from '../state';

export const routeAfterAnalysis = (state: IncidentStateType) => {
  return state.needsMoreInfo ? 'requestDetails' : 'generateDiagnosis';
};

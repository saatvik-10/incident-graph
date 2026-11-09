import { interrupt } from '@langchain/langgraph';

export async function requestDetails() {
  const additionalInfo = interrupt({
    type: 'request_details',
    question: 'Please provide additional incident details...',
  });

  return {
    additionalInfo,
  };
}

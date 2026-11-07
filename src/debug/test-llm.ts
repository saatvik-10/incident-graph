import { llm } from '../providers/llm.provider';

const response = await llm.invoke('Explain an HTTP 500 error in one sentence.');

console.log(response.content);

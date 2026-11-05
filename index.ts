import { incidentGraph } from './src/graph';

const result = await incidentGraph.invoke({
  userInput: 'My API is returning HTTP 500 errors.',
});

console.log('\nFinal State:');
console.log(result);

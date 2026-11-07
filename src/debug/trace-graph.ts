import { incidentGraph } from '../graph';

const res = await incidentGraph.stream(
  {
    userInput: 'The API returns 500 because the database is down.',
  },
  {
    streamMode: 'updates',
  },
);

for await (const update of res) {
  console.log(update);
}

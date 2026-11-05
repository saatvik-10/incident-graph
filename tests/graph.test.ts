import { describe, expect, test } from 'bun:test';
import { incidentGraph } from '../src/graph';

describe('Incident Graph', () => {
  test('requests more details when input is vague', async () => {
    const result = await incidentGraph.invoke({
      userInput: 'My API is returning HTTP 500 errors.',
    });

    expect(result.needsMoreInfo).toBe(true);
    expect(result.followUpQuestion).not.toBe('');
    expect(result.diagnosis).toBe(
      'Based on the analysis: API may be experiencing a database connection issue',
    );
  });

  test('skips requesting details when input is specific', async () => {
    const result = await incidentGraph.invoke({
      userInput: 'The API returns 500 because the database is down',
    });

    expect(result.needsMoreInfo).toBe(false);
    expect(result.followUpQuestion).toBe('');
    expect(result.diagnosis).not.toBe('');
  });
});

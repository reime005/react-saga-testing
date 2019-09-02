import fetchMock from 'fetch-mock';
import { delay } from 'q';

fetchMock.config.fallbackToNetwork = false;
fetchMock.config.overwriteRoutes = false;

fetchMock.get(`glob:https://example-api.com/test`, () => {
  return new Promise(async resolve => {
    await delay(1000); // simulate server work/load

    resolve({
      status: 200,
      body: { increment: 1 },
    });
  });
});

import fetchMock from 'fetch-mock';

fetchMock.get(`glob:https://example-api.com/test`, () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        status: 200,
        body: { increment: 1 },
      });
    }, 1000) // simulate server work/load before responding
  });
});

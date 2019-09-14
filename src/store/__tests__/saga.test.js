import SagaTester from "redux-saga-tester";
import { rootSaga, queuedSagaAction } from "../rootSaga";
import { rootReducer } from "../rootReducer";

// enable mock api so that test environment goes against fake server
require('../../mock-api.js');

const delay = (t) => new Promise(res => setTimeout(() => res(), t));

describe("root saga", () => {
  it("should handle 4 button clicks one after another", async () => {
    const sagaTester = new SagaTester({
      reducers: rootReducer
    });

    sagaTester.start(rootSaga);

    sagaTester.dispatch(queuedSagaAction());
    sagaTester.dispatch(queuedSagaAction());
    sagaTester.dispatch(queuedSagaAction());
    sagaTester.dispatch(queuedSagaAction());

    await delay(5000); // wait for 4 request * max 1sec each

    const state = sagaTester.getState();

    expect(state.exampleReducer.counter).toEqual(4);
  }, 30000);
});

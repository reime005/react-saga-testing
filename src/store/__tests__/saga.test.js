import SagaTester from "redux-saga-tester";
import { rootSaga, testSagaAction } from "../rootSaga";
import { delay } from "q";
import { rootReducer } from "../rootReducer";

describe("root saga", () => {
  it("should handle 4 button clicks one after another", async () => {
    const sagaTester = new SagaTester({
      reducers: rootReducer
    });

    sagaTester.start(rootSaga);

    sagaTester.dispatch(testSagaAction());
    sagaTester.dispatch(testSagaAction());
    sagaTester.dispatch(testSagaAction());
    sagaTester.dispatch(testSagaAction());

    await delay(5000); // wait for 4 request * max 1sec each

    const state = sagaTester.getState();

    expect(state.exampleReducer.counter).toEqual(4);
  }, 30000);
});

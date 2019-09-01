import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware, { END } from "redux-saga";
import { rootReducer, initialState } from "./rootReducer";
import { rootSaga } from "./rootSaga";

export default function configureStore(state = initialState) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    state,
    applyMiddleware(sagaMiddleware)
  );

  store.runSaga = sagaMiddleware.run;

  store.runSaga(rootSaga);

  store.close = () => store.dispatch(END);
  return store;
}

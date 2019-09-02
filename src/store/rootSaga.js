import {
  take,
  put,
  call,
  fork,
  all,
  delay,
  takeEvery,
  takeLatest,
  takeLeading
} from "redux-saga/effects";
import { testIncremenReduxAction } from "./rootReducer";
import { channel } from "redux-saga";

export const SEND_MEDIA_SAGA_ACTION = "SEND_MEDIA_SAGA_ACTION";

export const TAKE_SAGA_ACTION = "TAKE_SAGA_ACTION";
export const TAKE_EVERY_SAGA_ACTION = "TAKE_EVERY_SAGA_ACTION";
export const TAKE_LATEST_SAGA_ACTION = "TAKE_LATEST_SAGA_ACTION";
export const TAKE_LEADING_SAGA_ACTION = "TAKE_LEADING_SAGA_ACTION";
export const TAKE_MAYBE_SAGA_ACTION = "TAKE_MAYBE_SAGA_ACTION";

export const takeSagaAction = () => ({
  type: TAKE_SAGA_ACTION
});

export const takeEverySagaAction = () => ({
  type: TAKE_EVERY_SAGA_ACTION
});

export const takeLatestSagaAction = () => ({
  type: TAKE_LATEST_SAGA_ACTION
});

export const takeLeadingSagaAction = () => ({
  type: TAKE_LEADING_SAGA_ACTION
});

export const takeMaybeSagaAction = () => ({
  type: TAKE_MAYBE_SAGA_ACTION
});

export const queuedSagaAction = () => ({
  type: SEND_MEDIA_SAGA_ACTION
});

function* sendMediaSaga() {
  const result = yield call(fetch, 'https://example-api.com/test');
  const { increment } = yield result.json();

  yield put(testIncremenReduxAction({ increment }))
}

function* takeSaga() {
  while (true) {
    const action = yield take(TAKE_SAGA_ACTION);
    yield fork(sendMediaSaga, action);
  }
}

function* takeMaybeSaga() {
  while (true) {
    const action = yield take(TAKE_MAYBE_SAGA_ACTION);
    yield fork(sendMediaSaga, action);
  }
}

function* handleRequest(chan) {
  const list = [];

  while (true) {
    const action = yield take(chan);

    while (list.some(task => task.isRunning())) {
      yield delay(50);
    }

    const task = yield fork(sendMediaSaga, action);
    list.push(task);
  }
}

function* mediaQueueSaga() {
  // create a channel to queue incoming requests
  const chan = yield call(channel);

  // create 1 worker 'threads'
  for (let i = 0; i < 1; i++) {
    yield fork(handleRequest, chan);
  }

  while (true) {
    const action = yield take(SEND_MEDIA_SAGA_ACTION);
    yield put(chan, action);
  }
}

function* exampleSagas() {
  yield takeEvery(TAKE_EVERY_SAGA_ACTION, sendMediaSaga);
  yield takeLatest(TAKE_LATEST_SAGA_ACTION, sendMediaSaga);
  yield takeLeading(TAKE_LEADING_SAGA_ACTION, sendMediaSaga);
}

export const rootSaga = function* rootSaga() {
  yield all([
    fork(mediaQueueSaga),
    fork(exampleSagas),
    fork(takeSaga),
    fork(takeMaybeSaga)
  ]);
};

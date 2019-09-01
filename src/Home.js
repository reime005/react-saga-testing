import React from "react";
import { connect } from "react-redux";
import {
  testSagaAction,
  takeEverySagaAction,
  takeLatestSagaAction,
  takeMaybeSagaAction,
  takeLeadingSagaAction,
  takeSagaAction
} from "./store/rootSaga";
import { resetAction } from "./store/rootReducer";

export const Home = ({
  counter,
  makeCall,
  take,
  takeEvery,
  takeMaybe,
  takeLeading,
  takeLatest,
  reset
}) => {
  return (
    <div>
      <h1>Counter</h1>
      <p id="testCounter">{counter}</p>
      <div style={{ flex: 1 }}>
        <button id="testButton" onClick={() => makeCall()}>
          Call
        </button>
        <button onClick={() => reset()}>Reset</button>
        <button onClick={() => take()}>Take</button>
        <button onClick={() => takeEvery()}>Take Every</button>
        <button onClick={() => takeMaybe()}>Take Maybe</button>
        <button onClick={() => takeLeading()}>Take Leading</button>
        <button onClick={() => takeLatest()}>Take Latest</button>
      </div>
    </div>
  );
};

export const HomeContainer = connect(
  state => ({
    counter: state.exampleReducer.counter
  }),
  dispatch => ({
    reset: () => dispatch(resetAction()),
    take: () => dispatch(takeSagaAction()),
    takeEvery: () => dispatch(takeEverySagaAction()),
    takeLatest: () => dispatch(takeLatestSagaAction()),
    takeMaybe: () => dispatch(takeMaybeSagaAction()),
    takeLeading: () => dispatch(takeLeadingSagaAction()),
    makeCall: () => dispatch(testSagaAction())
  })
)(Home);

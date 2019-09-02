import { combineReducers } from "redux";

const TEST_INCREMENT_ACTION = "TEST_INCREMENT_ACTION";
const RESET_ACTION = "RESET_ACTION";

export const initialState = {
  counter: 0
};

export const testIncremenReduxAction = ({ increment }) => ({
  type: TEST_INCREMENT_ACTION,
  payload: increment
});

export const resetAction = () => ({
  type: RESET_ACTION
});

const exampleReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEST_INCREMENT_ACTION: {
      return {
        ...state,
        counter: state.counter + action.payload
      };
    }
    case RESET_ACTION: {
      return {
        ...initialState
      };
    }
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  exampleReducer
});

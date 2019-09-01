import { combineReducers } from "redux";

const TEST_SET_ACTION = "TEST_SET_ACTION";
const RESET_ACTION = "RESET_ACTION";

export const initialState = {
  counter: 0
};

export const testSetReduxAction = () => ({
  type: TEST_SET_ACTION
});

export const resetAction = () => ({
  type: RESET_ACTION
});

const exampleReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEST_SET_ACTION: {
      return {
        ...state,
        counter: state.counter + 1
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

import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { HomeContainer } from "./Home";

export function App({ store }) {
  return (
    <div className="App">
      <Provider store={store}>
        <HomeContainer />
      </Provider>
    </div>
  );
}

export default App;

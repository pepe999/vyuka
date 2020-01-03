import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";
// import * as serviceWorker from './serviceWorker';

import { Provider } from "react-redux";
// import store from './redux/store'
import { PersistGate } from "redux-persist/integration/react";

import { configureStore } from "./redux";

import createSagaManager from "./sagas";

import history from "./history";
import { Router } from "react-router-dom";

////////////////////////////////

const [store, persistor] = configureStore();

// Start all sagas with the API configured according to the environment
createSagaManager(store).start();

// Dom element in HTML where to bind our react app
const domContainer = document && document.getElementById("root");

domContainer &&
  ReactDOM.render(
    <React.Fragment>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router history={history}>
            <App />
          </Router>
        </PersistGate>
      </Provider>
    </React.Fragment>,
    domContainer
  );

// istanbul ignore next
// module caste to any because there si no need for type checking
const cModule: any = module;
if (cModule.hot) {
  // Reducer HMR
  cModule.hot.accept("./redux", () => {
    const nextReducer: any = require("./redux");
    store.replaceReducer(nextReducer.reducer);
  });

  // Saga HMR, note that when enabled, changes in ./redux will also trigger the reload
  cModule.hot.accept("./sagas", () => {
    const nextSagaManager = require("./sagas").default(store);
    nextSagaManager.cancel();
    nextSagaManager.start();
  });
}

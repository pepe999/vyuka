import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";
// import * as serviceWorker from './serviceWorker';

import { Provider } from "react-redux";
// import store from './redux/store'
import { configureStore } from "./redux";

import createSagaManager from "./sagas";

import history from "./history";
import { Router } from "react-router-dom";

////////////////////////////////

const [store] = configureStore();

// Start all sagas with the API configured according to the environment
createSagaManager(store).start();

export const render = (Component: ComponentType<any>) => {
  ReactDOM.render(
    <React.Fragment>
      <Provider store={store}>
        <Router history={history}>
          <Component />
        </Router>
      </Provider>
    </React.Fragment>,
    document.getElementById("root")
  );
};

render(App);

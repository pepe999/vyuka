// @flow
import {
  cancel,
  fork,
  // put,
  call,
  take,
  takeLatest,
  // takeEvery,
  all
  // select,
} from "redux-saga/effects";

import { Api } from "./rest/index";
import { downloadConfig } from "./rest/localApi";

import { newsActionTypes } from "../redux/news/actions";
import { fetchNewsSaga } from "./news/sagas";

// action type which cancels a running rootSaga in cancellableSaga
const CANCEL_ROOT_SAGA = "CANCEL_ROOT_SAGA";

// business logic saga entry point
export function* rootSaga(): Generator<Object, void, Object> {
  // try to fetch `config.json` from server
  const localConfig: ?JsonConfig = yield call(downloadConfigSaga);

  yield call(initializeApplication, localConfig);
}

function* initializeApplication(
  config: JsonConfig
): Generator<Object, void, Object> {
  yield all([takeLatest(newsActionTypes.FETCH_NEWS, fetchNewsSaga)]);

  yield call(Api.createApi, config);
}

function* downloadConfigSaga(): Generator<Object, ?JsonConfig, Object> {
  let result = null;
  try {
    const response = yield call(downloadConfig);
    result = response.data ? response.data : null;
  } catch (err) {
    // ...
  }
  return result;
}

// this saga is to be run by sagaMiddleware in order for HMR to work
// note that when saga HMR is enabled, changes in src/redux will also trigger the cancellation
export function* cancellableSaga(): Generator<Object, void, Object> {
  // start the root saga
  const task = yield fork(rootSaga);

  // cancelling mechanism
  yield take(CANCEL_ROOT_SAGA);
  yield cancel(task);
}

// default export, you should start and cancel the rootSaga via resulting sagaManager exclusively
// DON'T REMOVE DEFAULT EXPORT!
export default function createSagaManager(store: Object) {
  return {
    cancel: () => store.dispatch({ type: CANCEL_ROOT_SAGA }),
    start: () => store.sagaMiddleware.run(cancellableSaga)
  };
}

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

// import { nactiHlasky } from "../redux/actions/index";

import { loadGames } from "./hlasky";

// action type which cancels a running rootSaga in cancellableSaga
const CANCEL_ROOT_SAGA = "CANCEL_ROOT_SAGA";

// business logic saga entry point
export function* rootSaga(): Generator<Object, void, Object> {
  yield call(initializeApplication);

  // start saga for listening to application notifications
  // yield fork(listenForNotifications)

  // try to fetch `config.json` from server
  // const localConfig: ?JsonConfig = yield call(downloadConfigSaga)

  // if config exists -> initialize main application
  // if (localConfig) {
  //   yield call(initializeApplication, localConfig)
  // } else {
  //   // config not found -> show error notification and exit
  //   yield put(
  //     notification({
  //       type: 'error',
  //       message:
  //         'Critical error: cannot find config.json, ' +
  //         'application could not be initialized. ' +
  //         'Please, contact admin of the server.',
  //     })
  //   )
  // }
}

function* initializeApplication(): Generator<Object, void, Object> {
  yield all([yield takeLatest("NACTI_HLASKY_SAGA", loadGames)]);
}

// function* loadGames() {

//   try {
//     // data is obtained after axios call is resolved
//     let { data } = yield call(fetchApi, null);
//     // dispatch action to change redux state
//     // yield put(updateProfile(data.profile));
//      console.log("data")
//     console.log(data)
//     yield put(nactiHlasky(data.records));
//     // console.log(data)

//   } catch (e) {
//     // catch error on a bad axios call
//     // alert using an alert library
//   }
// }

// function* actionWatcher() {
//      yield takeLatest('NACTI_HLASKY_SAGA', loadGames)
// }

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

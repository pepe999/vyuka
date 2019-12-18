// @flow
// libs
import { call } from "redux-saga/effects";

import { Api } from "./index";

export function* restSaga(
  api: () => {},
  endpoint: string,
  params: ?Object,
  payload: ?Object
): Generator<Object, Object, any> {
  let response;
  try {
    // const accessToken = yield select(getAccessToken);
    // const token = accessToken !== null ? accessToken.token : null;
    response = yield call(api, endpoint, params, payload);
    // response = yield call(api, endpoint, token, params, payload);
  } catch (err) {
    // if (!err.response || err.response.status === HttpStatusCode.UNAUTHORIZED) {
    //   const refreshTokenSuccess = yield call(putAndWait, refreshToken);
    //   if (!refreshTokenSuccess.status) {
    //     yield call(putAndWait, networkError);
    //   }
    //   response = yield call(
    //     restSagaWithoutRefresh,
    //     api,
    //     endpoint,
    //     params,
    //     payload
    //   );
    // } else {
    //   yield* displayErrorNotification(err);
    //   throw err;
    // }
  }

  return response;
}

export function* getSaga(endpoint: string, params: ?Object): Saga<Object> {
  return yield call(restSaga, Api.api.getEndpoint, endpoint, params);
}

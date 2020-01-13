// @flow
import { call, put } from "redux-saga/effects";

// Sagas
import { getSaga } from "../rest/sagas";

// Actions
import { fetchNewsSuccess, fetchNewsFailure } from "../../redux/news/actions";

// Constants
import Endpoints from "../../constants/endpoints";

// Types
import type { GeneratorState } from "../types";

export function* fetchNewsSaga(action: Action): GeneratorState {
  try {
    // if (firstLoad) {
    //   yield put(setDealershipsAreLoading(true));
    //   yield call(getUserGeolocationSaga);
    // }
    // console.log("err");
    console.log("1 news");

    const response = yield call(getSaga, Endpoints.news());
    console.log("2 news");

    // yield put(fetchNewsSuccess, response.data);
    yield put(fetchNewsSuccess(response.data));

    // if (response.data.length === 1 && firstLoad) {
    //   yield put(loginAsDealer({ dealership: response.data[0] }));
    // }
  } catch (err) {
    yield put(fetchNewsFailure(err));
    // console.log(err);
  }

  //   yield put(setDealershipsAreLoading(false));
}

// @flow
export { default } from "./sagas";
export * from "./sagas";

// import { put, call, takeLatest } from "redux-saga/effects";
// import Axios from "axios";
// import { GET_FACT, ADD_FACT } from "../redux/news/actions";

// export function* getFact(action) {
//   const numberOfFacts = action.length;

//   const { data } = yield call(Axios.get, "http://localhost:8123/facts");

//   if (data) {
//     yield put({
//       type: ADD_FACT,
//       payload: data.slice(numberOfFacts, numberOfFacts + 1)
//     });
//   }
// }

// export default function* rootSaga() {
//   yield takeLatest(GET_FACT, getFact);
// }

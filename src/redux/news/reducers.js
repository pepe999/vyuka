import { secondNews, fetchNewsSuccess, fetchNewsFailure } from "./actions";
import { handleActions } from "redux-actions";

export const newsReducer = handleActions(
  {
    [secondNews]: () => ({
      news: [{ title: "druhá", subtitle: "XXXX", detail: "yyyyyyyyy" }]
    }),
    [fetchNewsSuccess]: (state, action) => ({
      news: action.payload
    }),
    [fetchNewsFailure]: atr => ({
      news: [{ title: "err", subtitle: atr, detail: "yyyyyyyyy" }]
    })
  },
  { news: [{ title: "default", subtitle: "default", detail: "default" }] }
);

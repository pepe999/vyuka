import { secondNews, fetchNewsSuccess, fetchNewsFailure } from "./actions";
import { handleActions } from "redux-actions";

export const newsReducer = handleActions(
  {
    [secondNews]: () => ({
      news: [
        { title: "druhá", subtitle: "XXXX", detail: "yyyyyyyyy", active: "A" }
      ]
    }),
    [fetchNewsSuccess]: (state, action) => ({
      news: action.payload
    }),
    [fetchNewsFailure]: atr => ({
      news: [{ title: "err", subtitle: atr, detail: "yyyyyyyyy", active: "A" }]
    })
  },
  {
    news: [
      { title: "default", subtitle: "default", detail: "default", active: "A" }
    ]
  }
);

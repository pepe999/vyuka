import { readNews, createNews, secondNews } from "./actions";
import { handleActions } from "redux-actions";

export const newsReducer = handleActions(
  {
    [readNews]: (state, action) => ({
      news: { title: "pokus", subtitle: "aaaa", detail: "bbbbbbbbb" }
    }),
    [createNews]: () => ({
      news: { title: "create", subtitle: "bbbbb", detail: "zzzzzzz" }
    }),
    [secondNews]: () => ({
      news: { title: "druhá", subtitle: "XXXX", detail: "yyyyyyyyy" }
    })
  },
  { news: { title: "default", subtitle: "default", detail: "default" } }
);

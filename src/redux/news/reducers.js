import { readNews, createNews } from "./actions";
import { handleActions } from "redux-actions";

export const newsReducer = handleActions(
  {
    [readNews]: (state, action) => ({
      news: { title: "pokus", subtitle: "aaaa", detail: "bbbbbbbbb" }
    }),
    [createNews]: () => ({
      news: { title: "pokus", subtitle: "aaaa", detail: "bbbbbbbbb" }
    })
  },
  { news: { title: "pokus", subtitle: "aaaa", detail: "bbbbbbbbb" } }
);

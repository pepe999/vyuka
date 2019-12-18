// @flow
import { createSelector } from "reselect";

export const getNewsList = state => state.news["news"];
// export const getDealershipsList = (state: State) => state.dealerships[keys.list]

export const getActiveNewsList = createSelector(
  [getNewsList],
  items => items.filter(item => item.active === "A")
  //   items => convertToSelectItems(items, () => '')
);

// @flow
import { createActions } from "redux-actions";
import { copyKeysToValues } from "../../utils/object";

export const newsActionTypes = {
  SECOND_NEWS: "",
  FETCH_NEWS: "",
  FETCH_NEWS_SUCCESS: "",
  FETCH_NEWS_FAILURE: ""
};

copyKeysToValues(newsActionTypes);

const actions = createActions(...(Object.keys(newsActionTypes): Array<string>));

export const {
  secondNews,
  fetchNews,
  fetchNewsSuccess,
  fetchNewsFailure
} = actions;

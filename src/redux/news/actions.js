// @flow
import { createActions } from "redux-actions";
import { copyKeysToValues } from "../../utils/object";

export const newsActionTypes = {
  READ_NEWS: "",
  CREATE_NEWS: ""
};

copyKeysToValues(newsActionTypes);

const actions = createActions(...(Object.keys(newsActionTypes): Array<string>));

export const { readNews, createNews } = actions;

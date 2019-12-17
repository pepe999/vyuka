export const copyKeysToValues = (object: Object): void => {
  Object.keys(object).forEach(key => {
    // eslint-disable-next-line no-param-reassign
    object[key] = key;
  });
};

// @flow
import axios from "axios";

const defaultHeaders = {
  Accept: "application/json;charset=UTF-8",
  "Cache-Control": "no-cache",
  Channel: "17", // the magic channel field, which indicates that requests are coming from lamder
  "Content-Type": "application/json;charset=UTF-8"
};

const localApi = axios.create({
  headers: defaultHeaders,
  baseURL: "./",
  timeout: 120000
});

export const downloadConfig = (): Promise<Object> =>
  localApi.get("config.json");

// @flow

// Axios library
import axios from "axios";

// Types
import type { JsonConfig } from "../types";
// import { DocumentMimeType } from "../../constants";

type Token = string | null;

const defaultHeaders = {
  Accept: "application/json;charset=UTF-8",
  "Cache-Control": "no-cache",
  Channel: "17", // the magic channel field, which indicates that requests are coming from lamder
  "Content-Type": "application/json;charset=UTF-8"
};

export class Api {
  axiosApi: Object;
  api: Object;
  headers: Object;

  constructor(headers: Object) {
    this.axiosApi = {
      defaults: {
        headers: {
          common: {}
        }
      }
    };
    this.api = {
      login: () => {},
      logout: () => {},
      refreshToken: () => {},
      getEndpoint: () => {},
      postEndpoint: () => {},
      putEndpoint: () => {},
      deleteEndpoint: () => {},
      patchEndpoint: () => {},
      unauthorizedPostEndpoint: () => {},
      unauthorizedGetEndpoint: () => {}
    };

    this.headers = headers;
  }

  createApi = (config: JsonConfig) => {
    this.axiosApi = axios.create({
      headers: this.headers,
      baseURL: config.apiUrl,
      timeout: config.timeout
    });

    this.api = {
      getEndpoint: (endpoint: string, token: Token, params: Object) => {
        this.updateAuthorizationHeader(token);
        return this.axiosApi.get(endpoint, {
          params,
          validateStatus: status => this.isValidStatus(status)
        });
      },
      postEndpoint: (endpoint: string, token: Token, payload: Object) => {
        this.updateAuthorizationHeader(token);
        return this.axiosApi.post(endpoint, payload, {
          validateStatus: status => this.isValidStatus(status)
        });
      },
      putEndpoint: (endpoint: string, token: Token, payload: Object) => {
        this.updateAuthorizationHeader(token);
        return this.axiosApi.put(endpoint, payload, {
          validateStatus: status => this.isValidStatus(status)
        });
      },
      patchEndpoint: (endpoint: string, token: Token, payload: Object) => {
        this.updateAuthorizationHeader(token);
        return this.axiosApi.patch(endpoint, payload, {
          validateStatus: status => this.isValidStatus(status)
        });
      },
      deleteEndpoint: (
        endpoint: string,
        token: Token,
        params: Object,
        payload: Object
      ) => {
        this.updateAuthorizationHeader(token);
        return this.axiosApi.delete(endpoint, {
          params,
          data: payload,
          validateStatus: status => this.isValidStatus(status)
        });
      },
      unauthorizedPostEndpoint: (endpoint: string, payload: Object) =>
        this.axiosApi.post(endpoint, payload),
      unauthorizedGetEndpoint: (endpoint: string, payload: Object) =>
        this.axiosApi.get(endpoint, payload)
      //   uploadFile: (endpoint: string, token: Token, payload: Object) => {
      //     this.updateAuthorizationHeader(token);
      //     return this.axiosApi.post(
      //       endpoint,
      //       payload,
      //       {
      //         headers: {
      //           "Content-Type": DocumentMimeType.OCTET
      //         },
      //         transformRequest: [data => data.other]
      //       },
      //       {
      //         validateStatus: status => this.isValidStatus(status)
      //       }
      //     );
      //   },
      //   downloadOctetFile: (endpoint: string, token: Token, params: Object) => {
      //     this.updateAuthorizationHeader(token);
      //     return this.downloadFile(endpoint, DocumentMimeType.OCTET, params);
      //   },
      //   downloadPdfFile: (endpoint: string, token: Token, params: Object) => {
      //     this.updateAuthorizationHeader(token);
      //     return this.downloadFile(endpoint, DocumentMimeType.PDF, params);
      //   },
      //   downloadZipFile: (endpoint: string, token: Token, params: Object) => {
      //     this.updateAuthorizationHeader(token);
      //     return this.downloadFile(endpoint, DocumentMimeType.ZIP, params);
      //   }
    };
  };

  downloadFile = (endpoint: string, mimetype: string, params: Object) =>
    this.axiosApi.get(
      endpoint,
      {
        params,
        headers: {
          Accept: mimetype
        },
        transformResponse: [data => data],
        responseType: "arraybuffer"
      },
      {
        validateStatus: status => this.isValidStatus(status)
      }
    );

  updateAuthorizationHeader = (token: Token): void => {
    if (token != null) {
      this.axiosApi.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else if (this.axiosApi.defaults.headers.common.Authorization) {
      delete this.axiosApi.defaults.headers.common.Authorization;
    }
  };

  // only Success HTTP codes are considered valid (i.e. 200, 201, ... 2xx)
  isValidStatus = (status: number) => status >= 200 && status <= 299;
}

// factory for producing instance of `Api` class
export const apiFactory = (headers: Object) => new Api(headers);

// singleton instance of `Api` class
export const apiSingleton: Api = apiFactory(defaultHeaders);

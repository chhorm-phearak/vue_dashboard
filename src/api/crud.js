import axios from "axios";
import { getAuthorization } from "../plugins/authentication";

export default {
  async List(url, params) {
    return await axios({
      method: "GET",
      url: url,
      data: params,
      headers: {
        Authorization: getAuthorization(),
      },
    });
  },
  async Read(url, params) {
    return await axios({
      method: "GET",
      url: url,
      data: params,
      headers: {
        Authorization: getAuthorization(),
      },
    });
  },
  async Get(url, params) {
    return await axios({
      method: "GET",
      url: url,
      data: params,
    });
  },
  async Create(url, params) {
    return await axios({
      method: "POST",
      url: url,
      data: params,
      headers: {
        Authorization: getAuthorization(),
      },
    });
  },
  async Update(url, params) {
    return await axios({
      method: "PUT",
      url: url,
      data: params,
      headers: {
        Authorization: getAuthorization(),
      },
    });
  },
  async Delete(url, params) {
    return await axios({
      method: "DELETE",
      url: url,
      params: params,
      headers: {
        Authorization: getAuthorization(),
      },
    });
  },
};

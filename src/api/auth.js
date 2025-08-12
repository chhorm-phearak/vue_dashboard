import axios from "axios";
import { getAuthorization } from "../plugins/authentication";

export default {
  async LogIn(url, params) {
    return await axios({
      method: "post",
      url: url,
      data: params,
    });
  },
  async LogOut(url) {
    return await axios({
      method: "post",
      url: url,
      headers: {
        Authorization: getAuthorization(),
      },
    });
  },
  async ReadProfile(url) {
    return await axios({
      method: "get",
      url: url,
      data: params,
      headers: {
        Authorization: getAuthorization(),
      },
    });
  },
  async UpdateProfile(url) {
    return await axios({
      method: "post",
      url: url,
      data: params,
      headers: {
        Authorization: getAuthorization(),
      },
    });
  },
};

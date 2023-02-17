import _axios from "axios";

const axios = _axios.create({
  baseURL: "http://ec2-3-35-173-41.ap-northeast-2.compute.amazonaws.com:3000",
});

export default axios;

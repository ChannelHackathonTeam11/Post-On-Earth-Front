import _axios from "axios";

const axios = _axios.create({
  baseURL: "ec2-3-35-173-41.ap-northeast-2.compute.amazonaws.com:3000",
  withCredentials: false,
  // allow cors
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

export default axios;

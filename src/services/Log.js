"use client";

import endpoints from "../api/endpoints";
import { axiosClient } from "../api/axiosClient";

const UserLogs = ({page, query}) => {
  return axiosClient()
    .get(`${endpoints.log.USER_LOG}?page=${page}&query=${query}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}


export default {
  UserLogs
};


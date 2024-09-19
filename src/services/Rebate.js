"use client";

import endpoints from "../api/endpoints";
import { axiosClient } from "../api/axiosClient";

const RebateByTests = ({data_per_page=20,page=1}) => {
  return axiosClient()
    .get(`${endpoints.rebate.REBATE_BY_TESTS}?data_per_page=${data_per_page}&page=${page}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const RebateByPayouts = ({data_per_page=20,page=1}) => {
  return axiosClient()
    .get(`${endpoints.rebate.REBATE_BY_TESTS}?data_per_page=${data_per_page}&page=${page}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}


export default {
  RebateByTests, RebateByPayouts
};
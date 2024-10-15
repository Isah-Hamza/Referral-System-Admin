"use client";

import endpoints from "../api/endpoints";
import { axiosClient } from "../api/axiosClient";

const RefStats = () => {
  return axiosClient()
    .get(`${endpoints.report.REFERRAL_STATS}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}


export default {
  RefStats,
};


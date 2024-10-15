"use client";

import endpoints from "../api/endpoints";
import { axiosClient } from "../api/axiosClient";

const RefStats = () => {
  return axiosClient()
    .get(`${endpoints.report.REFERRAL_STATS}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const AppointmentStats = () => {
  return axiosClient()
    .get(`${endpoints.report.APPOINTMENT_STATS}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const AppointmentTrends = () => {
  return axiosClient()
    .get(`${endpoints.report.APPOINTMENT_TRENDS}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const ComparativeAnalysis = () => {
  return axiosClient()
    .get(`${endpoints.report.COMPARATIVE_ANALYSIS}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}


export default {
  RefStats, ComparativeAnalysis, AppointmentStats, AppointmentTrends
};


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

const NoShowAnalysis = () => {
  return axiosClient()
    .get(`${endpoints.report.NO_SHOW_ANALYSIS}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const NoShowRate = () => {
  return axiosClient()
    .get(`${endpoints.report.NO_SHOW_RATE}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const RebateStats = () => {
  return axiosClient()
    .get(`${endpoints.report.REBATE_STATS}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const RebateTopEarners = () => {
  return axiosClient()
    .get(`${endpoints.report.REBATE_TOP_TEN_EARNERS}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const RebateEarningChart = () => {
  return axiosClient()
    .get(`${endpoints.report.REBATE_EARNINGS}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const TestStats = () => {
  return axiosClient()
    .get(`${endpoints.report.TEST_STATS}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const TestCompletion = () => {
  return axiosClient()
    .get(`${endpoints.report.TEST_COMPLETION}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

export default {
  RefStats, ComparativeAnalysis, AppointmentStats, AppointmentTrends,
  NoShowRate, NoShowAnalysis, RebateStats, RebateTopEarners, RebateEarningChart,
  TestStats, TestCompletion,
};

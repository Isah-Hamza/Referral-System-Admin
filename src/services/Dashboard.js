"use client";

import endpoints from "../api/endpoints";
import { axiosClient } from "../api/axiosClient";

const GetDashboardStats = (admin_id) => {
  return axiosClient()
  .get(`${endpoints.dashbaord.DASHBOARD_STATS}?admin_id=${admin_id}`)
  .then((res) => res)
  .catch((error) => Promise.reject(error));
}

const GetReferralStats = (admin_id) => {
  return axiosClient()
  .get(`${endpoints.dashbaord.REFERRAL_STATS}?admin_id=${admin_id}`)
  .then((res) => res)
  .catch((error) => Promise.reject(error));
}

const GetTestStats = (admin_id) => {
  return axiosClient()
  .get(`${endpoints.dashbaord.TEST_STATS}?admin_id=${admin_id}`)
  .then((res) => res)
  .catch((error) => Promise.reject(error));
}

const GetActivities = (doctor_id) => {
  return axiosClient()
    .get(`${endpoints.dashbaord.ACTIVITIES}?doctor_id=${doctor_id}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const GetRebateEarnings = (doctor_id) => {
  return axiosClient()
    .get(`${endpoints.dashbaord.REBATE_EARNINGS}?doctor_id=${doctor_id}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const GetDashboardDetails = (doctor_id) => {
  return axiosClient()
    .get(`${endpoints.dashbaord.DASHBOARD_DETAILS}?doctor_id=${doctor_id}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const GetResultDashboardDetails = () => {
  return axiosClient()
    .get(`${endpoints.dashbaord.RESULT_DASHBOARD_DETAILS}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const GetRebateChart = (admin_id) => {
  return axiosClient()
    .get(`${endpoints.dashbaord.REBATE_CHART}?admin_id=${admin_id}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const GetRebateChartWeekly = (admin_id) => {
  return axiosClient()
    .get(`${endpoints.dashbaord.REBATE_CHART_WEEKLY}?admin_id=${admin_id}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const GetAppointmentStats = (admin_id) => {
  return axiosClient()
    .get(`${endpoints.dashbaord.APPOINTMENT_STATS}?admin_id=${admin_id}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const GetCalendarAppointments = ({admin_id,date}) => {
  return axiosClient()
    .get(`${endpoints.dashbaord.CALENDAR_APPOINTMENT}?admin_id=${admin_id}&date=${date}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const GetNotifications = () => {
  return axiosClient()
    .get(`${endpoints.dashbaord.ACTIVITIES}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}


export default {
  GetDashboardDetails, GetRebateEarnings, GetActivities, GetDashboardStats, GetReferralStats,
  GetRebateChart, GetAppointmentStats, GetNotifications, GetCalendarAppointments, GetTestStats,
  GetRebateChartWeekly,GetResultDashboardDetails
};


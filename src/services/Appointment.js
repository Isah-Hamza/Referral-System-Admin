"use client";

import endpoints from "../api/endpoints";
import { axiosClient } from "../api/axiosClient";

const GetUpcomingAppointments = ({data_per_page=20,page=1}) => {
  return axiosClient()
    .get(`${endpoints.appointments.UPCOMING_APPOINTMENTS}?data_per_page=${data_per_page}&page=${page}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}


const GetAllAppointments = ({data_per_page=20,page=1}) => {
  return axiosClient()
    .get(`${endpoints.appointments.ALL_APPOINTMENTS}?data_per_page=${data_per_page}&page=${page}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const GetAppointment = (id) => {
  return axiosClient()
    .get(`${endpoints.appointments.APPOINTMENTS}?appointment_id=${id}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const CheckIn = (data) => {
  return axiosClient()
    .put(`${endpoints.appointments.CHECKIN}`, data)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const FollowUp = (data) => {
  return axiosClient()
    .put(`${endpoints.appointments.FOLLOW_UP}`, data)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const Reschedule = (data) => {
  return axiosClient()
    .post(`${endpoints.appointments.RESCHEDULE}`, data)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const MakePayment = (data) => {
  return axiosClient()
    .post(`${endpoints.appointments.MAKE_PAYMENT}`, data)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}


const GetTimeSlots = (date) => {
  return axiosClient()
    .get(`${endpoints.appointments.TIME_SLOTS}?date=${date}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const missAppoitment = (payload) => {
  return axiosClient()
    .put(`${endpoints.appointments.MISS_APPOINTMENT}`,payload)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}



export default {
  GetUpcomingAppointments, GetAllAppointments, GetAppointment, CheckIn, FollowUp, GetTimeSlots, Reschedule,
  missAppoitment, MakePayment
};


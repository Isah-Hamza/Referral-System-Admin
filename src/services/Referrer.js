"use client";

import endpoints from "../api/endpoints";
import { axiosClient } from "../api/axiosClient";

const GetActiveReferrers = ({data_per_page=20,page=1}) => {
  return axiosClient()
    .get(`${endpoints.referrers.GET_ACTIVE_REFERRERS}?data_per_page=${data_per_page}&page=${page}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const GetInactiveReferrers = ({data_per_page=20,page=1}) => {
  return axiosClient()
    .get(`${endpoints.referrers.GET_INACTIVE_REFERRERS}?data_per_page=${data_per_page}&page=${page}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const GetReferrerDetails = (doctor_id) => {
  return axiosClient()
    .get(`${endpoints.referrers.GET_REFERRER_DETAILS}?doctor_id=${doctor_id}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const ActivateReferrer = (data) => {
  return axiosClient()
    .put(`${endpoints.referrers.ACTIVATE_REFERRER}`,data)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const DeactivateReferrer = (data) => {
  return axiosClient()
    .put(`${endpoints.referrers.DEACTIVATE_REFERRER}`,data)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}


export default {
  GetActiveReferrers, GetInactiveReferrers, GetReferrerDetails, ActivateReferrer, DeactivateReferrer
};


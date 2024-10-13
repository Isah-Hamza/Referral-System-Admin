"use client";

import endpoints from "../api/endpoints";
import { axiosClient } from "../api/axiosClient";

const GetProfile = (admin_id) => {
  return axiosClient()
    .get(`${endpoints.settings.ADMIN_PROFILE}?admin_id=${admin_id}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const GetDepartments = () => {
  return axiosClient()
    .get(`${endpoints.settings.GET_DEPARTMENTS}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const UpdateProfile = (data) => {
  return axiosClient()
    .post(`${endpoints.settings.UPDATE_PROFILE}`, data)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const UpdateBank = (data) => {
  return axiosClient()
    .post(`${endpoints.settings.UPDATE_BANK}`, data)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const UpdatePassword = (data) => {
  return axiosClient()
    .post(`${endpoints.settings.UPDATE_PASSWORD}`, data)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}


export default {
  GetProfile, UpdateProfile, GetDepartments,UpdateBank,UpdatePassword
};


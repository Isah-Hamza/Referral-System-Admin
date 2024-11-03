"use client";

import endpoints from "../api/endpoints";
import { axiosClient } from "../api/axiosClient";

const GetAwaitingResults = ({data_per_page=20,page=1}) => {
  return axiosClient()
    .get(`${endpoints.result.AWAITING_RESULTS}?data_per_page=${data_per_page}&page=${page}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const SearchAwaitingResults = ({query="",data_per_page=20,page=1}) => {
  return axiosClient()
    .get(`${endpoints.result.SEARCH_AWAITING_RESULTS}?query=${query}&data_per_page=${data_per_page}&page=${page}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const SearchUploadedResults = ({query="",data_per_page=20,page=1}) => {
  return axiosClient()
    .get(`${endpoints.result.SEARCH_UPLOADED_RESULTS}?query=${query}&data_per_page=${data_per_page}&page=${page}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const GetUploadedResults = ({data_per_page=20,page=1}) => {
  return axiosClient()
    .get(`${endpoints.result.UPLOADED_RESULTS}?data_per_page=${data_per_page}&page=${page}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const GetResult = (result_id) => {
  return axiosClient()
    .get(`${endpoints.result.RESULT_DETAILS}?result_id=${result_id}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const UploadResult = (payload) => {
  return axiosClient()
    .post(`${endpoints.result.UPLOAD_RESULT}`, payload)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

export default {
  GetAwaitingResults, GetUploadedResults, GetResult, UploadResult, SearchAwaitingResults, SearchUploadedResults
};
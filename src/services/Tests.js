"use client";

import endpoints from "../api/endpoints";
import { axiosClient } from "../api/axiosClient";

const GetPendingTests = ({data_per_page=20,page=1}) => {
  return axiosClient()
    .get(`${endpoints.tests.PENDING_TESTS}?data_per_page=${data_per_page}&page=${page}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const GetAllTests = ({data_per_page=20,page=1}) => {
  return axiosClient()
    .get(`${endpoints.tests.TESTS}?data_per_page=${data_per_page}&page=${page}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const TestDetail = (lab_id) => {
  return axiosClient()
    .get(`${endpoints.tests.TEST_DETAIL}?lab_id=${lab_id}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const MarkComplete = (payload) => {
  return axiosClient()
    .post(`${endpoints.tests.MARK_TEST_COMPLETE}`, payload)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

export default {
  GetPendingTests,GetAllTests, MarkComplete, TestDetail
};


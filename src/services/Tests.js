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

const Categories = () => {
  return axiosClient()
    .get(`${endpoints.tests.CATEGORIES}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const Departments = () => {
  return axiosClient()
    .get(`${endpoints.tests.DEPARTMENTS}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const CategoryTests = (cat_id) => {
  return axiosClient()
    .get(`${endpoints.tests.CATEGORY_TESTS}/${cat_id}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const MarkComplete = (payload) => {
  return axiosClient()
    .put(`${endpoints.tests.MARK_TEST_COMPLETE}`, payload)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const CreateCategory = (payload) => {
  return axiosClient()
    .post(`${endpoints.tests.CREATE_CATEGORIES}`, payload)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const UpdateCategory = (payload) => {
  return axiosClient()
    .put(`${endpoints.tests.UPDATE_CATEGORIES}`, payload)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const UpdateTest = (payload) => {
  return axiosClient()
    .put(`${endpoints.tests.UPDATE_TEST}`, payload)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const DisableTest = (cat_id) => {
  return axiosClient()
    .put(`${endpoints.tests.UPDATE_TEST}/${cat_id}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const EnableTest = (cat_id) => {
  return axiosClient()
    .put(`${endpoints.tests.UPDATE_TEST}/${cat_id}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

export default {
  GetPendingTests,GetAllTests, MarkComplete, TestDetail, CreateCategory, Categories,Departments,
  UpdateCategory, UpdateTest, DisableTest, EnableTest, CategoryTests
};
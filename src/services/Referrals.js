"use client";

import endpoints from "../api/endpoints";
import { axiosClient } from "../api/axiosClient";

const GetReferrals = ({data_per_page=20,page=1}) => {
  return axiosClient()
    .get(`${endpoints.referrals.GET_REFERRALS}?data_per_page=${data_per_page}&page=${page}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const GetReferral = (ref_id) => {
  return axiosClient()
    .get(`${endpoints.referrals.GET_REFERRALS}?referral_id=${ref_id}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

// const CreateReferrer = (data) => {
//   return axiosClient()
//     .post(`${endpoints.referrals.CREATE_REFERRAL}`, data)
//     .then((res) => res)
//     .catch((error) => Promise.reject(error));
// }

//   const GetTestCategories = () => {
//     return axiosClient()
//       .get(`${endpoints.referrals.TEST_CATEGORIES}`)
//       .then((res) => res)
//       .catch((error) => Promise.reject(error));
//   }

//   const GetTests = (cat_id) => {
//     return axiosClient()
//       .get(`${endpoints.referrals.CATEGORY_TESTS}/${cat_id}`)
//       .then((res) => res)
//       .catch((error) => Promise.reject(error));
//   }



export default {
  GetReferrals,  GetReferral,
  // CreateReferrer, GetTestCategories, GetTestCategories, GetTests
};


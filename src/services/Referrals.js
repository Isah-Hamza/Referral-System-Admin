"use client";

import endpoints from "../api/endpoints";
import { axiosClient } from "../api/axiosClient";

const GetReferrals = ({data_per_page=20,page=1}) => {
  return axiosClient()
    .get(`${endpoints.referrals.GET_REFERRALS}?data_per_page=${data_per_page}&page=${page}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const SearchReferrals = ({data_per_page=20,page=1,query}) => {
  return axiosClient()
    .get(`${endpoints.referrals.SEARCH_REFERRALS}?query=${query}&data_per_page=${data_per_page}&page=${page}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}

const GetReferral = (ref_id) => {
  return axiosClient()
    .get(`${endpoints.referrals.GET_REFERRAL}?referral_id=${ref_id}`)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}



export default {
  GetReferrals,  GetReferral, SearchReferrals
  // CreateReferrer, GetTestCategories, GetTestCategories, GetTests
};


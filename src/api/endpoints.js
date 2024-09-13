const endpoints = {
  auth: {
    LOGIN:'admin/login',
    REGISTER:'register',
    SETUP_PROFILE:'set-up-profile',
    FORGOT_PASSWORD:'admin/forgot-password',
    VERIFY_OTP:'admin/verify-otp',
    CHANGE_PASSWORD:'admin/change-password',
  },
  dashbaord:{
    ACTIVITIES:'activities',
    REBATE_EARNINGS:'rebate-earning',
    DASHBOARD_DETAILS:'dashboard-details',
   
    DASHBOARD_STATS:'admin/dashboard-stats',
    REFERRAL_STATS:'admin/referral-stats',
    CALENDAR_APPOINTMENT:'admin/calendar-appointment',
    REBATE_CHART:'admin/rebate-chart/month',
    APPOINTMENT_STATS:'admin/appointments-stats',
    ACTIVITIES:'/admin/all-notifications',
  },
  referrals:{
    GET_REFERRALS:'/admin/all-referrals',
    GET_REFERRAL:'admin/get-referrals',
    CREATE_REFERRAL:'add-referral',
    TEST_CATEGORIES:'category/all',
    CATEGORY_TESTS:'medical-test/view'
  },
  appointments:{
    UPCOMING_APPOINTMENTS:'/admin/appointments/upcoming',
    ALL_APPOINTMENTS:'admin/appointments/all',
    APPOINTMENTS:'/admin/appointments',
    CHECKIN:'/admin/appointments/check-in',
    FOLLOW_UP:'/admin/appointments/follow-up',
    RESCHEDULE:'/admin/appointments/reschedule',
    TIME_SLOTS:'patient/appointments/available-slots',
    MISS_APPOINTMENT:'/admin/appointments/cancel',
  },
  tests:{
    TESTS:'/admin/test/all',
    PENDING_TESTS:'/admin/test/pending',
    MARK_TEST_COMPLETE:'/admin/test/mark-complete',
    TEST_DETAIL:'/admin/test/details',
    CATEGORIES:'/category/all',
    CREATE_CATEGORIES:'/category/add',
    UPDATE_CATEGORIES:'/category/update',
    DEPARTMENTS:'/department/all',
    CATEGORY_TESTS:'/medical-test/view',
    UPDATE_TEST:'/medical-test/update',
    DISABLE_TEST:'/medical-test/disable',
    ENABLE_TEST:'/medical-test/enable',

  },
  result:{
    AWAITING_RESULTS:'/admin/result/awaiting',
    UPLOADED_RESULTS:'/admin/result/uploaded'
  }
  // payment:{
  //   ALL_TRANSACTIONS:'all-transactions'
  // },
  // profile:{
  //   GET_PROFILE:'doctor/profile-details',
  //   UPDATE_PASSWORD:'doctor/password-update',
  //   UPDATE_ACCOUNT:'doctor/account-update',
  //   UPDATE_PROFILE:'doctor/profile-update',
  // },
  // patient:{
  //   MANUAL_BOOKIGN:'patient/manual-booking',
  //   ALl_DOCTORS:'patient/all-doctors',
  //   TIME_SLOTS:'patient/appointments/available-slots',
  //   BOOK_APPOINTMENT:'patient/book-appointment',
  //   INITIATE_PAYMENT:'payments/initialize',
  //   PATIENT_DETAILS:'patient/details',
  //   PATIENT_ALL_DETAILS:'patient/all-details',
  //   CONFIRM_DETAILS:'patient/confirm-details',
  // }
};

export default endpoints;

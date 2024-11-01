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
    REBATE_CHART_WEEKLY:'/admin/rebate-chart/week',
    APPOINTMENT_STATS:'admin/appointments-stats',
    ACTIVITIES:'/admin/all-notifications',
    TEST_STATS:'/admin/department-data',
  },
  referrals:{
    GET_REFERRALS:'/admin/all-referrals',
    SEARCH_REFERRALS:'/admin/search-referrals',
    GET_REFERRAL:'admin/get-referrals',
    CREATE_REFERRAL:'add-referral',
    TEST_CATEGORIES:'category/all',
    CATEGORY_TESTS:'medical-test/view',
  },
  referrers:{
    GET_ACTIVE_REFERRERS:'/admin/all-active-referrers',
    GET_INACTIVE_REFERRERS:'/admin/all-inactive-referrers',
    GET_REFERRER_DETAILS:'/admin/referrer-details',
    DEACTIVATE_REFERRER:'/admin/deactivate-referrer',
    ACTIVATE_REFERRER:'/admin/activate-referrer',
    GET_REBATE_HISTORY:'/admin/rebate-history',
    GET_REFERRAL_HISTORY:'/admin/referral-history',
  },
  appointments:{
    UPCOMING_APPOINTMENTS:'/admin/appointments/upcoming',
    SEARCH_UPCOMING_APPOINTMENTS:'/admin/appointments/search-upcoming',
    ALL_APPOINTMENTS:'admin/appointments/all',
    SEARCH_ALL_APPOINTMENTS:'admin/appointments/search-all',
    APPOINTMENTS:'/admin/appointments',
    CHECKIN:'/admin/appointments/check-in',
    FOLLOW_UP:'/admin/appointments/follow-up',
    RESCHEDULE:'/admin/appointments/reschedule',
    TIME_SLOTS:'patient/appointments/available-slots',
    MISS_APPOINTMENT:'/admin/appointments/cancel',
    MAKE_PAYMENT:'/admin/appointments/make-payment',
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
    UPLOADED_RESULTS:'/admin/result/uploaded',
    RESULT_DETAILS:'/admin/result/details',
    UPLOAD_RESULT:'/admin/result/upload',
  },
  rebate:{
    REBATE_BY_TESTS:'/admin/rebate-by-test', 
    REBATE_BY_PAYOUTS:'/admin/rebate-by-payout', 
    REBATE_DETAILS:'/admin/rebate-details', 
  },
 settings:{
   ADMIN_PROFILE:'/admin/profile',
   UPDATE_PROFILE:'/admin/profile-update',
   UPDATE_PASSWORD:'/admin/reset-password',
   GET_DEPARTMENTS:'/department/all',
   UPDATE_DEPARTMENT:'/department/update',
   APPOINTMENT_SCHEDULE:'/admin/appointment-schedule',
   UPDATE_SCHEDULE:'/admin/update-schedule',
   GET_SUBADMINS:'/admin/all-admins',
   INVITE_SUBADMIN:'/admin/invite-subadmin',
   CHANGE_ROLE:'/admin/change-role',
   REMOVE_SUBADMIN:'/admin/delete-subadmin',


 },
 report:{
   REFERRAL_STATS:'/report/referral',
   COMPARATIVE_ANALYSIS:'/report/comparative-analysis',
   APPOINTMENT_STATS: '/report/appointment',
   REBATE_STATS: '/report/rebate-data',
   REBATE_EARNINGS: '/admin/rebate/year-details',
   REBATE_TOP_TEN_EARNERS: '/report/top-ten-earners',
   APPOINTMENT_TRENDS: '/report/appointment-trends',
   NO_SHOW_RATE: '/report/no-show-rate',
   NO_SHOW_ANALYSIS: '/report/no-show-analysis',
   TEST_STATS:'/report/test-details',
   TEST_COMPLETION:'/report/test-completion',
 },
 log:{
   USER_LOG:'/admin/user-logs', 
 }
};

export default endpoints;

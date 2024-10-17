import React, { useState } from 'react'
import logo from '../../assets/images/logo.svg';
import { AiOutlineHome } from "react-icons/ai";
import avatar from '../../assets/images/avatar.svg';
import { IoLogOut } from "react-icons/io5";
import { FaEye } from 'react-icons/fa6';
import { BsArrowDownRight, BsArrowRight, BsArrowUpRight, BsArrowUpRightSquare } from 'react-icons/bs';
import { PiEyeClosedBold } from "react-icons/pi";
import note from '../../assets/images/note.svg';
import BarChart from '../../components/Chart/BarChart';
import PieChart from '../../components/Chart/PieChart';
import design from '../../assets/images/dashboard-design.png'
import Button from '../../components/Button'

import stat1 from '../../assets/images/stat1.svg';
import stat2 from '../../assets/images/stat2.svg';
import stat3 from '../../assets/images/stat3.svg';

import bank from '../../assets/images/Bank.svg';
import test from '../../assets/images/Test.svg';
import earn from '../../assets/images/Earn.svg';

import refer from '../../assets/images/refer_and_earn.svg';
import { useNavigate } from 'react-router-dom';
import { MdArrowForward } from 'react-icons/md';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useQuery } from 'react-query';
import DashboardServices from '../../services/Dashboard';
import { ConvertToNaira } from '../../utils/Helper';
import PageLoading from '../../Loader/PageLoading'
import moment from 'moment';

const Dashboard = () => {

    const [dashboardStats, setDashboardStats] = useState(null);
    const [referralStats, setReferralStats] = useState(null);
    const [rebateChart, setRebateChart] = useState(null);
    const [appointmentStats,setAppointmentStats] = useState(null);
    const [date, setDate] = useState(() => moment().format('y-MM-DD'));
    const [todayBooking, setTodayBooking] = useState([]);
    const [testStats, setTestStats] = useState(null);

    const navigate = useNavigate('');

        const department = JSON.parse(window.localStorage.getItem('referrer-admin'))?.department?.name;
        // const department = 'Customer Service Unit';
        // const department = 'Result Unit';
        // const department = 'Test Unit';
        // const department = 'Rebate Unit';


    const admin_id = window.localStorage.getItem('referrer-admin-id');
    
    const { isLoading:loadingDashboardStats }  = useQuery('dashboard-stats', () => DashboardServices.GetDashboardStats(admin_id), {
    onSuccess:res => {
        setDashboardStats(res.data);
        console.log(res.data)
        }
    });
    
    const { isLoading:loadingReferralStats }  = useQuery('referral-stats', () => DashboardServices.GetReferralStats(admin_id), {
    onSuccess:res => {
        setReferralStats(res.data);
        }
    });
    
    const { isLoading:loadingTestStats }  = useQuery('test-stats', () => DashboardServices.GetTestStats(admin_id), {
    onSuccess:res => {
        setTestStats(res.data);
        }
    });
    
    const { isLoading:loadingRebateChart }  = useQuery('rebate-chart', () => DashboardServices.GetRebateChart(admin_id), {
    onSuccess:res => {
        setRebateChart(res.data);
        }
    });
    
    const { isLoading:loadingAppointmentStats }  = useQuery('appointment-stats', () => DashboardServices.GetAppointmentStats(admin_id), {
    onSuccess:res => {
        setAppointmentStats(res.data);
        }
    });
    
    const { isLoading:loadingCalendarAppointments }  = useQuery([date, 'calendar-appointments'], () => DashboardServices.GetCalendarAppointments({admin_id,date}), {
    onSuccess:res => {
        setTodayBooking(res.data.appointments);
        }
    });


    if(loadingDashboardStats || loadingReferralStats || loadingRebateChart || loadingAppointmentStats ){
        return <PageLoading />
    }

  return (
    <>
        <div className="mt-2">
            { department == 'Administration' ? <div className="grid grid-cols-4 gap-5">
                <div className="bg-white rounded-lg p-5 border">
                    <p>Total Referrals</p>
                    <p className='font-semibold text-xl my-3'>{dashboardStats?.total_referrals}</p>
                    <div className="flex items-center justify-between gap-5 mt-5">
                        <p className='bg-[#C9E6FF] px-3 text-sm py-0.5 rounded-2xl' >+21</p>
                        <button className="text-primary flex items-center gap-1 font-semibold pl-7 text-sm">
                            <span>View All</span>
                            <MdArrowForward />
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-5 border">
                    <p>Total Referrers</p>
                    <p className='font-semibold text-xl my-3'>{dashboardStats?.total_referrers}</p>
                    <div className="flex items-center justify-between gap-5 mt-5">
                        <p className='bg-[#C9E6FF] px-3 text-sm py-0.5 rounded-2xl' >+61</p>
                        <button className="text-primary flex items-center gap-1 font-semibold pl-7 text-sm">
                            <span>View All</span>
                            <MdArrowForward />
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-5 border">
                    <p>Monthly Rebate Earned</p>
                    <p className='font-semibold text-xl my-3'>{ ConvertToNaira(Number(dashboardStats?.month_earning?.total_earning_month))}</p>
                    <div className="flex text-sm items-center gap-1 mt-5">
                        {
                          dashboardStats?.month_earning?.option == 'increase' ?
                              <div className="text-green-500 font-medium flex items-center gap-1">
                                <BsArrowUpRight color='' />
                                <span className='' >{ dashboardStats?.month_earning?.percentage_change}%</span>
                            </div> :
                              <div className="text-red-500 font-medium flex items-center gap-1">
                                <BsArrowDownRight color='' />
                                <span className='' >{ dashboardStats?.month_earning?.percentage_change}%</span>
                            </div> 
                        }
                        <span>vs last month</span>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-5 border">
                    <p>Total Payouts Settled</p>
                    <p className='font-semibold text-xl my-3'>₦{dashboardStats?.total_payout_settled}</p>
                    <div className="flex text-sm items-center gap-1 mt-5">
                        <span>Payment</span>
                        <div className="text-green-500 font-medium flex items-center gap-1">
                            <span className='' >Every Friday</span>
                        </div>
                    </div>
                </div>
            </div> : null}
            { department == 'Rebate Unit' ? <div className="grid grid-cols-2 gap-5">
                <div className="bg-white rounded-lg p-5 border">
                    <p>Monthly Rebate Earned</p>
                    <p className='font-semibold text-xl my-3'>{ ConvertToNaira(Number(dashboardStats?.month_earning?.total_earning_month))}</p>
                    <div className="flex text-sm items-center gap-1 mt-5">
                        {
                          dashboardStats?.month_earning?.option == 'increase' ?
                              <div className="text-green-500 font-medium flex items-center gap-1">
                                <BsArrowUpRight color='' />
                                <span className='' >{ dashboardStats?.month_earning?.percentage_change}%</span>
                            </div> :
                              <div className="text-red-500 font-medium flex items-center gap-1">
                                <BsArrowDownRight color='' />
                                <span className='' >{ dashboardStats?.month_earning?.percentage_change}%</span>
                            </div> 
                        }
                        <span>vs last month</span>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-5 border">
                    <p>Total Payouts Settled</p>
                    <p className='font-semibold text-xl my-3'>₦{dashboardStats?.total_payout_settled}</p>
                    <div className="flex text-sm items-center gap-1 mt-5">
                        <span>Payment</span>
                        <div className="text-green-500 font-medium flex items-center gap-1">
                            <span className='' >Every Friday</span>
                        </div>
                    </div>
                </div>
            </div> : null}
            <div className="flex gap-5 mt-5">
                { department !== 'Rebate Unit' ? <div className="bg-white min-w-[35%] h-full p-5 rounded-lg border">
                    <div className="flex items-center justify-between pb-3 border-b">
                        {
                         (department == 'Customer Service Unit' || department == 'Administration') ?
                         <p className='font-semibold' >Referrals Stats</p> : 
                          (department == 'Endoscopy' || department == 'Laboratory Services' || department == 'Radiology' || department == 'Result Unit') ? 
                          <p className='font-semibold' >Daily Test Analysis</p> : null
                       }
                    </div>
                    <div className="mt-3">
                       {
                         (department == 'Customer Service Unit' || department == 'Administration') ?
                          <p className='text-sm' >Analysis of pending & completed referrals</p> : 
                         ( department == 'Endoscopy' || department == 'Laboratory Services' || department == 'Radiology' || department == 'Result Unit' ) ? 
                          <p className='text-sm' >Analysis of daily pending & completed tests </p> : null
                       }
                        <div className="flex flex-col">
                            <div className=" -ml-10 h-[250px]">
                                <PieChart 
                                    completed = {(department == 'Endoscopy' || department == 'Laboratory Services' || department == 'Radiology' || department == 'Result Unit') ? testStats?.percentage?.completed_tests : referralStats?.completed} 
                                    pending= { (department == 'Endoscopy' || department == 'Laboratory Services' || department == 'Radiology' || department == 'Result Unit' ) ? testStats?.percentage?.pending_tests : referralStats?.pending} />
                            </div>
                            <div className="flex justify-center items-center text-center gap-10">
                                <div className="">
                                    <div className="text-sm flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-[#00C49F]"></div>
                                        <span>Completed</span>
                                    </div>
                                    <p className='pl-'>{ (department == 'Endoscopy' || department == 'Laboratory Services' || department == 'Radiology' || department == 'Result Unit') ? testStats?.percentage?.completed_tests : referralStats?.completed}</p>
                                </div>
                                <div className="">
                                    <div className="text-sm flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-light_blue"></div>
                                        <span>Pending</span>
                                    </div>
                                    <p className='pl-'>{(department == 'Endoscopy' || department == 'Laboratory Services' || department == 'Radiology' || department == 'Result Unit') ? testStats?.percentage?.pending_tests : referralStats?.pending}</p>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div> : null}
              {(department == 'Administration' || department == 'Rebate Unit') ?  <div className="flex-1 rounded-lg border border-custom_gray bg-white">
                    <div className="flex items-center justify-between p-3 border-b">
                        <p className='font-semibold' >Rebate Earning</p>
                        <div className="flex items-center bg-custom_gray p-1 px-1.5 rounded-3xl">
                            {
                                ['Monthly','Weekly','Daily'].map((item,idx) => (
                                    <button className={`rounded-3xl text-sm px-4  py-1.5 ${idx ==0 && 'shadow bg-white'}`} >{item}</button>
                                ))
                            }
                        </div>
                    </div>
                    <div className="p-5">
                        <p className='text-sm' >Earning history displayed per month</p>
                        <div className="mt-5 -ml-10 min-w-[400px] h-[250px]">
                            <BarChart data = {rebateChart?.rebate_earnings} />
                        </div>
                    </div>
                </div>: null}
                {
                    department == 'Customer Service Unit' ? 
                    <div className="w-full grid gap-5">
                         <div className="w-full bg-white rounded-lg p-5 border">
                            <p>Total Referrals</p>
                            <p className='font-semibold text-xl my-3'>{dashboardStats?.total_referrals}</p>
                            <div className="flex items-center justify-between gap-5 mt-5">
                                <p className='bg-[#C9E6FF] px-3 text-sm py-0.5 rounded-2xl' >+21</p>
                                <button className="text-primary flex items-center gap-1 font-semibold pl-7 text-sm">
                                    <span>View All</span>
                                    <MdArrowForward />
                                </button>
                            </div>
                        </div>
                        <div className="w-full bg-white rounded-lg p-5 border">
                            <p>Total Booked Appointments</p>
                            <p className='font-semibold text-xl my-3'>{appointmentStats?.total_appointments}</p>
                            <div className="flex items-center justify-between gap-5 mt-5">
                                <p className='bg-[#C9E6FF] px-3 text-sm py-0.5 rounded-2xl' >+61</p>
                                <button className="text-primary flex items-center gap-1 font-semibold pl-7 text-sm">
                                    <span>View All</span>
                                    <MdArrowForward />
                                </button>
                            </div>
                        </div>
                    </div>
                    : null
                }
                {
                    (department == 'Endoscopy' || department == 'Laboratory Services' || department == 'Radiology' || department == 'Result Unit') ? 
                    <div className="w-full grid gap-5">
                         <div className="w-full bg-white rounded-lg p-5 border">
                            <p>Total Sub Tests</p>
                            <p className='font-semibold text-xl my-3'>{testStats?.total_medical_tests}</p>
                            <div className="flex items-center justify-between gap-5 mt-5">
                                <p className='bg-[#C9E6FF] px-3 text-sm py-0.5 rounded-2xl' >+21</p>
                                <button className="text-primary flex items-center gap-1 font-semibold pl-7 text-sm">
                                    <span>View All</span>
                                    <MdArrowForward />
                                </button>
                            </div>
                        </div>
                        <div className="w-full bg-white rounded-lg p-5 border">
                            <p>Total Test Categories</p>
                            <p className='font-semibold text-xl my-3'>{testStats?.total_category}</p>
                            <div className="flex items-center justify-between gap-5 mt-5">
                                <p className='bg-[#C9E6FF] px-3 text-sm py-0.5 rounded-2xl' >+61</p>
                                <button className="text-primary flex items-center gap-1 font-semibold pl-7 text-sm">
                                    <span>View All</span>
                                    <MdArrowForward />
                                </button>
                            </div>
                        </div>
                    </div>
                    : null
                }
            </div> 
            { (department == 'Administration' || department == 'Customer Service Unit') ? <div className="flex gap-5 mt-5">
                <div className="flex-1 bg-white rounded-xl border pb-3">
                    <div className="flex items-center justify-between p-3 border-b">
                        <p className='font-semibold' >Calendar Appointments</p>
                    </div>
                    <div className="mt-3 flex gap-3 pl-5">
                        <Calendar className={'w-6/12'}  />
                        <div className="w-6/12 max-h-[300px] overflow-y-auto pr-4">
                            <p className='text-sm font-semibold mt-1' >Scheduled For The Day</p>
                            { todayBooking?.length ? <div className="grid gap-3 mt-5">
                                {
                                    todayBooking?.map((item,idx) => (
                                        <div className='text-sm p-3 px-2 rounded-md border' key={idx}>
                                            <p className='font-semibold'>{item.patient_name}</p>
                                            <p className='text-xs line-clamp-1' >{item.test_assigned} Test(s) booked &bull; {item.appointment_time} </p>
                                        </div>
                                    ))
                                }
                            </div>
                            :
                            <div className='mt-5 text-sm' >
                                <p>There are no appointment scheduled for the day yet.</p>
                                <p>Please check back later.</p>
                            </div>    
                        }
                        </div>
                    </div>
                </div>
                <div className="relative w-[28%] bg-black p-5 text-white rounded-xl">
                    <p className='font-medium' >Appointment Stats</p>
                    <div className="grid gap-2 mt-5 relative z-10">
                        <p>{appointmentStats?.total_appointments} Booked</p>
                        <p>{appointmentStats?.paid_appointments} Paid</p>
                        <p>{appointmentStats?.appointments_today} Scheduled For Today</p>
                        <Button className={'opacity-90 mt-10 text-sm'}  title='View More Details' />
                    </div>
                        <img className='absolute right-0 bottom-0' src={design} alt="" />
                </div>
            </div> : null}
        </div>
        {/* <div className="w-4/6 max-h-[calc(100vh-115px)] overflow-y-auto">
            <div className="top flex gap-3">
                <div className="w-2/5 flex flex-col gap-3">
                    {
                        analysis.map((item, idx) =>(
                            <div key={idx} className='border border-custom_gray rounded-lg bg-white p-3' >
                                <img className='ml-auto'  src={note} alt="" />
                                <div className="p-3 py-2">
                                    <img src={item.icon} />
                                    <div className='flex justify-between mt-4' >
                                        <div className="">
                                            <p className='' >{item.title}</p>
                                            <p className='text-2xl font-semibold' >{item.value}</p>
                                        </div>
                                        <div className=""></div>
                                    </div>
                                </div>

                            </div>
                        ))
                    }
                </div>
                <div className="right w-3/5 flex-1 border border-custom_gray rounded-lg bg-white">
                <div className="flex items-center justify-between p-3 border-b">
                    <p className='font-semibold' >Your Activities</p>
                   <img src={note} alt="note" />
                </div>
                <div className="p-5">
                    <div className="grid gap-7">
                    {
                        activities.map((item,idx) => (
                            <div key={idx} className='flex items-center gap-4' >
                                <img src={item.img} alt="image" />
                                <div className="text-sm">
                                    <p className='font-medium' >{item.title}</p>
                                    <p className='my-1' >{item.desc}</p>
                                    <p className='text-text_color text-xs' >{item.time}</p>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
            </div>
            <div className="bottom rounded-2xl border bg-white items-center border-custom_gray grid grid-cols-2 gap-9 mt-5 ">
                <img className='cursor-pointer' onClick={() => navigate('referrals?open=true')} src={refer} alt="refer" />
                <div className="p-5">
                    <p className='font-semibold text-xl  ' >Earn Rebates by Referring <br /> Patients!</p>
                    <p className='text-text_color mt-2'>Unlock additional income with our referral program! When your patients make a payment, 
                        you'll receive a rebate in your wallet within 24 hours. Start referring your patients today and watch your earnings grow.</p>
                </div>
            </div>
        </div> */}
    </>
  )
}

export default Dashboard
